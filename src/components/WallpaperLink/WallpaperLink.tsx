import { normalizeToKebabCase } from 'n12';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RefCallback, useContext } from 'react';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { DEFAULT_ROLE, Role } from '../../utils/hooks/useRole';
import { DEFAULT_SCENARIO, Scenario } from '../../utils/hooks/useScenario';
import { string_page, string_wallpaper_id } from '../../utils/typeAliases';

interface WallpaperLinkProps extends Omit<React.ComponentProps<'a'>, 'ref' | 'role' /* <- [🍛] */> {
    wallpaperId?: string_wallpaper_id | null;
    role?: Role;
    scenario?: Scenario;
    page?: string_page;
    modal?: string | null;
    prefetch?: false;

    ref?: RefCallback<HTMLElement>;
}

/**
 * Renders a link to the wallpaper
 */
export function WallpaperLink(props: WallpaperLinkProps) {
    const { wallpaperId, role, scenario, page, modal, children, ref, ...attributes } = props;

    const router = useRouter();
    const { isExported } = useContext(ExportContext);

    const query: Record<string, any> = {
        wallpaperId: wallpaperId || router.query.wallpaperId,
        role: role ? normalizeToKebabCase(role) : router.query.role,
        scenario: scenario ? normalizeToKebabCase(scenario) : router.query.scenario,
        page: page || router.query.page,
        modal: modal || router.query.modal,
    };

    if (wallpaperId === null || !query.wallpaperId) {
        delete query.wallpaperId;
    }
    if (role === DEFAULT_ROLE || !query.mode) {
        delete query.role;
    }
    if (scenario === DEFAULT_SCENARIO || !query.mode) {
        delete query.scenario;
    }
    if (page === 'index' || !query.page) {
        delete query.page;
    }
    if (modal === null || !query.modal) {
        delete query.modal;
    }

    if (!isExported) {
        return (
            <Link
                href={{
                    pathname: '/[wallpaperId]',
                    query,
                }}
                {...{ ref }}
                {...attributes}
            >
                {children}
            </Link>
        );
    } else {
        // TODO: Maybe detect if it is modal or mode is used and if throw error

        return (
            <a href={!query.page ? '/' : `/${query.page}.html`} /* Note: Do not pass ref here */ {...attributes}>
                {children}
            </a>
        );
    }
}
