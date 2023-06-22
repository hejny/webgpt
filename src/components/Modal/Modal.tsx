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

    /*
    TODO: !!! Disables scrolling on whole page when modal is open BUT keeps scroll position
    
    // Note: Disables scrolling on whole page when modal is open BUT keeps scroll position
    useLayoutEffect(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        window.document.body.style.scrollBehavior = `none`;

        const bodyScrollPrevent = (event: Event) => {
            console.log(event);
            window.scrollTo(scrollLeft, scrollTop);
        };
        document.body.addEventListener('scroll', bodyScrollPrevent, true);
        return () => {
            document.body.removeEventListener('scroll', bodyScrollPrevent, true);
            window.document.body.style.scrollBehavior = `smooth`;
        };
    });

    */

    useLayoutEffect(() => {
        document.addEventListener(
            'scroll',
            (event: Event) => {
                console.log('document scroll');
            },
            true,
        );
    });

    return (
        <>
            <CloseModalLink
                className={styles.overlay}
                onWheel={(event) => {
                    console.log('overlay wheel');
                    event.stopPropagation();
                }}
                onWheelCapture={(event) => {
                    console.log('overlay wheel capture');
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onTouchMove={(event) => {
                    console.log('overlay touchmove');
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onTouchMoveCapture={(event) => {
                    console.log('overlay touchmove capture');
                    event.stopPropagation();
                    event.preventDefault();
                }}
            />
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
