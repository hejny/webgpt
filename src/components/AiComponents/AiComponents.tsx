import { ReactNode, useContext } from 'react';
import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { activateMenuComponents } from '../ai-components/activateMenuComponents';
import { InlineScript } from '../InlineScript/InlineScript';

interface SampleProps {
    usedComponents: Array<(root: HTMLElement) => Promisable<void>>;
    children: ReactNode;
}

/**
 * @@
 */
export function AiComponents(props: SampleProps) {
    const { usedComponents, children } = props;

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
            >
                {children}
            </div>
        );
    } else {
        return (
            <div
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    activateMenuComponents(element);
                }}
            >
                {children}
                <InlineScript id="menu">
                    {
                        // Note: Using inline script to pass the menu control to the exported page

                        //  !!!! ${usedComponents.map(activate=>activate.toString()).join()}
                        spaceTrim(`

                         // !!!!![👩‍🦰]
                         ${activateMenuComponents.toString()}

                         activateMenuComponents();
                      `)
                    }
                </InlineScript>
            </div>
        );
    }
}

/**
 * TODO: !!!! Warn/error when detected data-ai-component="unknown" in the page
 */
