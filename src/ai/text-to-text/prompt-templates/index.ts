import modifyWebsiteContent from '../../../../prompts/templates/modify-website-content.md';
import writeWebsiteClaim from '../../../../prompts/templates/write-website-claim.md';
import writeWebsiteContent from '../../../../prompts/templates/write-website-content.md';
import writeWebsiteFont from '../../../../prompts/templates/write-website-font.md';
import writeWebsiteTitle from '../../../../prompts/templates/write-website-title.md';
import { PromptTemplate } from './lib/src/PromptTemplate';

export const MODIFY_WEBSITE_CONTENT_TEMPLATE = new PromptTemplate<'CHAT'>(modifyWebsiteContent);
export const WRITE_WEBSITE_TITLE_TEMPLATE = new PromptTemplate<'CHAT'>(writeWebsiteTitle);
export const WRITE_WEBSITE_CLAIM_TEMPLATE = new PromptTemplate<'CHAT'>(writeWebsiteClaim);
export const WRITE_WEBSITE_CONTENT_TEMPLATE = new PromptTemplate<'CHAT'>(writeWebsiteContent);
export const WRITE_WEBSITE_FONT_TEMPLATE = new PromptTemplate<'CHAT'>(writeWebsiteFont);

/**
 * TODO: This should be auto-generated from the /prompts/templates/ folder
 */
