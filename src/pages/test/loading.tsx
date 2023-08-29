import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { TaskInProgress } from '../../components/TaskInProgress/TaskInProgress';

export default function TestLoadingPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />
            <TaskInProgress />
        </>
    );
}
