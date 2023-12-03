import { ReactNode, useEffect } from 'react';
import { classNames } from '../../utils/classNames';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import { string_css_class } from '../../utils/typeAliases';
import { MarkdownContent } from '../Content/MarkdownContent';
import { CloseModalLink } from './10-CloseModalLink';

interface ModalProps {
    /**
     * Title of the modal
     */
    readonly title: ReactNode;

    /**
     * The content of the modal
     */
    readonly children: ReactNode;

    /**
     * When the modal is disabled it can not be closed, pointer events are disabled
     */
    readonly isDisabled?: boolean;

    /**
     * Whether the modal can be closed by clicking on the overlay
     *
     * If `true` then you need to be in wallpaper page to close the modal
     */
    readonly isCloseable?: boolean;

    /**
     * Callback which will be called when the modal is requested to be closed
     *
     * If NOT set it will use as default <CloseModalLink/>
     * Warning: YOU SHOULD set it when you are using modal with isCloseable outside of wallpaper page
     */
    readonly closeModal?: () => void;

    /**
     * Size of the modal
     *
     * @default 'FULL'
     */
    readonly size?: 'FULL' | 'MEDIUM';

    /**
     * Optional CSS class name which will be added to content part of the modal
     */
    readonly className?: string_css_class;
}

/**
 * Renders a modal above the wallpaper page
 */
export function Modal(props: ModalProps) {
    const { title, children, isDisabled, isCloseable, closeModal, size = 'FULL', className } = props;

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
            {!isCloseable || isDisabled ? (
                <div className={classNames(styles.overlay)} />
            ) : closeModal ? (
                <div onClick={closeModal} className={classNames(styles.overlay)} />
            ) : (
                <CloseModalLink className={classNames(styles.overlay)} />
            )}

            <dialog
                open
                className={classNames(
                    styles.Modal,
                    styles[size.toLocaleLowerCase() + 'Size'],
                    isDisabled && styles.isDisabled,
                )}
            >
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                    </div>
                    <div className={styles.icons}>
                        {isCloseable &&
                            (closeModal ? (
                                <button onClick={closeModal}>
                                    <MarkdownContent content="✖" isUsingOpenmoji />
                                </button>
                            ) : (
                                <CloseModalLink>
                                    <MarkdownContent content="✖" isUsingOpenmoji />
                                </CloseModalLink>
                            ))}
                    </div>
                </div>
                <div className={classNames(styles.content, className)}>{children}</div>
            </dialog>
        </>
    );
}

/**
 * TODO: Allow to drag and minimize mediumSize modals
 */
