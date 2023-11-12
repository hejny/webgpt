import { string_name } from "@promptbook/types";

export interface DialogueRequestInQueue{
    dialogueTypeName: string_name;
    request: any;
    response?: any;
}

/**
 * !!! Annotate all
 */