/**
 * Gets the raw file URL
 *
 * @param url URL of the file on GitHub
 * @returns URL of the file in raw format
 *
 * @example https://github.com/hejny/2d3d-game/blob/master/package.json -> https://raw.githubusercontent.com/hejny/2d3d-game/master/package.json
 */
export function getRawUrlOnGithub(url: URL): URL {
    const rawUrl = new URL(url.href);

    rawUrl.host = 'raw.githubusercontent.com';
    rawUrl.pathname = rawUrl.pathname.replace(/\/blob\//, '/');

    return rawUrl;
}
