import { string_keyword } from 'n12';
import { Vector } from 'xyzt';
import { Json } from '../utils/supabase/types';
import { IImageColorStats } from './image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';
import { client_id, string_maxdown, string_midjourney_prompt, string_url, string_wallpaper_id, title } from './typeAliases';

export interface IWallpaper {
    /**
     * The unique identifier of the wallpaper
     *
     * - For pre-generated wallpapers, it is the UUID
     * - For user-generated wallpapers, it is first word of the title + some random string
     */
    readonly id: string_wallpaper_id;

    /**
     * The parent of the wallpaper
     *
     * - If user edit and save wallpaper, it becomes the parent of the derived version
     */
    readonly parent: string_wallpaper_id | null;

    /**
     * The author of the wallpaper
     *
     * - If user edit and save public wallpaper, he becomes the author of the derived version
     *   Information about the original author is stored in parent
     */
    readonly author: client_id;

    /**
     * Is the wallpaper public or private
     *
     * - All pre-generated wallpapers are public
     * - All user-generated wallpapers are private
     * - If user edit and save public wallpaper, the derived version becomes private
     */
    readonly isPublic: boolean;

    /**
     * The source of the wallpaper image
     *
     * Note: Not using URL objects because of serialization
     */
    readonly src: string_url;

    /**
     * The prompt used to generate the wallpaper image
     */
    readonly prompt: string_midjourney_prompt | null;

    /**
     * Color palette with statictics about the colors in the wallpaper
     */
    readonly colorStats: IWallpaperColorStats;

    /**
     * Note: This is just derrived from src
     */
    readonly naturalSize: Vector;

    /**
     * Note: This is just derrived
     */
    readonly title: Exclude<title, JSX.Element>;

    /**
     * The main content of the wallpaper
     */
    readonly content: string_maxdown;
    // TODO: isTile + some mechanism to add additional metadata

    /**
     * Note: This is just derrived
     * Note: Not using IKewords because Set is not serializable
     */
    readonly keywords: Array<string_keyword> | null;

    /**
     * The save stage of the wallpaper
     *
     * Note: This is relevant only in the frontend (editor) application
     *       In the database, the wallpaper is always saved
     */
    readonly saveStage: keyof typeof IWallpaperSaveStage;
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
 * TODO: [👏] !! Script to compute naturalSize in supabase
 * TODO: [🧠] Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 * TODO: [🧠] Maybe provide full srcset
 * TODO: [🧠] Maybe compute also some shapeStats (not only naturalSize) to capture most important regions of the wallpaper and overall shape (for example to determine the font)
 * TODO: [📙] Every dictionary should look like LikedStatus
 */
