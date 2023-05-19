import styles from './EditModal.module.css';

interface EditModalProps {
    turnOffEditing(): void;
}

/**
 * @@
 */
export function EditModal(props: EditModalProps) {
    const { turnOffEditing } = props;
    return (
        <>
            <div className={styles.overlay} onClick={turnOffEditing}></div>
            <div className={styles.EditModal}>
                Editing
                <button className={'button'} onClick={turnOffEditing}>
                    Done
                </button>
            </div>
        </>
    );
}
