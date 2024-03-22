import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import type { CheckDeploymentHandlerResponse } from '../../pages/api/check-deployment';
import { validateDomain } from '../../utils/domains/validateDomain';
import { TasksInProgress } from '../TaskInProgress/TasksInProgress';

/**
 * Renders the loading of published page
 */
export function WebsiteTablo() {
    const router = useRouter();
    const domain = validateDomain(router.query.domain);
    const publicUrl = new URL(`https://${domain}/`);

    const [deploymentStatus, setDeploymentStatus] = useState<CheckDeploymentHandlerResponse | null>(null);

    useEffect(
        () => {
            (async () => {
                while (true) {
                    await forTime(1000);
                    const response = await fetch(`/api/check-deployment?domain=${domain}`, {
                        headers: {
                            'Cache-Control': 'no-cache',
                        },
                    });

                    const newDeploymentStatus = (await response.json()) as CheckDeploymentHandlerResponse;
                    setDeploymentStatus(newDeploymentStatus);

                    if (newDeploymentStatus.isFullyReady) {
                        break;
                    }
                }
            })();
        },
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        [
            /* Note: Run this effect only once per <WebsiteTablo/> render */
        ],
    );

    if (deploymentStatus?.isFullyReady) {
        // TODO: [🧠] Maybe show some tablo with "Your website is ready" + information, license, etc.
        router.push(publicUrl);
    }

    return (
        <TasksInProgress
            tasksProgress={[
                {
                    name: 'publishing',
                    title: `Publishing **${domain}**`,
                    isDone: false,
                },
                /*
                TODO: [🧠][🚈]
                {
                    name: 'uploading',
                    title: `Uploading files`,
                    isDone: false,
                },
                {
                    name: 'certificate',
                    title: `Obtain SSL certificate`,
                    isDone: false,
                },
                {
                    name: 'cdn',
                    title: `Distribution to CDN`,
                    isDone: deploymentStatus?.isFullyReady || false,
                },
                */
            ]}
        />
    );
}

/**
 * TODO: [⛱] Also test that specific build is published - by some build id
 * TODO: !! [🧠] Information how to register domain + set CNAME
 */
