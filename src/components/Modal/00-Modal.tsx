import { ReactNode, useEffect } from 'react';
import { classNames } from '../../utils/classNames';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import { string_css_class } from '../../utils/typeAliases';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
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

    /**
     * Whether the modal can be closed by clicking on the overlay
     *
     * If `true` then you need to be in wallpaper page to close the modal
     */
    isCloseable?: boolean;

    /**
     * Optional CSS class name which will be added to content part of the modal
     */
    readonly className?: string_css_class;
}

/**
 * Renders a modal above the wallpaper page
 */
export function Modal(props: ModalProps) {
    const { title, children, isCloseable, className } = props;

    const styles = useStyleModule(import('./00-Modal.module.css'));

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
            {isCloseable ? <CloseModalLink className={styles.overlay} /> : <div className={styles.overlay} />}
            <dialog open className={styles.Modal}>
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                    </div>
                    <div className={styles.icons}>
                        {isCloseable && (
                            <CloseModalLink>
                                <MarkdownContent content="✖" isUsingOpenmoji />
                            </CloseModalLink>
                        )}
                    </div>
                </div>
                <div className={classNames(styles.content, className)}>{children} </div>
            </dialog>
        </>
    );
}
