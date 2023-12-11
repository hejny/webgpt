import { useCallback, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { $backupClientEmail } from '../../utils/client/backupClientEmail';
import { ClientEmailVerification } from '../../utils/client/ClientVerification';
import { $provideClientEmail } from '../../utils/client/provideClientEmail';
import { $provideClientIdWithoutVerification } from '../../utils/client/provideClientIdWithoutVerification';
import { $sendEmailToVerifyClientForBrowser } from '../../utils/client/sendEmailToVerifyClientForBrowser';
import { $verifyEmailCodeForBrowser } from '../../utils/client/verifyEmailCodeForBrowser';
import { useInitialAction } from '../../utils/hooks/useInitialAction';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class, string_token } from '../../utils/typeAliases';
import { VerificationCodeInput } from './VerificationCodeInput/VerificationCodeInput';

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
    const [status, setStatus] = useState<
        | 'BEFORE'
        | 'PENDING_EMAIL_SENDING'
        | 'EMAIL_SENT'
        | 'ALREADY_EMAIL_SENT'
        | 'PENDING_CODE_SUBMITTING'
        | 'VERIFIED'
    >('BEFORE');

    const handleSuccess = useCallback(
        (verification: ClientEmailVerification) => {
            $backupClientEmail(verification.email);
            onVerificationSuccess(verification);
        },
        [onVerificationSuccess],
    );

    const submitEmail = useCallback(async () => {
        if (status !== 'BEFORE') {
            // TODO: Better then alert
            alert(
                {
                    PENDING_EMAIL_SENDING: `The email is now sending`,
                    EMAIL_SENT: `Email was sent`,
                    ALREADY_EMAIL_SENT: `Email was sent`,
                    PENDING_CODE_SUBMITTING: `The code is now submitting`,
                    VERIFIED: `You are already verified`,
                }[status],
            );
            return;
        }

        setStatus('PENDING_EMAIL_SENDING');

        const clientId = $provideClientIdWithoutVerification();
        const sendEmailResult = await $sendEmailToVerifyClientForBrowser({
            clientId,
            email: emailInputRef.current!.value!,
        });

        if (sendEmailResult.status === 'EMAIL_SENT') {
            setStatus('EMAIL_SENT');
        } else if (sendEmailResult.status === 'ALREADY_EMAIL_SENT') {
            setStatus('ALREADY_EMAIL_SENT');
        } else if (sendEmailResult.status === 'ERROR') {
            // TODO: Better then alert
            alert(sendEmailResult.message);
            setStatus('BEFORE');
        } else if (sendEmailResult.status === 'ALREADY_VERIFIED') {
            setStatus('VERIFIED');
            handleSuccess({
                clientId,
                email: emailInputRef.current!.value!,
                isEmailVerified: true,
            });
        } else if (sendEmailResult.status === 'LIMIT_REACHED') {
            // TODO: [📮] Lock for some time
            // TODO: Better then alert
            alert('Limit reached');
            setStatus('BEFORE');
        }
    }, [status, emailInputRef, handleSuccess]);

    const submitCode = useCallback(
        async (code: string_token) => {
            if (!['EMAIL_SENT', 'ALREADY_EMAIL_SENT'].includes(status)) {
                throw new Error(`Code can be submitted only when status is "EMAIL_SENT" but it is "${status}"`);
                //             <- TODO: ShouldNeverHappenError
            }

            setStatus('PENDING_CODE_SUBMITTING');

            const clientId = $provideClientIdWithoutVerification();
            const codeVerifyResult = await $verifyEmailCodeForBrowser({
                clientId,
                email: emailInputRef.current!.value!,
                code,
            });

            if (codeVerifyResult.status === 'VERIFIED') {
                setStatus('VERIFIED');
                handleSuccess({
                    email: emailInputRef.current!.value!,
                    clientId,
                    isEmailVerified: true,
                });
            } else if (codeVerifyResult.status === 'ERROR') {
                // TODO: Better then alert
                setStatus('EMAIL_SENT');
                alert(codeVerifyResult.message);
            }
        },
        [status, handleSuccess],
    );

    useInitialAction(
        () => true,
        () => {
            const email = $provideClientEmail();

            if (email === null) {
                return;
            }

            emailInputRef.current!.value = email;
            submitEmail();
        },
    );

    return (
        <div className={classNames(className, styles.ClientVerificationComponent)}>
            <p>
                {
                    {
                        BEFORE: <>Verify your email</>,
                        PENDING_EMAIL_SENDING: <>Sending the email</>,
                        EMAIL_SENT: (
                            <>
                                Verify code received in your email
                                <br />
                                <i>(Look in spam folder if not in inbox)</i>
                            </>
                        ),
                        ALREADY_EMAIL_SENT: (
                            <>
                                Verify code was sent into your email
                                <br />
                                <i>(Look in spam folder if not in inbox)</i>
                            </>
                        ),
                        PENDING_CODE_SUBMITTING: <>Verifying the code</>,
                        VERIFIED: <>You are verified!</>,
                    }[status]
                }
            </p>

            <div>
                <label>
                    Enter your email:
                    <input
                        autoFocus
                        ref={emailInputRef}
                        type="email"
                        defaultValue={`@`}
                        placeholder={`john.smith@gmail.com` /* <- !! Translate */}
                        disabled={status !== 'BEFORE'}
                        className={styles.answer}
                        onKeyDown={(event) => {
                            if (!(event.key === 'Enter' && event.shiftKey === false && event.ctrlKey === false)) {
                                return;
                            }

                            submitEmail();
                        }}
                    />
                </label>
                <button className={styles.submit} onClick={submitEmail} disabled={status !== 'BEFORE'}>
                    Send verification code
                </button>
            </div>

            {['EMAIL_SENT', 'ALREADY_EMAIL_SENT', 'PENDING_CODE_SUBMITTING', 'VERIFIED'].includes(status) && (
                <VerificationCodeInput
                    onSubmit={submitCode}
                    isDisabled={!['EMAIL_SENT', 'ALREADY_EMAIL_SENT'].includes(status)}
                />
            )}
        </div>
    );
}

/**
 * TODO: !!! Show indicators for'PENDING_EMAIL_SENDING', 'EMAIL_SENT' and 'PENDING_CODE_SUBMITTING'
 * TODO: !!! Design
 */
