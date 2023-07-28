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
                <InlineScript id="menu">
                    {
                        // Note: Using inline script to pass the menu control to the exported page

                        // TODO: !!!! Put a real name on the function
                        // TODO: !!!! [👩‍🦱]
                        // TODO: !!!! ${usedComponents.map(activate=>activate.toString()).join()}
                        `

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
                                                (${activate.toString()})(componentElement);
                                        `,
                                    )
                                    .join('\n\n')}
                                default:
                                    throw new Error(\`Unknown component "\${componentType}"\`);
                            }


                            componentElement.setAttribute('data-toggle-activated', 'true');
                        }

                    `
                    }
                </InlineScript>
            </div>
        );
    }
}

/**
 * TODO: !!!! Warn/error when detected data-ai-component="unknown" in the page
 */
