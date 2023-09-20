import { faker } from '@faker-js/faker';
import { spaceTrim } from 'spacetrim';
import type { Promisable } from 'type-fest';
import { forTime } from 'waitasecond';
import { alertDialogue } from '../../../Dialogues/dialogues/alertDialogue';
import { promptDialogue } from '../../../Dialogues/dialogues/promptDialogue';
import type { TaskProgress } from '../TaskProgress';

export async function mockedMultitaskWithPrompts(
    onProgress: (taskProgress: TaskProgress) => Promisable<void>,
): Promise<void> {
    console.info(
        spaceTrim(`
            %cStart mockedMultitaskWithPrompts
            Note: This should be used only for development purposes.
        `), // <- TODO: Put only in one bracket
        spaceTrim(`
            display: block;
            background: #F1E314;
            border: 1px solid #7E7E7E;
            color: #000000;
            padding: 5px;
            border-radius: 3px;
        `),
    );

    for (let i = 0; i < 5; i++) {
        await forTime(Math.random() * 1000 + 500);

        const title = faker.hacker.verb();

        await onProgress({
            name: `mocked-task-${i}`,
            title: (
                <>
                    ({i}) {title}
                </>
            ),
            isDone: false,
        });

        for (let j = 0; j < 5; j++) {
            if (Math.random() < 0.5) {
                break;
            }
            const answer = await alertDialogue(
                <>
                    Warning about the <span style={{ fontStyle: 'italic' }}>{title}</span>
                </>,
            );
        }

        const promptOptions = {
            prompt: (
                <>
                    Question about the <span style={{ fontStyle: 'italic' }}>{title}</span>
                </>
            ),
            defaultValue: faker.hacker.verb(),
            placeholder: faker.hacker.phrase(),
            isCloseable: true,
        };
        const answer = await promptDialogue(promptOptions);

        console.info('📢', answer, promptOptions);

        await onProgress({
            name: `mocked-task-${i}`,
            title: (
                <>
                    ({i}) {title} {answer === null ? undefined : <i>({answer})</i>}
                </>
            ),
            isDone: true,
        });
    }
}

/**
 * TODO: Maybe reflect response from promptDialogue in UI (like in TaskProgress)
 */
