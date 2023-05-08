import { IImageColorStats } from '../../../src/utils/image/utils/IImageColorStats';

export interface IWallpaperComponentProps {
    width: number;
    quality: number;
}

export interface IWallpaperComponent {
    metadata: IWallpaperMetadata;
    colorStats: IImageColorStats;
    (props: IWallpaperComponentProps): JSX.Element;
}

export type IWallpaperMetadata = any /* <- TODO: !!! Use propper metadata bellow */;
export interface IWallpaperMetadataX {
    _job_type: string;
    _parsed_params: {
        aspect: string;
        creative: boolean;
        fast: boolean;
        hd: boolean;
        niji: boolean;
        no: string[];
        quality: number;
        style: string;
        test: boolean;
        testp: boolean;
        tile: boolean;
        upanime: boolean;
        upbeta: boolean;
        uplight: boolean;
        version: number;
        vibe: boolean;
        video: boolean;
    };
    _service: string;
    avatar_job_id: null | string;
    cover_job_id: null | string;
    current_status: string;
    enqueue_time: string;
    event: {
        height: number;
        textPrompt: string[];
        imagePrompts: null | any[];
        width: number;
        batchSize: number;
        textPromptWeights: number[];
        seedImageURL: string;
        eventType: string;
        test: boolean;
    };
    flagged: boolean;
    followed_by_user: boolean;
    grid_id: null | string;
    grid_num: null | number;
    guild_id: null | string;
    hidden: boolean;
    id: string;
    image_paths: string[];
    is_published: boolean;
    liked_by_user: boolean;
    low_priority: boolean;
    metered: boolean;
    mod_hidden: boolean;
    parent_grid: number;
    parent_id: string;
    platform: string;
    platform_channel: string;
    platform_channel_id: string;
    platform_message_id: string;
    platform_thread_id: null | string;
    prompt: string;
    ranked_by_user: boolean;
    ranking_by_user: null | string;
    type: string;
    user_actions: null | any[];
    user_id: string;
    user_reactions: null | any[];
    username: string;
    full_command: string;
    reference_job_id: string;
    reference_image_num: string;
}
