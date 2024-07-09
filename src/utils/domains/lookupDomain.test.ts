import { describe, expect, it } from '@jest/globals';
import { lookupDomain } from './lookupDomain';

jest.setTimeout(60 * 1000);

describe(`lookupDomain`, () => {
    it(`is looksup registered domains`, async () => {
        await expect(lookupDomain(`webgpt.cz`)).resolves.toMatchObject({
            objectClassName: 'domain',
            handle: 'webgpt.cz',
        });
        await expect(lookupDomain(`webgpt.com`)).resolves.toMatchObject({
            handle: '2671448557_DOMAIN_COM-VRSN',
            ldhName: 'WEBGPT.COM',
        });
        await expect(lookupDomain(`google.com`)).resolves.toMatchObject({
            objectClassName: 'domain',
            handle: '2138514_DOMAIN_COM-VRSN',
            ldhName: 'GOOGLE.COM',
        });
        await expect(lookupDomain(`towns.cz`)).resolves.toMatchObject({ handle: 'towns.cz' });
        // TODO: [🌍] We have problem with EU domains - no RDAP server found
        //     > await expect(lookupDomain(`svetlodat.eu`)).resolves.toMatchObject({ handle: 'svetlodat.eu' });
        // !!!? expect.assertions(9);
    });

    it(`is looksup free domains`, async () => {
        await expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.com`)).resolves.toBe('NOT_FOUND');
        await expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.cz`)).resolves.toBe('NOT_FOUND');
        // [🌍]  await expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.eu`)).resolves.toBe('NOT_FOUND');
        await expect(lookupDomain(`sdgfsdfgsdgdgsdfgd.org`)).resolves.toBe('NOT_FOUND');
    });

    it(`is looksup webgpt.cz in more detail`, async () => {
        await expect(lookupDomain(`webgpt.cz`)).resolves.toEqual({
            objectClassName: 'domain',
            rdapConformance: ['rdap_level_0', 'fred_version_0'],
            handle: 'webgpt.cz',
            ldhName: 'webgpt.cz',
            links: [
                {
                    value: 'https://rdap.nic.cz/domain/webgpt.cz',
                    rel: 'self',
                    href: 'https://rdap.nic.cz/domain/webgpt.cz',
                    type: 'application/rdap+json',
                },
            ],
            port43: 'whois.nic.cz',
            events: [
                {
                    eventAction: 'registration',
                    eventDate: '2023-10-04T18:49:03+00:00',
                },
                {
                    eventAction: 'expiration',
                    eventDate: '2024-10-03T22:00:00+00:00',
                },
                {
                    eventAction: 'last changed',
                    eventDate: '2023-10-05T09:23:14+00:00',
                },
            ],
            entities: [
                {
                    objectClassName: 'entity',
                    handle: 'FORPSI-R5O-S214102',
                    roles: ['registrant'],
                    links: [
                        {
                            value: 'https://rdap.nic.cz/entity/FORPSI-R5O-S214102',
                            rel: 'self',
                            href: 'https://rdap.nic.cz/entity/FORPSI-R5O-S214102',
                            type: 'application/rdap+json',
                        },
                    ],
                },
                {
                    objectClassName: 'entity',
                    handle: 'REG-INTERNET-CZ',
                    roles: ['registrar'],
                },
            ],
            status: ['active'],
            nameservers: [
                {
                    objectClassName: 'nameserver',
                    handle: 'rick.ns.cloudflare.com',
                    ldhName: 'rick.ns.cloudflare.com',
                    links: [
                        {
                            value: 'https://rdap.nic.cz/nameserver/rick.ns.cloudflare.com',
                            rel: 'self',
                            href: 'https://rdap.nic.cz/nameserver/rick.ns.cloudflare.com',
                            type: 'application/rdap+json',
                        },
                    ],
                },
                {
                    objectClassName: 'nameserver',
                    handle: 'tia.ns.cloudflare.com',
                    ldhName: 'tia.ns.cloudflare.com',
                    links: [
                        {
                            value: 'https://rdap.nic.cz/nameserver/tia.ns.cloudflare.com',
                            rel: 'self',
                            href: 'https://rdap.nic.cz/nameserver/tia.ns.cloudflare.com',
                            type: 'application/rdap+json',
                        },
                    ],
                },
            ],
            fred_nsset: {
                objectClassName: 'fred_nsset',
                handle: 'PAVOLHEJNY',
                links: [
                    {
                        value: 'https://rdap.nic.cz/fred_nsset/PAVOLHEJNY',
                        rel: 'self',
                        href: 'https://rdap.nic.cz/fred_nsset/PAVOLHEJNY',
                        type: 'application/rdap+json',
                    },
                ],
                nameservers: [
                    {
                        objectClassName: 'nameserver',
                        handle: 'rick.ns.cloudflare.com',
                        ldhName: 'rick.ns.cloudflare.com',
                        links: [
                            {
                                value: 'https://rdap.nic.cz/nameserver/rick.ns.cloudflare.com',
                                rel: 'self',
                                href: 'https://rdap.nic.cz/nameserver/rick.ns.cloudflare.com',
                                type: 'application/rdap+json',
                            },
                        ],
                    },
                    {
                        objectClassName: 'nameserver',
                        handle: 'tia.ns.cloudflare.com',
                        ldhName: 'tia.ns.cloudflare.com',
                        links: [
                            {
                                value: 'https://rdap.nic.cz/nameserver/tia.ns.cloudflare.com',
                                rel: 'self',
                                href: 'https://rdap.nic.cz/nameserver/tia.ns.cloudflare.com',
                                type: 'application/rdap+json',
                            },
                        ],
                    },
                ],
            },
            notices: [
                {
                    title: 'Disclaimer',
                    description: [
                        '(c) 2023 CZ.NIC, z.s.p.o.',
                        'Intended use of supplied data and information',

                        'Data contained in the domain name register, as well as information supplied through public information services of CZ.NIC association, are appointed only for purposes connected with Internet network administration and operation, or for the purpose of legal or other similar proceedings, in process as regards a matter connected particularly with holding and using a concrete domain name.',
                    ],
                },
            ],
        });
    });
});

/**
 * TODO: !! This pattern TO ALL .resolves .rejects tests in webgpt and promptbook
 */
