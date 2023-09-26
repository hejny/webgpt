import { IWallpaperSerialized } from '../../utils/IWallpaper';
import { string_prompt } from '../../utils/typeAliases';

// TODO: !!! Remove this file when reapeareng the .todo file

export interface UpdateWallpaperContentRequest {
    prompt: string_prompt;
    wallpaper: Pick<IWallpaperSerialized, 'content'>;
}

export interface UpdateWallpaperContentResponse {
    // TODO: [🌋] ErrorableResponse
    updatedWallpaper: Pick<IWallpaperSerialized, 'content'>;
}
