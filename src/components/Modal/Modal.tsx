import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useLayoutEffect } from 'react';
import { Article } from '../Article/Article';
import styles from './Modal.module.css';

interface ModalProps {
    title: ReactNode;
    children: ReactNode;
}

/**
 * @@
 */
export function Modal(props: ModalProps) {
    const { title, children } = props;

    // Note: Disable scrolling on whole page when modal is open BUT keeps scroll position
    useLayoutEffect(() => {
        const bodyScrollPrevent = (event: Event) => {
            event.preventDefault();
            return false;
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
            <dialog open className={styles.Modal}>
                <div className={styles.bar}>
                    <div className={styles.title}>
                        <h2>{title}</h2>
                    </div>
                    <div className={styles.icons}>
                        <CloseModalLink>
                            <Article content="✖" isUsingOpenmoji />
                        </CloseModalLink>
                    </div>
                </div>
                <div className={styles.content}>{children} </div>
            </dialog>
        </>
    );
}

interface OpenModalLinkProps extends CloseModalLinkProps {
    modal: string;
}

export function OpenModalLink(props: OpenModalLinkProps) {
    const { modal } = props;

    const router = useRouter();

    return (
        <>
            <Link
                href={{
                    pathname: '/showcase/[wallpaper]',
                    query: {
                        wallpaper: router.query.wallpaper,
                        modal,
                    },
                }}
                {...props}
            />
        </>
    );
}

type CloseModalLinkProps = Omit<React.ComponentProps<'a'>, 'ref'>;

export function CloseModalLink(props: CloseModalLinkProps) {
    const router = useRouter();

    return (
        <Link
            href={{
                pathname: '/showcase/[wallpaper]',
                query: {
                    wallpaper: router.query.wallpaper,
                },
            }}
            {...props}
        />
    );
}

/**
 * TODO: !!! CloseModalLink
 * TODO: Closing X button
 */
