import { Promisable } from 'type-fest';
import { forTime, forValueDefined } from 'waitasecond';

export async function forCondition(
    getResult: () => Promisable<boolean>,
    waiter: () => Promise<void> = async () => {
        await forTime(10);
    },
    limit: number = 1000,
): Promise<void> {
    await forValueDefined(async () => ((await getResult()) ? true : null), waiter, limit);
    return;
}
