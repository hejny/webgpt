import { StaticAppHead } from '../components/AppHead/StaticAppHead';
import { ClientVerificationComponent } from '../components/ClientVerificationComponent/ClientVerificationComponent';
import { ClientEmailVerification } from '../utils/client/ClientVerification';
import { WallpapersContext } from '../utils/hooks/WallpapersContext';

export default function VerifyPage() {
    return (
        <WallpapersContext.Provider value={{}} /* <- Does it make sence to keep this empty? */>
            <StaticAppHead subtitle={null} />

            <ClientVerificationComponent
                onVerificationSuccess={(verification: ClientEmailVerification) => {
                    // TODO: !!! Do domething
                    // TODO: !!! Redirect to ?ref=... (if exists)
                }}
            />
        </WallpapersContext.Provider>
    );
}

/**
 * TODO: !!! Design of the page
 */
