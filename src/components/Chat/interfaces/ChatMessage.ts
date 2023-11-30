export type ChatMessage = TeacherChatMessage | SimpleChatChatMessage /* <- TODO: Extract commons */;

export interface TeacherChatMessage {
    id: string;
    date: Date /* <- TODO: Rename+split into created+modified */;
    from: 'TEACHER';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface SimpleChatChatMessage {
    id: string;
    // TODO: gptMessageId: string;
    date: Date /* <- TODO: Rename+split into created+modified */;
    from: 'JOURNAL';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface CompleteChatMessage {
    isComplete: true;
}

/**
 * TODO: [🧠] ACRY Rename JOURNAL + TEACHER, Teacher, teacher to sth else
 */
