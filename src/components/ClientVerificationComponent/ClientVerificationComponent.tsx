import { useCallback, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';

interface ClientVerificationComponentProps {
    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;
}

/**
 * Renders a @@
 */
export function ClientVerificationComponent(props: ClientVerificationComponentProps) {
    const { className } = props;

    const styles = useStyleModule(import('./ClientVerificationComponent.module.css'));

    const emailInputRef = useRef<HTMLInputElement>(null);
    const submit = useCallback(() => {
        respond({ answer: emailInputRef.current!.value, feedback });
    }, [respond, emailInputRef, feedback]);


    return (
        <div className={classNames(className, styles.ClientVerificationComponent)}>
            <input
                autoFocus
                ref={emailInputRef}
                type="email"
                defaultValue={`@`}
                placeholder={`john.smith@gmail.com` /* <- !! Translate */}
                className={styles.answer}
                onKeyDown={(event) => {
                    if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    submit();
                }}
            />
        </div>
    );
}

/**
 * TODO: !!! Implement
 * TODO: <VerificationCodeInput>
 */
