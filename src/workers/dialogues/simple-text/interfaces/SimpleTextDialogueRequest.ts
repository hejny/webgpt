import { message } from "../../../../utils/typeAliases";


export interface SimpleTextDialogueRequest{
 /**
     * Prompt message
     *
     * Note: This is not a prompt to language model but a prompt to the user
     */
 prompt: message;

 /**
  * Default value for the input/textarea
  */
 defaultValue: string | null;

 /**
  * Placeholder for the input/textarea
  */
 placeholder?: string;

}


/**
 * TODO: !!! Annotate + readonly
 */