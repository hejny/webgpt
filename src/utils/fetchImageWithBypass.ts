import type { Buffer } from 'buffer';
import puppeteer from 'puppeteer';
import { forTime } from 'waitasecond';
import { string_url } from './typeAliases';

/**
 * @deprecated (OR maybe not) BUT not working yet
 *
 * Fetch the image and bypass the cloudflare protection
 *
 * @param url
 * @returns the image as a buffer
 */
export function fetchImageWithBypass(url: string_url): Promise<Buffer> {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        page.on('response', async (response) => {
            if (response.url() !== url) {
                console.log(`🚯 ${response.url()}`);
                return;
            }

            if (response.request().resourceType() !== 'document') {
                console.log(`🚯 ${response.request().resourceType()}`);
                return;
            }

            const buffer = await response.buffer();
            resolve(buffer);
        });

        await page.goto(url);
        await forTime(60 * 1000);
        browser.close();

        reject(new Error(`Timeout on fetchImageWithBypass`));
    });
}

/**
 * TODO: !! Share one browser instance in some pool
 * TODO: !! Timeout
 * Note: [🚯]
 * TODO: Test URL validity - error on 4xx and 5xx codes
 * Note: First version with download and detect file is in commit 0234671e1f519d5dd70b17b6f8516563bd948d22
 */
