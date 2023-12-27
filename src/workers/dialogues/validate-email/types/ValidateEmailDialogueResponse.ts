import type { ClientEmailVerification } from '../../../../utils/client/ClientVerification';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type ValidateEmailDialogueResponse = AbstractDialogueResponse & ClientEmailVerification;
