import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';

export default function TestLoadingPage() {

    return (
        <>
            <StaticAppHead subtitle={null} />
            <TasksInProgress />
        </>
    );
}
