import { DomainsWizzardChecker } from '../DomainsWizzardChecker/DomainsWizzardChecker';
import { Modal } from '../Modal/00-Modal';

/**
 * Renders the modal with a domain suggestions for the current wallpaper
 */
export function DomainsModal() {
    return (
        <Modal title={'Domains'} isCloseable>
            <DomainsWizzardChecker />
        </Modal>
    );
}
