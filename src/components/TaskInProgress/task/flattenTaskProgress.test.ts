import { describe, expect, it } from '@jest/globals';
import { flattenTaskProgress } from './flattenTaskProgress';

describe('flattenTaskProgress', () => {
    it('should work with single task', () => {
        expect(
            flattenTaskProgress({
                name: 'main',
                title: 'Main task',
                isDone: false,
            }),
        ).toEqual([
            {
                name: 'main',
                title: 'Main task',
                isDone: false,
            },
        ]);
    });

    it('should flatten simple tree', () => {
        expect(
            flattenTaskProgress({
                name: 'main',
                title: 'Main task',
                isDone: false,
                subtasks: [
                    {
                        name: 'subtask1',
                        title: 'Task 1',
                        isDone: true,
                    },
                    {
                        name: 'subtask2',
                        title: 'Task 2',
                        isDone: true,
                    },
                    {
                        name: 'subtask3',
                        title: 'Task 3',
                        isDone: false,
                    },
                ],
            }),
        ).toEqual([
            {
                name: 'main',
                title: 'Main task',
                isDone: false,
            },
            {
                name: 'subtask1',
                title: 'Task 1',
                isDone: true,
            },
            {
                name: 'subtask2',
                title: 'Task 2',
                isDone: true,
            },
            {
                name: 'subtask3',
                title: 'Task 3',
                isDone: false,
            },
        ]);
    });

    it('should flatten advanced tree', () => {
        expect(
            flattenTaskProgress({
                name: 'main',
                title: 'Main task',
                isDone: false,
                subtasks: [
                    {
                        name: 'subtask1',
                        title: 'Task 1',
                        isDone: true,
                    },
                    {
                        name: 'subtask2',
                        title: 'Task 2',
                        isDone: true,
                    },
                    {
                        name: 'subtask3',
                        title: 'Task 3',
                        isDone: false,
                        subtasks: [
                            {
                                name: 'subtask3-1',
                                title: 'Task 3.1',
                                isDone: true,
                            },
                            {
                                name: 'subtask3-2',
                                title: 'Task 3.2',
                                isDone: false,
                            },
                            {
                                name: 'subtask3-3',
                                title: 'Task 3.3',
                                isDone: false,
                            },
                            {
                                name: 'subtask3-4',
                                title: 'Task 3.4',
                                isDone: false,
                            },
                        ],
                    },
                    {
                        name: 'subtask4',
                        title: 'Task 4',
                        isDone: false,
                    },
                ],
            }),
        ).toEqual([
            {
                name: 'main',
                title: 'Main task',
                isDone: false,
            },
            {
                name: 'subtask1',
                title: 'Task 1',
                isDone: true,
            },
            {
                name: 'subtask2',
                title: 'Task 2',
                isDone: true,
            },
            {
                name: 'subtask3',
                title: 'Task 3',
                isDone: false,
            },
            {
                name: 'subtask3-1',
                title: 'Task 3.1',
                isDone: true,
            },
            {
                name: 'subtask3-2',
                title: 'Task 3.2',
                isDone: false,
            },
            {
                name: 'subtask3-3',
                title: 'Task 3.3',
                isDone: false,
            },
            {
                name: 'subtask3-4',
                title: 'Task 3.4',
                isDone: false,
            },
            {
                name: 'subtask4',
                title: 'Task 4',
                isDone: false,
            },
        ]);
    });
});
