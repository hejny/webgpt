import { normalizeToKebabCase } from 'n12';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ExportContext } from '../../utils/hooks/ExportContext';
import { DEFAULT_ROLE, Role } from '../../utils/hooks/useRole';
import { DEFAULT_SCENARIO, Scenario } from '../../utils/hooks/useScenario';
import type { string_page, string_wallpaper_id } from '../../utils/typeAliases';

export interface UseWallpaperLinkOptions {
    wallpaperId?: string_wallpaper_id | null;
    role?: Role;
    scenario?: Scenario;
    page?: string_page;
    modal?: string | null;
}

/**
 * Hook that creates a query in the wallpaper route
 */
export function useWallpaperLinkQuery(options: UseWallpaperLinkOptions) {
    const { wallpaperId, role, scenario, page, modal } = options;

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
    if (role === DEFAULT_ROLE || !query.role) {
        delete query.role;
    }
    if (scenario === DEFAULT_SCENARIO || !query.scenario) {
        delete query.scenario;
    }
    if (page === 'index' || !query.page) {
        delete query.page;
    }
    if (modal === null || !query.modal) {
        delete query.modal;
    }

    return query;
}
