export interface IMidjourneyJob {
    _job_type: string;
    _parsed_params: ParsedParams;
    _service: string;
    avatar_job_id?: null;
    cover_job_id?: null;
    current_status: string;
    enqueue_time: string;
    event: Event;
    flagged: boolean;
    followed_by_user: boolean;
    grid_id?: null;
    grid_num?: null;
    guild_id?: null;
    hidden: boolean;
    id: string;
    image_paths?: string[] | null;
    is_published: boolean;
    liked_by_user: boolean;
    low_priority: boolean;
    metered: boolean;
    mod_hidden: boolean;
    platform: string;
    platform_channel: string;
    platform_channel_id: string;
    platform_message_id: string;
    platform_thread_id?: null;
    prompt: string;
    ranked_by_user: boolean;
    ranking_by_user?: number | null;
    type: string;
    user_id: string;
    username: string;
    full_command: string;
    reference_job_id?: string | null;
    reference_image_num?: string | null;
}
export interface ParsedParams {
    aspect: string;
    creative: boolean;
    fast: boolean;
    hd: boolean;
    niji: boolean;
    no?: null[] | null;
    quality?: number | null;
    style: string;
    test: boolean;
    testp: boolean;
    tile: boolean;
    upanime: boolean;
    upbeta: boolean;
    uplight: boolean;
    version: number | string;
    vibe: boolean;
    video: boolean;
}
export interface Event {
    height: number;
    textPrompt?: string[] | null;
    imagePrompts?: (string | null)[] | null;
    width: number;
    batchSize: number;
    seedImageURL?: string | null;
    eventType: string;
    test: boolean;
}

/**
 * @see https://jvilk.com/MakeTypes/
 */
