export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            Client: {
                Row: {
                    clientId: string;
                    createdAt: string | null;
                    email: string | null;
                    emailPreferences: Json | null;
                };
                Insert: {
                    clientId: string;
                    createdAt?: string | null;
                    email?: string | null;
                    emailPreferences?: Json | null;
                };
                Update: {
                    clientId?: string;
                    createdAt?: string | null;
                    email?: string | null;
                    emailPreferences?: Json | null;
                };
                Relationships: [];
            };
            ClientEmailVerification: {
                Row: {
                    createdAt: string;
                    id: number;
                    verificationRequestId: number;
                };
                Insert: {
                    createdAt?: string;
                    id?: number;
                    verificationRequestId: number;
                };
                Update: {
                    createdAt?: string;
                    id?: number;
                    verificationRequestId?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'ClientEmailVerification_verificationRequestId_fkey';
                        columns: ['verificationRequestId'];
                        referencedRelation: 'ClientEmailVerificationRequest';
                        referencedColumns: ['id'];
                    },
                ];
            };
            ClientEmailVerificationRequest: {
                Row: {
                    clientId: string;
                    code: string;
                    createdAt: string;
                    email: string;
                    id: number;
                };
                Insert: {
                    clientId?: string;
                    code: string;
                    createdAt?: string;
                    email: string;
                    id?: number;
                };
                Update: {
                    clientId?: string;
                    code?: string;
                    createdAt?: string;
                    email?: string;
                    id?: number;
                };
                Relationships: [];
            };
            ImagePromptExecution: {
                Row: {
                    clientId: string | null;
                    createdAt: string;
                    id: number;
                    prompt: Json | null;
                    promptAt: string | null;
                    promptContent: string | null;
                    ptbkUrl: string | null;
                    rawResponse: Json | null;
                    result: Json | null;
                    resultAt: string | null;
                    resultSrc: string | null;
                    usedModel: string | null;
                };
                Insert: {
                    clientId?: string | null;
                    createdAt?: string;
                    id?: number;
                    prompt?: Json | null;
                    promptAt?: string | null;
                    promptContent?: string | null;
                    ptbkUrl?: string | null;
                    rawResponse?: Json | null;
                    result?: Json | null;
                    resultAt?: string | null;
                    resultSrc?: string | null;
                    usedModel?: string | null;
                };
                Update: {
                    clientId?: string | null;
                    createdAt?: string;
                    id?: number;
                    prompt?: Json | null;
                    promptAt?: string | null;
                    promptContent?: string | null;
                    ptbkUrl?: string | null;
                    rawResponse?: Json | null;
                    result?: Json | null;
                    resultAt?: string | null;
                    resultSrc?: string | null;
                    usedModel?: string | null;
                };
                Relationships: [];
            };
            Prompt: {
                Row: {
                    answer: string | null;
                    answerAt: string | null;
                    clientId: string | null;
                    createdAt: string;
                    externalId: string | null;
                    fullCompletion: Json | null;
                    id: number;
                    metadata: Json | null;
                    model: string | null;
                    modelSettings: Json | null;
                    previousExternalId: string | null;
                    prompt: string | null;
                    promptAt: string | null;
                    systemMessage: string | null;
                    type: string | null;
                };
                Insert: {
                    answer?: string | null;
                    answerAt?: string | null;
                    clientId?: string | null;
                    createdAt?: string;
                    externalId?: string | null;
                    fullCompletion?: Json | null;
                    id?: number;
                    metadata?: Json | null;
                    model?: string | null;
                    modelSettings?: Json | null;
                    previousExternalId?: string | null;
                    prompt?: string | null;
                    promptAt?: string | null;
                    systemMessage?: string | null;
                    type?: string | null;
                };
                Update: {
                    answer?: string | null;
                    answerAt?: string | null;
                    clientId?: string | null;
                    createdAt?: string;
                    externalId?: string | null;
                    fullCompletion?: Json | null;
                    id?: number;
                    metadata?: Json | null;
                    model?: string | null;
                    modelSettings?: Json | null;
                    previousExternalId?: string | null;
                    prompt?: string | null;
                    promptAt?: string | null;
                    systemMessage?: string | null;
                    type?: string | null;
                };
                Relationships: [];
            };
            PromptbookFeedback: {
                Row: {
                    clientId: string | null;
                    createdAt: string;
                    defaultValue: string | null;
                    id: number;
                    likedStatus: string | null;
                    note: string | null;
                    value: string | null;
                };
                Insert: {
                    clientId?: string | null;
                    createdAt?: string;
                    defaultValue?: string | null;
                    id?: number;
                    likedStatus?: string | null;
                    note?: string | null;
                    value?: string | null;
                };
                Update: {
                    clientId?: string | null;
                    createdAt?: string;
                    defaultValue?: string | null;
                    id?: number;
                    likedStatus?: string | null;
                    note?: string | null;
                    value?: string | null;
                };
                Relationships: [];
            };
            PromptExecution: {
                Row: {
                    clientId: string | null;
                    createdAt: string;
                    id: number;
                    promptAt: string | null;
                    promptContent: string | null;
                    promptModelRequirements: Json | null;
                    promptParameters: Json | null;
                    ptpUrl: string | null;
                    rawResponse: Json | null;
                    resultAt: string | null;
                    resultContent: string | null;
                    usedModel: string | null;
                };
                Insert: {
                    clientId?: string | null;
                    createdAt?: string;
                    id?: number;
                    promptAt?: string | null;
                    promptContent?: string | null;
                    promptModelRequirements?: Json | null;
                    promptParameters?: Json | null;
                    ptpUrl?: string | null;
                    rawResponse?: Json | null;
                    resultAt?: string | null;
                    resultContent?: string | null;
                    usedModel?: string | null;
                };
                Update: {
                    clientId?: string | null;
                    createdAt?: string;
                    id?: number;
                    promptAt?: string | null;
                    promptContent?: string | null;
                    promptModelRequirements?: Json | null;
                    promptParameters?: Json | null;
                    ptpUrl?: string | null;
                    rawResponse?: Json | null;
                    resultAt?: string | null;
                    resultContent?: string | null;
                    usedModel?: string | null;
                };
                Relationships: [];
            };
            Site: {
                Row: {
                    author: string | null;
                    createdAt: string | null;
                    id: number;
                    note: string | null;
                    ownerEmail: string | null;
                    plan: string | null;
                    url: string | null;
                    wallpaperId: string | null;
                };
                Insert: {
                    author?: string | null;
                    createdAt?: string | null;
                    id?: number;
                    note?: string | null;
                    ownerEmail?: string | null;
                    plan?: string | null;
                    url?: string | null;
                    wallpaperId?: string | null;
                };
                Update: {
                    author?: string | null;
                    createdAt?: string | null;
                    id?: number;
                    note?: string | null;
                    ownerEmail?: string | null;
                    plan?: string | null;
                    url?: string | null;
                    wallpaperId?: string | null;
                };
                Relationships: [];
            };
            SupportRequest: {
                Row: {
                    author: string | null;
                    createdAt: string | null;
                    from: string | null;
                    id: number;
                    isSolved: boolean | null;
                    message: string | null;
                    note: string | null;
                };
                Insert: {
                    author?: string | null;
                    createdAt?: string | null;
                    from?: string | null;
                    id?: number;
                    isSolved?: boolean | null;
                    message?: string | null;
                    note?: string | null;
                };
                Update: {
                    author?: string | null;
                    createdAt?: string | null;
                    from?: string | null;
                    id?: number;
                    isSolved?: boolean | null;
                    message?: string | null;
                    note?: string | null;
                };
                Relationships: [];
            };
            Value: {
                Row: {
                    createdAt: string;
                    id: number;
                    key: string | null;
                    note: string | null;
                    validUntil: string | null;
                    value: Json | null;
                };
                Insert: {
                    createdAt?: string;
                    id?: number;
                    key?: string | null;
                    note?: string | null;
                    validUntil?: string | null;
                    value?: Json | null;
                };
                Update: {
                    createdAt?: string;
                    id?: number;
                    key?: string | null;
                    note?: string | null;
                    validUntil?: string | null;
                    value?: Json | null;
                };
                Relationships: [];
            };
            Wallpaper: {
                Row: {
                    author: string;
                    colorStats: Json | null;
                    content: string;
                    createdAt: string;
                    id: string;
                    isPublic: boolean;
                    keywords: string[] | null;
                    naturalSize: Json | null;
                    parent: string | null;
                    prompt: string | null;
                    src: string;
                    title: string;
                };
                Insert: {
                    author: string;
                    colorStats?: Json | null;
                    content: string;
                    createdAt?: string;
                    id: string;
                    isPublic?: boolean;
                    keywords?: string[] | null;
                    naturalSize?: Json | null;
                    parent?: string | null;
                    prompt?: string | null;
                    src: string;
                    title: string;
                };
                Update: {
                    author?: string;
                    colorStats?: Json | null;
                    content?: string;
                    createdAt?: string;
                    id?: string;
                    isPublic?: boolean;
                    keywords?: string[] | null;
                    naturalSize?: Json | null;
                    parent?: string | null;
                    prompt?: string | null;
                    src?: string;
                    title?: string;
                };
                Relationships: [];
            };
            WallpaperFeedback: {
                Row: {
                    author: string;
                    createdAt: string;
                    likedStatus: string;
                    note: string | null;
                    wallpaperId: string;
                };
                Insert: {
                    author: string;
                    createdAt?: string;
                    likedStatus: string;
                    note?: string | null;
                    wallpaperId: string;
                };
                Update: {
                    author?: string;
                    createdAt?: string;
                    likedStatus?: string;
                    note?: string | null;
                    wallpaperId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'WallpaperFeedback_wallpaperId_fkey';
                        columns: ['wallpaperId'];
                        referencedRelation: 'Wallpaper';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'WallpaperFeedback_wallpaperId_fkey';
                        columns: ['wallpaperId'];
                        referencedRelation: 'Wallpaper_random';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            Prompt_stats: {
                Row: {
                    answer: string | null;
                    answerAt: string | null;
                    clientId: string | null;
                    createdAt: string | null;
                    duration: unknown | null;
                    externalId: string | null;
                    fullCompletion: Json | null;
                    id: number | null;
                    metadata: Json | null;
                    model: string | null;
                    modelSettings: Json | null;
                    nonce: number | null;
                    previousExternalId: string | null;
                    prompt: string | null;
                    promptAt: string | null;
                    systemMessage: string | null;
                    type: string | null;
                };
                Insert: {
                    answer?: string | null;
                    answerAt?: string | null;
                    clientId?: string | null;
                    createdAt?: string | null;
                    duration?: never;
                    externalId?: string | null;
                    fullCompletion?: Json | null;
                    id?: number | null;
                    metadata?: Json | null;
                    model?: string | null;
                    modelSettings?: Json | null;
                    nonce?: never;
                    previousExternalId?: string | null;
                    prompt?: string | null;
                    promptAt?: string | null;
                    systemMessage?: string | null;
                    type?: string | null;
                };
                Update: {
                    answer?: string | null;
                    answerAt?: string | null;
                    clientId?: string | null;
                    createdAt?: string | null;
                    duration?: never;
                    externalId?: string | null;
                    fullCompletion?: Json | null;
                    id?: number | null;
                    metadata?: Json | null;
                    model?: string | null;
                    modelSettings?: Json | null;
                    nonce?: never;
                    previousExternalId?: string | null;
                    prompt?: string | null;
                    promptAt?: string | null;
                    systemMessage?: string | null;
                    type?: string | null;
                };
                Relationships: [];
            };
            Wallpaper_random: {
                Row: {
                    author: string | null;
                    colorStats: Json | null;
                    content: string | null;
                    createdAt: string | null;
                    id: string | null;
                    isPublic: boolean | null;
                    keywords: string[] | null;
                    nonce: number | null;
                    parent: string | null;
                    prompt: string | null;
                    src: string | null;
                    title: string | null;
                };
                Insert: {
                    author?: string | null;
                    colorStats?: Json | null;
                    content?: string | null;
                    createdAt?: string | null;
                    id?: string | null;
                    isPublic?: boolean | null;
                    keywords?: string[] | null;
                    nonce?: never;
                    parent?: string | null;
                    prompt?: string | null;
                    src?: string | null;
                    title?: string | null;
                };
                Update: {
                    author?: string | null;
                    colorStats?: Json | null;
                    content?: string | null;
                    createdAt?: string | null;
                    id?: string | null;
                    isPublic?: boolean | null;
                    keywords?: string[] | null;
                    nonce?: never;
                    parent?: string | null;
                    prompt?: string | null;
                    src?: string | null;
                    title?: string | null;
                };
                Relationships: [];
            };
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
