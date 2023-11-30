import { describe, expect, it } from '@jest/globals';
import { just } from '../../../utils/just';
import { joinTasksProgress } from './joinTasksProgress';

describe('joinTasksProgress', () => {
    it('should work with no task', () => {
        expect(joinTasksProgress()).toEqual([]);
    });

    it('should keep one task as it is', () => {
        expect(
            joinTasksProgress({
                name: 'image-analysis',
                title: 'Analyzing image',
                isDone: false,
            }),
        ).toEqual([
            {
                name: 'image-analysis',
                title: 'Analyzing image',
                isDone: false,
            },
        ]);
    });

    it('should keep two different tasks as they are', () => {
        expect(
            joinTasksProgress(
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: false,
                },
                {
                    name: 'text-analysis',
                    title: 'Analyzing text',
                    isDone: false,
                },
            ),
        ).toEqual(
            just([
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: false,
                },
                {
                    name: 'text-analysis',
                    title: 'Analyzing text',
                    isDone: false,
                },
            ]),
        );
    });

    it('should done the same task', () => {
        expect(
            joinTasksProgress(
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: false,
                },
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: true,
                },
            ),
        ).toEqual(
            just([
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: true,
                },
            ]),
        );
    });

    it('should done the same task and preserve title', () => {
        expect(
            joinTasksProgress(
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: false,
                },
                {
                    name: 'image-analysis',
                    isDone: true,
                },
            ),
        ).toEqual(
            just([
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: true,
                },
            ]),
        );
    });

    it('should work in advanced situation', () => {
        expect(
            joinTasksProgress(
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: false,
                },
                {
                    name: 'text-analysis',
                    title: 'Analyzing text',
                    isDone: false,
                },
                {
                    name: 'image-analysis',
                    isDone: true,
                },
                {
                    name: 'voice-analysis',
                    title: 'Analyzing voice',
                    isDone: true,
                },
            ),
        ).toEqual(
            just([
                {
                    name: 'image-analysis',
                    title: 'Analyzing image',
                    isDone: true,
                },
                {
                    name: 'text-analysis',
                    title: 'Analyzing text',
                    isDone: false,
                },
                {
                    name: 'voice-analysis',
                    title: 'Analyzing voice',
                    isDone: true,
                },
            ]),
        );
    });

    it('should crash when missing title', () => {
        expect(() =>
            joinTasksProgress({
                name: 'image-analysis',
                isDone: true,
            }),
        ).toThrowError(/Missing title for task \"image-analysis\"/i);
    });
});
