import { describe, expect, it } from '@jest/globals';
import { parseTitleAndTopic } from './parseTitleAndTopic';

describe('how parsing name and topic works', () => {
    it('can parsing name witout topic', () => {
        expect(parseTitleAndTopic(`Machine Learning`)).toEqual({ title: `Machine Learning`, topic: null });
        expect(parseTitleAndTopic(`HackPrague hackathon`)).toEqual({ title: `HackPrague hackathon`, topic: null });
        expect(parseTitleAndTopic(`Hackers Congress Paralelní Polis`)).toEqual({
            title: `Hackers Congress Paralelní Polis`,
            topic: null,
        });
        expect(parseTitleAndTopic(`StartUp Boat Night`)).toEqual({ title: `StartUp Boat Night`, topic: null });
        expect(parseTitleAndTopic(`Regionální finále Soutěž & Podnikej`)).toEqual({
            title: `Regionální finále Soutěž & Podnikej`,
            topic: null,
        });
        expect(parseTitleAndTopic(`Business pivo`)).toEqual({ title: `Business pivo`, topic: null });
        expect(parseTitleAndTopic(`FOSDEM`)).toEqual({ title: `FOSDEM`, topic: null });
        expect(parseTitleAndTopic(`Hybridní výuka`)).toEqual({ title: `Hybridní výuka`, topic: null });
    });

    it('can parsing name and topic', () => {
        expect(parseTitleAndTopic(`HackPrague:Hacking the future`)).toEqual({
            title: `HackPrague`,
            topic: 'Hacking the future',
        });
        expect(parseTitleAndTopic(`HackPrague: Hacking the future`)).toEqual({
            title: `HackPrague`,
            topic: 'Hacking the future',
        });
        expect(parseTitleAndTopic(` HackPrague  :  Hacking the future `)).toEqual({
            title: `HackPrague`,
            topic: 'Hacking the future',
        });
        expect(parseTitleAndTopic(`CoolStore : Everything you want and need`)).toEqual({
            title: `CoolStore`,
            topic: 'Everything you want and need',
        });
    });
});
