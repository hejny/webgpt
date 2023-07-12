import type { Buffer } from 'buffer';
import { readdir, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import puppeteer from 'puppeteer';
import { spaceTrim } from 'spacetrim';
import { forTime } from 'waitasecond';
import { string_url } from './typeAliases';

const tmpPath = join(__dirname, 'tmp'); /* <- !! Better tmp folder */
const downloadPath = join(tmpPath, 'downloads');

export async function fetchWithBypass(url: string_url): Promise<Buffer> {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: join(process.cwd(), '.tmp', 'puppeteer', 'scraper-user-data'),
    });

    const page = await browser.newPage();

    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath,
    });

    await page.goto(url).catch(() => {
        // Note: This is a weird hack without it there occurs an error "net::ERR_ABORTED"
    });

    await forTime(
        1000 * 3 /* Note: Maybe this waiting is pointless but to be sure that the file is fully downloaded */,
    );

    // TODO: Maybe recycle the browser until the end of the parsing
    browser.close();

    const files = await readdir(downloadPath);

    if (files.length > 1) {
        throw new Error(
            spaceTrim(`
                There is more than one downloaded file
                ${downloadPath} was not clean or two parsers are running in parallel
            `),
        );
    }

    const fileName = files[0];
    const filePath = join(downloadPath, fileName);

    const content = await readFile(filePath);

    await unlink(filePath);

    return content;
}
