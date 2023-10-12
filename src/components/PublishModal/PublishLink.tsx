import { string_css_class } from '../../utils/typeAliases';
import { WallpaperLink } from '../WallpaperLink/WallpaperLink';

interface PublishLinkProps {
    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renders the link to open the publish modal
 */
export function PublishLink(props: PublishLinkProps) {
    const { className } = props;

    return (
        <WallpaperLink
            modal="publish"
            role="OWNER"
            {...{ className }}
            /* Note: Keeping prefetch because we want to be this as-fast-as-possible */
        >
            <PublishText />
        </WallpaperLink>
    );
}

/**
 * Renders text of the publish button
 */
export function PublishText(props: PublishLinkProps) {
    // TODO: !! Use Openmoji
    return <>🌍 Publish</>;
}

/**
 * TODO: [🧠] Best text for this button> "Get the web", "Make the web", "Publish", "🌍"
 */
