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

    useLayoutEffect(() => {
        const originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalBodyOverflow;
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

interface CustomLinkProps {
    className?: string;
    children?: ReactNode;
    title?: string;
}

interface OpenModalLinkProps extends CustomLinkProps {
    modal: string;
}

export function OpenModalLink(props: OpenModalLinkProps) {
    const { className, children, title, modal } = props;

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
                {...{ children, className, title }}
            />
        </>
    );
}

export function CloseModalLink(props: CustomLinkProps) {
    const { className, children, title } = props;

    const router = useRouter();

    return (
        <Link
            href={{
                pathname: '/showcase/[wallpaper]',
                query: {
                    wallpaper: router.query.wallpaper,
                },
            }}
            {...{ children, className, title }}
        />
    );
}

/**
 * TODO: !!! CloseModalLink
 * TODO: Closing X button
 */
