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
            <input
         
                type={'text'}
                placeholder={'Describe the change> Add email contact pavol@hejny.org'}
                ref={(element) => {
                    // TODO: focusRef
                    if (!element) {
                        return;
                    }

                    element.focus();
                }}
            />
            <button >Apply</button>
        </div>
    );
}

/**
 * TODO: !!! Finish
 */
