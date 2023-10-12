import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { validateDomain } from '../../utils/domains/validateDomain';
import { TaskProgress } from '../TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../TaskInProgress/TasksInProgress';
import { checkIfCertificateIsValid } from './utils/checkIfCertificateIsValid';

/**
 * Renders the loading of published page
 */
export function PublishLoading() {
    const router = useRouter();
    const domain = validateDomain(router.query.domain);
    const publicUrl = new URL(`https://${domain}/`);

    const [uploadingTask, setUploadingTask] = useState<TaskProgress>({
        name: 'uploading',
        title: `Uploading code`,
        isDone: false,
    });
    const [certificateTask, setCertificateTask] = useState<TaskProgress>({
        name: 'certificate',
        title: `Obtain SSL certificate`,
        isDone: false,
    });
    const [cdnTask, setCdnTask] = useState<TaskProgress>({
        name: 'cdn',
        title: `Distribution to CDN`,
        isDone: false,
    });

    useEffect(
        () => {
            (async () => {
                await forTime(
                    1000,
                ); /* <- TODO: Detect uploading status propperly NOT just expecting that after some time this is ready */
                setUploadingTask((task) => ({ ...task, isDone: true }));
            })();
        },
        [
            /* Note: Run this effect only once per <PublishLoading/> render */
        ],
    );

    useEffect(
        () => {
            (async () => {
                while (true) {
                    await forTime(1000);
                    const isCertificateIsValid = await checkIfCertificateIsValid(publicUrl);
                    if (isCertificateIsValid) {
                        setCertificateTask((task) => ({ ...task, isDone: true }));
                        break;
                    }
                }
            })();
        },
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        [
            /* Note: Run this effect only once per <PublishLoading/> render */
        ],
    );

    if (uploadingTask.isDone && certificateTask.isDone && cdnTask.isDone) {
        router.push(`https://${domain}/`);
    }

    return (
        <TasksInProgress
            tasksProgress={[
                {
                    name: 'publishing',
                    title: `Publishing ${domain}`,
                    isDone: false,
                },
                uploadingTask,
                certificateTask,
                cdnTask,
            ]}
        />
    );
}

/**
 * TODO: [⛱] Also test that specific build is published - by some build id
 */
