import { useCallback, useRef } from 'react';
import { classNames } from '../../utils/classNames';
import { ClientEmailVerification } from '../../utils/client/ClientVerification';
import { $provideClientIdWithoutVerification } from '../../utils/client/provideClientIdWithoutVerification';
import { $sendEmailToVerifyClientForBrowser } from '../../utils/client/sendEmailToVerifyClientForBrowser';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';

interface ClientVerificationComponentProps {
    /**
     * Optional CSS class name which will be added to root element
     */
    readonly className?: string_css_class;

    /**
     * Called when user successfully verifies his email
     */
    onVerificationSuccess(verification: ClientEmailVerification): void;
}

/**
 * Renders a @@
 */
export function ClientVerificationComponent(props: ClientVerificationComponentProps) {
    const { onVerificationSuccess, className } = props;

    const styles = useStyleModule(import('./ClientVerificationComponent.module.css'));

    const emailInputRef = useRef<HTMLInputElement>(null);
    const submit = useCallback(async () => {
        // TODO: !!! Lock for some time

        const { isSendingEmailSuccessful } = await $sendEmailToVerifyClientForBrowser({
            clientId: $provideClientIdWithoutVerification(),
            email: emailInputRef.current!.value!,
        });

        // TODO: !!! Use isSendingEmailSuccessful
    }, [emailInputRef]);

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
            <button className={styles.submit} onClick={submit}>
                Send verification code
            </button>
        </div>
    );
}

/**
 * TODO: !!! Implement ClientVerificationComponent with using onVerificationSuccess
 * TODO: !!! Implement
 * TODO: <VerificationCodeInput>
 */
