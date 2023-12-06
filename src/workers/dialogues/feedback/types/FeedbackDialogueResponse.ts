import { Feedback } from '../../../../ai/recommendation/Feedback';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type FeedbackDialogueResponse = AbstractDialogueResponse & Feedback;
