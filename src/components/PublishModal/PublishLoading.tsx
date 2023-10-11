import { useRouter } from 'next/router';
import { validateDomain } from '../../utils/validators/validateDomain';
import { TasksInProgress } from '../TaskInProgress/TasksInProgress';

/**
 * Renders the loading of published page
 */
export function PublishLoading() {
    const router = useRouter();

    console.log('!!!');
    console.log('!!!', router.query);
    const domain = validateDomain(router.query.domain);

    return (
        <TasksInProgress
            tasksProgress={[
                {
                    name: 'publishing',
                    title: `Publishing the website ${domain}`,
                    isDone: false,
                },
            ]}
        />
    );
}
