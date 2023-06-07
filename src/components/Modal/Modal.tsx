import { useRouter } from 'next-router-mock';
import Link from 'next/link';
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
            <Link
                className={styles.overlay}
                href={{
                    pathname: router.pathname,
                    query: {
                        slug: router.query.slug,
                    },
                }}
            />
            <div className={styles.Modal}>
                <div className={styles.title}>{title}</div>
                {children}
            </div>
        </>
    );
}

/**
 * TODO: Closing X button
 */
