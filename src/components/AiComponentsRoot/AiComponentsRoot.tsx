import { ReactNode, useContext } from 'react';
import { Promisable } from 'type-fest';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { InlineScript } from '../InlineScript/InlineScript';

interface AiComponentsRootProps {
    usedComponents: Record<string, (componentElement: HTMLElement) => Promisable<void>>;
    children: ReactNode;
    className?: string;
}

/**
 * @@
 */
export function AiComponentsRoot(props: AiComponentsRootProps) {
    const { usedComponents, children, className } = props;

    const { isExported } = useContext(ExportContext);

    if (!isExported) {
        return (
            <div
                ref={async (rootElement) => {
                    if (!rootElement) {
                        return;
                    }

                    for (const componentElement of Array.from(rootElement.querySelectorAll('[data-ai-component]'))) {
                        if (componentElement.getAttribute('data-toggle-activated')) {
                            continue;
                        }

                        const componentType = componentElement.getAttribute('data-ai-component');
                        const componentActivator = usedComponents[componentType!];

                        if (!componentActivator) {
                            throw new Error(`Unknown component "${componentType}"`);
                        }

                        console.info(`🌟 Activating ${componentType} component`, componentElement);

                        componentActivator(componentElement as HTMLElement);

                        componentElement.setAttribute('data-toggle-activated', 'true');
                    }
                }}
                {...{ className }}
            >
                {children}
            </div>
        );
    } else {
        return (
            <div {...{ className }}>
                {children}
                <InlineScript id="Note: This ID does not matter because it this branch of component is used only for export">
                    {`
                        (()=>{
                        const rootElement = document.currentScript.parentElement;
                        for (const componentElement of Array.from(rootElement.querySelectorAll('[data-ai-component]'))) {
                            if (componentElement.getAttribute('data-toggle-activated')) {
                                continue;
                            }
    
                            const componentType = componentElement.getAttribute('data-ai-component');


                            switch (componentType) {
                                ${Object.entries(usedComponents)
                                    .map(
                                        ([componentType, activate]) => `
                                            case '${componentType}':
                                                console.info(\`🌟 Activating \${componentType} component\`, componentElement);
                                                (${
                                                    activate.toString() /* <- TODO: Is there some option to: 
                                                                                  - Use non-minified code (disable/bypass minification in just one file/function)
                                                                                  - OR just Put a real name on the function
                                                                        */
                                                })(componentElement);
                                        `,
                                    )
                                    .join('\n\n')}
                                default:
                                    throw new Error(\`Unknown component "\${componentType}"\`);
                            }


                            componentElement.setAttribute('data-toggle-activated', 'true');
                        }

                        })();

                    `}
                </InlineScript>
            </div>
        );
    }
}

/**
 * TODO: !!!! Warn/error when detected data-ai-component="unknown" in the page
 */
