import type { Buffer } from 'buffer';
import puppeteer from 'puppeteer';
import { forTime } from 'waitasecond';
import { string_url } from './typeAliases';


export async function fetchImageWithBypass(url: string_url): Promise<Buffer> {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    // page.setJavaScriptEnabled(false);

    await page.goto(url, { waitUntil: 'networkidle2' });
    await forTime(1000);
    const content = await page.screenshot();

    browser.close();

    return content;
}

/**
 * Note: First version with download and detect file is in commit 0234671e1f519d5dd70b17b6f8516563bd948d22
 */
