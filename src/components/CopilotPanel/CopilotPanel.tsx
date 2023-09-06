import { classNames } from '../../utils/classNames';
import styles from './CopilotPanel.module.css';

/**
 * Renders the co-pilot panel for text commands to edit the page.
 */
export function CopilotPanel() {
    return (
        <div
            // Note: It is intended to have two divs embedded in each other
            className={classNames('aiai-controls', styles.CopilotPanel)}
        >
            What are you working on?
            <input
                type={'text'}
                placeholder={'🍕 Pizza Gigante'}
                ref={(element) => {
                    // TODO: focusRef
                    if (!element) {
                        return;
                    }

                    element.focus();
                }}
            />
        </div>
    );
}

/**
 * TODO: !!! Finish
 */
