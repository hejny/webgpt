import { useRouter } from 'next/router';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { WorkInProgress } from '../../components/WorkInProgress/WorkInProgress';

export default function TestLoadingPage() {
    const router = useRouter();

    return (
        <>
            <StaticAppHead subtitle={null} />
            <WorkInProgress />
        </>
    );
}
