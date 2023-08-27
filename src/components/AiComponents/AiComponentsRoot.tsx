import { ReactNode, useContext } from 'react';
import { Promisable } from 'type-fest';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { string_css_class } from '../../utils/typeAliases';
import { InlineScript } from '../InlineScript/InlineScript';

interface AiComponentsRootProps {
    /**
     * A map of component types to functions that activate them
     */
    usedComponents: Record<
        string,
        (componentElement: HTMLElement) => Promisable<void /* <- TODO: Maybe return IDestroyable instead of void */>
    >;

    /**
     * In this content will be activated all AI components
     */
    children: ReactNode;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renders a root element for AI components and activates them
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

                    for (let componentElement of Array.from(rootElement.querySelectorAll('[data-ai-component]'))) {
                        const activatedCount = parseInt(componentElement.getAttribute('data-ai-activated') || '0', 10);
                        if (activatedCount > 0) {
                            continue;
                        }

                        const componentType = componentElement.getAttribute('data-ai-component');
                        const componentActivator = usedComponents[componentType!];

                        if (!componentActivator) {
                            throw new Error(`Unknown component "${componentType}"`);
                        }

                        console.info(`🌟 Activating ${componentType} component`, componentElement);

                        componentActivator(componentElement as HTMLElement);

                        componentElement.setAttribute('data-ai-activated', (activatedCount + 1).toString());
                    }
                }}
                {...{ className }}
            >
                {children}
            </div>
        );
    } else {
        // TODO: [🚀] Just remove the script if there is no component of such type - go through all usedComponents and filter usedComponents before rendring the script
        // TODO: [🚀] Optimize when there is only one usedComponents

        return (
            <div {...{ className }}>
                {children}
                <InlineScript id="Note: This ID does not matter because it this branch of component is used only for export">
                    {`

                        /**
                         * Note: This script makes ${Object.keys(usedComponents).join(' and ')} interactive
                         */
                        (()=>{
                        const rootElement = window.document.currentScript.parentElement;
                        for (const componentElement of Array.from(rootElement.querySelectorAll('[data-ai-component]'))) {
                            if (componentElement.getAttribute('data-ai-activated')) {
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
                                                break;
                                        `,
                                    )
                                    .join('\n\n')}
                                default:
                                    throw new Error(\`Unknown component "\${componentType}"\`);
                            }


                            componentElement.setAttribute('data-ai-activated', 'true');
                        }

                        })();

                    `}
                </InlineScript>
            </div>
        );
    }
}
