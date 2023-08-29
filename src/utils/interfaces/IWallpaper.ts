import { string_keyword } from 'n12';
import { Json } from '../supabase/types';
import { IImageColorStats } from '../image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';
import {
    string_html,
    string_markdown,
    string_midjourney_prompt,
    string_url,
    string_wallpaper_id,
    uuid,
} from '../typeAliases';

export interface IWallpaper {
    id: string_wallpaper_id;
    parent: string_wallpaper_id | null;
    author: uuid;
    isPublic: boolean;
    src: string_url /* <- Note: Not using URL objects because of serialization */;
    prompt: string_midjourney_prompt | null;
    colorStats: IWallpaperColorStats;
    // TODO: shapeStats> IWallpaperShapeStats;

    title: string /* <- Note: This is just derrived */;
    content: string_markdown | string_html;
    // TODO: isTile + some mechanism to add additional metadata

    /**
     * Note: Not using IKewords because Set is not serializable
     */
    keywords: Array<string_keyword> | null /* <- Note: This is just derrived */;

    saveStage: keyof typeof IWallpaperSaveStage;
}

export const IWallpaperSaveStage = {
    SAVED: 'Saved',
    EDITED: 'Edited',
    SAVING: 'Saving',
} as const;

export type IWallpaperMetadata = IMidjourneyJob /* <- TODO: Maybe remove ACRY IWallpaperMetadata */;
export type IWallpaperColorStats = IImageColorStats<string>;

export type IWallpaperSerialized = Omit<IWallpaper, 'colorStats' | 'saveStage'> & {
    colorStats: Json;
};

/**
 * TODO: Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 * TODO: Maybe in some different folder
 */
