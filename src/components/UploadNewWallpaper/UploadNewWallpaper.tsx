import { UploadWallpaperResponse } from '../../pages/api/upload-wallpaper';
import { UploadZone } from '../UploadZone/UploadZone';
import styles from './UploadNewWallpaper.module.css';

export function UploadNewWallpaper() {
    return (
        <UploadZone
            className={styles.UploadNewWallpaper}
            isClickable
            isMultipleAllowed={false}
            accept="image/*"
            onFiles={async ([file]) => {
                console.log(file);

                // Upload file to /api/upload-wallpaper
                const response = await fetch('/api/upload-wallpaper', {
                    method: 'POST',
                    body: file,
                });

                const { wallpaperUrl } = (await response.json()) as UploadWallpaperResponse;

                console.log(wallpaperUrl);
            }}
        >
            Upload image and make web:
        </UploadZone>
    );
}
