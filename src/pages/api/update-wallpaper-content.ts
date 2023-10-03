import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { string_prompt } from '../../utils/typeAliases';

// TODO: !!!last Remove this file when reapeareng the .todo file

export interface UpdateWallpaperContentRequest {
    readonly prompt: string_prompt;
    readonly wallpaper: Pick<IWallpaperSerialized, 'content'>;
}

export interface UpdateWallpaperContentResponse {
    // TODO: [🌋] ErrorableResponse
    readonly updatedWallpaper: Pick<IWallpaperSerialized, 'content'>;
}
