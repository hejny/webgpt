import { ReactNode, useEffect } from 'react';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import styles from './00-Modal.module.css';
import { CloseModalLink } from './10-CloseModalLink';

interface ModalProps {
    /**
     * Title of the modal
     */
    title: ReactNode;

    /**
     * The content of the modal
     */
    children: ReactNode;
}

/**
 * Renders a modal above the wallpaper page
 */
export function Modal(props: ModalProps) {
    const { title, children } = props;

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

    return (
        <>
            <CloseModalLink className={styles.overlay} />
            <dialog open className={styles.Modal}>
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                    </div>
                    <div className={styles.icons}>
                        <CloseModalLink>
                            <MarkdownContent content="✖" isUsingOpenmoji />
                        </CloseModalLink>
                    </div>
                </div>
                <div className={styles.content}>{children} </div>
            </dialog>
        </>
    );
}

/**
 * TODO: Modal in Wireframe design
 */
