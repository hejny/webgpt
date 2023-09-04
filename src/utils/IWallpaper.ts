import { string_keyword } from 'n12';
import { Vector } from 'xyzt';
import { Json } from '../utils/supabase/types';
import { IImageColorStats } from './image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';
import {
    string_html,
    string_markdown,
    string_midjourney_prompt,
    string_url,
    string_wallpaper_id,
    title,
    uuid,
} from './typeAliases';

export interface IWallpaper {
    id: string_wallpaper_id;
    parent: string_wallpaper_id | null;
    author: uuid;
    isPublic: boolean;
    src: string_url /* <- Note: Not using URL objects because of serialization */;
    prompt: string_midjourney_prompt | null;
    colorStats: IWallpaperColorStats;

    /**
     * Note: This is just derrived from src
     */
    naturalSize: Vector;

    /**
     * Note: This is just derrived
     */
    title: Exclude<title, JSX.Element>;
    content: string_markdown | string_html;
    // TODO: isTile + some mechanism to add additional metadata

    /**
     * Note: This is just derrived
     * Note: Not using IKewords because Set is not serializable
     */
    keywords: Array<string_keyword> | null;

    saveStage: keyof typeof IWallpaperSaveStage;
}

export const IWallpaperSaveStage = {
    SAVED: 'Saved',
    EDITED: 'Edited',
    SAVING: 'Saving',
} as const;

export type IWallpaperMetadata = IMidjourneyJob /* <- TODO: Maybe remove ACRY IWallpaperMetadata */;
export type IWallpaperColorStats = IImageColorStats<string>;

export type IWallpaperSerialized = Omit<IWallpaper, 'colorStats' | 'naturalSize' | 'saveStage'> & {
    colorStats: Json;
    naturalSize: null | {
        x: number;
        y: number /* <- Note: Not using IVector because we do not want here an index signature + x and y needs to be defined */;
    };
};

/**
 * TODO: !!! Script for Compute naturalSize in supabase
 * TODO: [🧠] Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 * TODO: [🧠] Maybe provide full srcset
 * TODO: [🧠] Maybe compute also some shapeStats (not only naturalSize) to capture most important regions of the wallpaper and overall shape (for example to determine the font)
 */
