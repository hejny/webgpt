// !!!!!!!Anotate
// !!!!!!!Split to files - use singleton pattern - create on first use

import { RandomWallpaperManager } from './RandomWallpaperManager';

export const randomWallpaperManager = new RandomWallpaperManager();

export function useRandomWallpaperManager() {
    return randomWallpaperManager;
}
