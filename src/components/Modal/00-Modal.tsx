import { ReactNode, useCallback, useEffect } from 'react';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './00-Modal.module.css';

interface ModalProps {
    /**
     * Title of the modal
     */
    title: ReactNode;

    /**
     * The content of the modal
     */
    children: ReactNode;

    /**
     * Whether the modal can be closed by clicking on the overlay
     *
     * If `true` then you need to be in wallpaper page to close the modal
     */
    isCloseable?: boolean;

    /**
     * Called when the modal is closed
     *
     * Note: This can be called only if `isCloseable` is `true`
     * Note: This is called either when the user clicks on the overlay or on the close button
     */
    onClose?(): void;
}

/**
 * Renders a modal above the wallpaper page
 */
export function Modal(props: ModalProps) {
    const { title, children, isCloseable, onClose } = props;

    // Note: Disable scrolling on whole page when modal is open BUT keeps scroll position
    useEffect(() => {
        /**
         * Prevents the body from scrolling when the modal is open
         *
         * @param {Event} event - The scroll event.
         * @returns {boolean} - Whether the scroll event should be prevented.
         */
        const bodyScrollPrevent = (event: Event) => {
            // console.log(event.target);

            const target = event.target as HTMLElement;

            if (
                target.classList.contains(styles.overlay!) ||
                target.classList.contains(styles.bar!) ||
                target.parentElement!.classList.contains(styles.bar!)
            ) {
                event.preventDefault();
                return false;
            }
        };
        window.document.body.addEventListener('wheel', bodyScrollPrevent, { passive: false });
        window.document.body.addEventListener('touchmove', bodyScrollPrevent, { passive: false });
        return () => {
            window.document.body.removeEventListener('wheel', bodyScrollPrevent);
            window.document.body.removeEventListener('touchmove', bodyScrollPrevent);
        };
    });

    const closeHandler = useCallback(() => {
        if (!isCloseable || !onClose) {
            return;
        }
        onClose();
    }, [isCloseable, onClose]);

    return (
        <>
            <div className={styles.overlay} onClick={closeHandler} />
            <dialog
                open
                className={styles.Modal}
                onKeyDown={(event) => {
                    if (!(event.key === 'Escape' && event.shiftKey === false && event.ctrlKey === false)) {
                        return;
                    }

                    closeHandler();
                }}
            >
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                    </div>
                    <div className={styles.icons}>
                        {isCloseable && (
                            <div onClick={closeHandler}>
                                <MarkdownContent content="✖" isUsingOpenmoji />
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.content}>{children} </div>
            </dialog>
        </>
    );
}

/**
 * TODO: !!! isFullscreen - always true
 * TODO: !!! If isFullscreen react on [Esc] and [Enter] <- Remove collision with dialogs
 * TODO: [🥧] isFullscreen={false} - behave as popup window which can be multiple at once
 */
