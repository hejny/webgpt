import styles from './MidjourneyLink.module.css';

interface MidjourneyLinkProps {
    children: string;
}

export function MidjourneyLink(props: MidjourneyLinkProps) {
    const { children } = props;

    const match = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.exec(children);

    if (!match) {
        return <>{children}</>;
    }

    const jobUuid = match[0];

    return (
        <a
            className={styles.midjourneyLink}
            href={`https://www.midjourney.com/app/jobs/${jobUuid}`}
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </a>
    );
}
