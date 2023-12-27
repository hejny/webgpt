import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import type { AutomaticVerification } from '../components/ClientVerificationComponent/AutomaticVerification';
import { ClientVerificationComponent } from '../components/ClientVerificationComponent/ClientVerificationComponent';
import { ClientEmailVerification } from '../utils/client/ClientVerification';
import { isValidClientId } from '../utils/client/isValidClientId';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';
import { isValidEmail } from '../utils/validators/isValidEmail';

export default function VerifyEmailPage() {
    const router = useRouter();

    const code = router.query.code;
    const email = router.query.email;
    const clientId = router.query.clientId;
    const ref = router.query.ref;

    const automaticVerification = useMemo<undefined | AutomaticVerification>(() => {
        if (!code && !email && !clientId) {
            return undefined;
        }

        if (typeof code !== 'string') {
            console.error(`In GET params, "code" is not a string`);
            return undefined;
        }
        if (!isValidEmail(email)) {
            console.error(`In GET params, "email" is not a valid email but "${email}"`);
            return undefined;
        }
        if (!isValidClientId(clientId)) {
            console.error(`In GET params, "clientId" is not a valid clientId but "${clientId}"`);
            return undefined;
        }

        return {
            code,
            email,
            clientId,
        };
    }, [code, email, clientId]);

    return (
        <WallpapersContext.Provider value={{}} /* <- Does it make sence to keep this empty? */>
            <StaticAppHead subtitle={null} />

            <ClientVerificationComponent
                onVerificationSuccess={(verification: ClientEmailVerification) => {
                    if (ref) {
                        router.push(ref as string);
                    }
                }}
                {...{ automaticVerification }}
            />
        </WallpapersContext.Provider>
    );
}

/**
 * TODO: !!! Design of the page
 */
