import { string_token } from '@promptbook/types';
import { useCallback, useRef } from 'react';
import { classNames } from '../../../utils/classNames';
import { useStyleModule } from '../../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../../utils/typeAliases';

interface VerificationCodeInputProps {
    /**
     * Callback when code is entered and submitted
     */
    onSubmit(code: string_token): void;

    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;
}

/**
 * Renders a @@
 */
export function VerificationCodeInput(props: VerificationCodeInputProps) {
    const { onSubmit, className } = props;

    const styles = useStyleModule(import('./VerificationCodeInput.module.css'));
    const codeInputRef = useRef<HTMLInputElement>(null);

    const submitCode = useCallback(() => {
        if (codeInputRef.current === null) {
            return;
        }

        const code = codeInputRef.current.value;
        if (code === '') {
            return;
        }

        onSubmit(code);
    }, [onSubmit, codeInputRef]);

    return (
        <div className={classNames(className, styles.VerificationCodeInput)}>
            <input
                autoFocus
                ref={codeInputRef}
                type="string"
                className={styles.answer}
                onKeyDown={(event) => {
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    submitCode();
                }}
            />
            <button className={styles.submit} onClick={submitCode}>
                Confirm
            </button>
        </div>
    );
}
