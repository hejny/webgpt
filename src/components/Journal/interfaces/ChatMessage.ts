export type ChatMessage = TeacherChatMessage | JournalChatMessage /* <- TODO: Extract commons */;

export interface TeacherChatMessage {
    id: string;
    date: Date /* <- TODO: Rename+split into created+modified */;
    from: 'TEACHER';
    content: string /*_markdown*/;
    isComplete: boolean;
}

export interface JournalChatMessage {
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


