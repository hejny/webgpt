/**
 * Checks if the SSL (https) certificate of the given URL is valid
 */
export async function checkIfCertificateIsValid(url: URL): Promise<boolean> {
    try {
        // TODO: !!!! Need to use some proxy here
        const response = await fetch(url.href, {
            mode: 'cors',
            headers: {
                'Cache-Control': 'no-cache',
            },
        });
        const certificate = response.headers.get('certificate');
        if (!certificate) {
            return false;
        }

        const certificateJson = JSON.parse(certificate) as any;
        const validTo = new Date(certificateJson.valid_to);
        const now = new Date();
        const isValid = validTo > now;
        return isValid;
    } catch (error) {
        return false;
    }
}
