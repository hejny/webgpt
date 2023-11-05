import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { DomainsStatusList } from '../Domains/DomainsStatusList/DomainsStatusList';
import { Modal } from '../Modal/00-Modal';

/**
 * Renders the modal with a domain suggestions for the current wallpaper
 */
export function DomainsModal() {
    const [wallpaper] = useCurrentWallpaper();

    // --------------
    /*
    // TODO: Maybe make some hook for async memo
    const [indexUrl, setIndexUrl] = useState<Promise<>>(null);
    const [urlMap, setUrlMap] = useState<null | Map<string_uri, string_uri>>(null);
    useEffect(() => {
       
     
    }, [wallpaper]);
    */
    // --------------

    return (
        <Modal title={'Domains'} isCloseable>
            {wallpaper.keywords}
            <DomainsStatusList domains={['towns.cz', 'pavolhejny.com', 'svetlodat.eu']} />
        </Modal>
    );
}
