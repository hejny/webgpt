import { StaticLayout } from '../../components/StaticLayout/StaticLayout';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';

export default function TestLoadingPage() {
    return (
        <StaticLayout subtitle="Test loading">
            <TasksInProgress />
        </StaticLayout>
    );
}
