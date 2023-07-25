import { Barlow_Condensed } from '@next/font/google';
import { ReactNode, useEffect } from 'react';
import { classNames } from '../../utils/classNames';
import { MarkdownContent } from '../MarkdownContent/MarkdownContent';
import { CloseModalLink } from './10-CloseModalLink';
import styles from './Modal.module.css';

interface ModalProps {
    title: ReactNode;
    children: ReactNode;
}

const font = Barlow_Condensed({ weight: '400', style: 'normal', subsets: ['latin', 'latin-ext'] });

/**
 * @@
 */
export function Modal(props: ModalProps) {
    const { title, children } = props;

    // Note: Disable scrolling on whole page when modal is open BUT keeps scroll position
    useEffect(() => {
        const bodyScrollPrevent = (event: Event) => {
            // console.log(event.target);

            const target = event.target as HTMLElement;

            if (
                target.classList.contains(styles.overlay) ||
                target.classList.contains(styles.bar) ||
                target.parentElement!.classList.contains(styles.bar)
            ) {
                event.preventDefault();
                return false;
            }
        };
        document.body.addEventListener('wheel', bodyScrollPrevent, { passive: false });
        document.body.addEventListener('touchmove', bodyScrollPrevent, { passive: false });
        return () => {
            document.body.removeEventListener('wheel', bodyScrollPrevent);
            document.body.removeEventListener('touchmove', bodyScrollPrevent);
        };
    });

    return (
        <>
            <CloseModalLink className={styles.overlay} />
            <dialog open className={classNames(styles.Modal, font.className)}>
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
