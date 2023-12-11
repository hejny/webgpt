import type { ClientVerification } from '../../../../utils/client/ClientVerification';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type ValidateEmailDialogueResponse = AbstractDialogueResponse & ClientVerification;
