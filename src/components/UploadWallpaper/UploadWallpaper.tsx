import { UploadZone } from '../UploadZone/UploadZone';
import styles from './UploadWallpaper.module.css';

export function UploadWallpaper() {
    return (
        <UploadZone
            className={styles.UploadWallpaper}
            isClickable
            isMultipleAllowed={false}
            accept="image/*"
            onFiles={([file]) => {
                console.log(file);
            }}
        >
            Upload image and make web:
        </UploadZone>
    );
}
