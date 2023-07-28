import { ReactNode, useContext } from 'react';
import { Promisable } from 'type-fest';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { activateMenuComponents } from '../ai-components/activateMenuComponents';
import { InlineScript } from '../InlineScript/InlineScript';

interface AiComponentsRootProps {
    usedComponents: Array<(root: HTMLElement) => Promisable<void>>;
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
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    for (const activate of usedComponents) {
                        activate(element);
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

                        // TODO: !!!! Unwrap the function
                        // TODO: !!!! [👩‍🦱]
                        // TODO: !!!! ${usedComponents.map(activate=>activate.toString()).join()}
                        `


                  
                        console.log('!!!! document.currentScript',document.currentScript);

                        // !!!!![👩‍🦰]
                        (${activateMenuComponents.toString()})(document.currentScript.parent);

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
