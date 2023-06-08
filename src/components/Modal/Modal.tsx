import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
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

    const router = useRouter();

    return (
        <>
            <CloseModalLink className={styles.overlay} />
            <div className={styles.Modal}>
                <div className={styles.title}>
                    {title}
                    <CloseModalLink className={styles.closeIcon}>X</CloseModalLink>
                </div>
                {children}
            </div>
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
                    pathname: '/showcase/[slug]',
                    query: {
                        slug: router.query.slug,
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
                pathname: '/showcase/[slug]',
                query: {
                    slug: router.query.slug,
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
