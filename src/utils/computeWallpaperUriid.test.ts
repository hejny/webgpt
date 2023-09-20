import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { FULLHD } from '../constants';
import { computeWallpaperUriid } from './computeWallpaperUriid';
import { hydrateColorStats } from './image/utils/hydrateColorStats';
import { validateUuid } from './validators/validateUuid';

describe(`computeWallpaperUriid`, () => {
    it(`is compute deterministic uriid`, () => {
        expect(
            computeWallpaperUriid({
                parent: 'ocean-vibes-1kmp5dwt35su',
                src: 'https://cdn.midjourney.com/6be2b125-4fbb-498f-8f08-fc153998fef5/0_3.png',
                prompt: 'A beautiful sunset over the ocean',
                author: validateUuid('8450ee88-d216-41c4-a30e-5bba49289573'),
                colorStats: hydrateColorStats({
                    palette: [
                        {
                            note: 'The most common color to appear at the bottom of the wallpaper.',
                            count: 1576,
                            value: '#111111',
                        },
                        {
                            note: '2nd most satulighted color of the bottom half of the wallpaper which is contrast enough (50%) against the primary color.',
                            count: 39,
                            value: '#ffcc55',
                        },
                        {
                            note: '2nd most frequent color of the bottom third of the wallpaper which is distant enough (10%) and hue-distant enough (30°) from all other palette colors.',
                            count: 101,
                            value: '#775566',
                        },
                        {
                            note: '3rd most satulighted color of the bottom half of the wallpaper which is distant enough (10%) and hue-distant enough (30°) from all other palette colors.',
                            count: 1,
                            value: '#77bbcc',
                        },
                    ],
                    version: 'colorful-192x108-16bit-v14palette',
                    bottomHalf: {
                        averageColor: '#432f2e',
                        darkestColor: '#000000',
                        lightestColor: '#ffffee',
                        mostGroupedColors: [{ count: 365, value: '#001111' }],
                        mostFrequentColors: [
                            { count: 1576, value: '#111111' },
                            { count: 72, value: '#995544' },
                            { count: 43, value: '#ffbb55' },
                            { count: 3, value: '#77aabb' },
                            { count: 1, value: '#ffffee' },
                        ],
                        mostSatulightedColors: [
                            { count: 1, value: '#ff7755' },
                            { count: 39, value: '#ffcc55' },
                            { count: 1, value: '#77bbcc' },
                            { count: 1, value: '#eeffaa' },
                            { count: 4, value: '#996677' },
                        ],
                    },
                    bottomLine: {
                        averageColor: '#2e1a1a',
                        darkestColor: '#110000',
                        lightestColor: '#ffbb66',
                        mostGroupedColors: [{ count: 1296, value: '#111111' }],
                        mostFrequentColors: [
                            { count: 4860, value: '#111111' },
                            { count: 216, value: '#cc5533' },
                        ],
                        mostSatulightedColors: [
                            { count: 216, value: '#ffbb66' },
                            { count: 108, value: '#994444' },
                        ],
                    },
                    bottomThird: {
                        averageColor: '#392427',
                        darkestColor: '#000000',
                        lightestColor: '#eeaa99',
                        mostGroupedColors: [{ count: 391, value: '#001111' }],
                        mostFrequentColors: [
                            { count: 2051, value: '#111111' },
                            { count: 101, value: '#775566' },
                            { count: 22, value: '#ffaa55' },
                        ],
                        mostSatulightedColors: [
                            { count: 21, value: '#ff9955' },
                            { count: 1, value: '#aa7788' },
                        ],
                    },
                    averageColor: '#5c3d3a',
                    darkestColor: '#000000',
                    lightestColor: '#ffeedd',
                    mostGroupedColors: [{ count: 413, value: '#222233' }],
                    paletteCandidates: [
                        {
                            note: '1st most satulighted color of the bottom half of the wallpaper',
                            count: 1,
                            value: '#ff7755',
                        },
                        {
                            note: '2nd most satulighted color of the bottom half of the wallpaper',
                            count: 39,
                            value: '#ffcc55',
                        },
                        {
                            note: '3rd most satulighted color of the bottom half of the wallpaper',
                            count: 1,
                            value: '#77bbcc',
                        },
                        {
                            note: '4th most satulighted color of the bottom half of the wallpaper',
                            count: 1,
                            value: '#eeffaa',
                        },
                        {
                            note: '5th most satulighted color of the bottom half of the wallpaper',
                            count: 4,
                            value: '#996677',
                        },
                        {
                            note: '1st most grouped color of the bottom half of the wallpaper',
                            count: 365,
                            value: '#001111',
                        },
                        {
                            note: '1st most frequent color of the bottom half of the wallpaper',
                            count: 1576,
                            value: '#111111',
                        },
                        {
                            note: '2nd most frequent color of the bottom half of the wallpaper',
                            count: 72,
                            value: '#995544',
                        },
                        {
                            note: '3rd most frequent color of the bottom half of the wallpaper',
                            count: 43,
                            value: '#ffbb55',
                        },
                        {
                            note: '4th most frequent color of the bottom half of the wallpaper',
                            count: 3,
                            value: '#77aabb',
                        },
                        {
                            note: '5th most frequent color of the bottom half of the wallpaper',
                            count: 1,
                            value: '#ffffee',
                        },
                        { note: 'The darkest color of the bottom half of the wallpaper', value: '#000000' },
                        { note: 'The lightest color of the bottom half of the wallpaper', value: '#ffffee' },
                        {
                            note: '1st most satulighted color of the bottom third of the wallpaper',
                            count: 21,
                            value: '#ff9955',
                        },
                        {
                            note: '2nd most satulighted color of the bottom third of the wallpaper',
                            count: 1,
                            value: '#aa7788',
                        },
                        {
                            note: '1st most grouped color of the bottom third of the wallpaper',
                            count: 391,
                            value: '#001111',
                        },
                        {
                            note: '1st most frequent color of the bottom third of the wallpaper',
                            count: 2051,
                            value: '#111111',
                        },
                        {
                            note: '2nd most frequent color of the bottom third of the wallpaper',
                            count: 101,
                            value: '#775566',
                        },
                        {
                            note: '3rd most frequent color of the bottom third of the wallpaper',
                            count: 22,
                            value: '#ffaa55',
                        },
                        { note: 'The darkest color of the bottom third of the wallpaper', value: '#000000' },
                        { note: 'The lightest color of the bottom third of the wallpaper', value: '#eeaa99' },
                        { note: '1st most satulighted color of the whole wallpaper', count: 62, value: '#ffaa55' },
                        { note: '2nd most satulighted color of the whole wallpaper', count: 4, value: '#ffff88' },
                        { note: '3rd most satulighted color of the whole wallpaper', count: 30, value: '#335588' },
                        { note: '4th most satulighted color of the whole wallpaper', count: 1, value: '#aa5566' },
                        { note: '5th most satulighted color of the whole wallpaper', count: 1, value: '#665588' },
                        { note: '6th most satulighted color of the whole wallpaper', count: 1, value: '#558888' },
                        { note: '1st most grouped color of the whole wallpaper', count: 413, value: '#222233' },
                        { note: '1st most frequent color of the whole wallpaper', count: 1197, value: '#111111' },
                        { note: '2nd most frequent color of the whole wallpaper', count: 272, value: '#445588' },
                        { note: '3rd most frequent color of the whole wallpaper', count: 157, value: '#ff8844' },
                        { note: '4th most frequent color of the whole wallpaper', count: 6, value: '#ffff99' },
                        { note: 'The darkest color of the whole wallpaper', value: '#000000' },
                        { note: 'The lightest color of the whole wallpaper', value: '#ffeedd' },
                        {
                            note: '1st most satulighted color of the bottom line of the wallpaper',
                            count: 216,
                            value: '#ffbb66',
                        },
                        {
                            note: '2nd most satulighted color of the bottom line of the wallpaper',
                            count: 108,
                            value: '#994444',
                        },
                        {
                            note: '1st most grouped color of the bottom line of the wallpaper',
                            count: 1296,
                            value: '#111111',
                        },
                        {
                            note: '1st most frequent color of the bottom line of the wallpaper',
                            count: 4860,
                            value: '#111111',
                        },
                        {
                            note: '2nd most frequent color of the bottom line of the wallpaper',
                            count: 216,
                            value: '#cc5533',
                        },
                        { note: 'The darkest color of the bottom line of the wallpaper', value: '#110000' },
                        { note: 'The lightest color of the bottom line of the wallpaper', value: '#ffbb66' },
                    ],
                    mostFrequentColors: [
                        { count: 1197, value: '#111111' },
                        { count: 272, value: '#445588' },
                        { count: 157, value: '#ff8844' },
                        { count: 6, value: '#ffff99' },
                    ],
                    mostSatulightedColors: [
                        { count: 62, value: '#ffaa55' },
                        { count: 4, value: '#ffff88' },
                        { count: 30, value: '#335588' },
                        { count: 1, value: '#aa5566' },
                        { count: 1, value: '#665588' },
                        { count: 1, value: '#558888' },
                    ],
                }),
                naturalSize: FULLHD,
                content: spaceTrim(`
                
                    <div style="font-family: Poppins, sans-serif;">
                    <h1 id="oceanvibes">Ocean Vibes</h1>
                    <p>Welcome to Ocean Vibes, a website dedicated to exploring the wonders of the ocean. Our stunning wallpaper featuring a beautiful sunset over the ocean sets the tone for our passion for all things related to the sea.</p>
                    <h2 id="aboutus">About Us</h2>
                    <p>At Ocean Vibes, we are committed to sharing our love and knowledge of the ocean with others. We offer a variety of resources, including articles on marine life, conservation efforts, travel destinations, and much more.</p>
                    <h2 id="userstories">User Stories</h2>
                    <p>Our community is made up of people from all walks of life who share a common love for the ocean. Here are some stories from our users:</p>
                    <ul>
                    <li>"I\'ve always been fascinated by the ocean, but never knew where to start. Ocean Vibes has given me a wealth of information and inspiration to explore this amazing world." - Emily, 28</li>
                    <li>"The articles on Ocean Vibes have helped me plan my dream trip to Hawaii. I can\'t wait to explore the coral reefs and see all the incredible marine life." - Mark, 35</li>
                    <li>"As an avid scuba diver, I appreciate the dedication Ocean Vibes has to promoting responsible tourism and conservation efforts. It\'s important to protect the ocean so future generations can enjoy it too." - Sarah, 42</li>
                    </ul>
                    <h2 id="resources">Resources</h2>
                    <p>Check out some of our most popular articles and resources:</p>
                    <ul>
                    <li><a href="#best-beaches">10 Best Beaches in the World</a></li>
                    <li><a href="#responsible-tourism">Protecting Our Oceans: Tips for Responsible Tourism</a></li>
                    <li><a href="#coral-reefs">The Fas<wbr>ci<wbr>na<wbr>ting World of Coral Reefs</a></li>
                    </ul>
                    <h2 id="contactus">Contact Us</h2>
                    <p>Do you have questions or suggestions? We\'d love to hear from you! Reach out to us at <a href="mailto:oceanvibes@example.com">oceanvibes@example.com</a>.</p>
                    <p>Thank you for visiting Ocean Vibes. Let\'s work together to preserve the beauty of the ocean for generations to come 🐬🌊.</p>
                    <hr>
                    <h3 id="bestbeaches">Best Beaches</h3>
                    <ol>
                    <li>Anse Source d\'Argent, Seychelles</li>
                    <li>Whitehaven Beach, Australia</li>
                    <li>Navagio Beach, Greece</li>
                    <li>Pink Sands Beach, Bahamas</li>
                    <li>Maya Bay, Thailand</li>
                    <li>Tulum Beach, Mexico</li>
                    <li>Matira Beach, French Polynesia</li>
                    <li>Seven Mile Beach, Jamaica</li>
                    <li>Horseshoe Bay, Bermuda</li>
                    <li>Lanikai Beach, Hawaii</li>
                    </ol>
                    <h3 id="responsibletourism">Responsible Tourism</h3>
                    <blockquote>
                    <p>"We do not inherit the earth from our ancestors, we borrow it from our children." - Native American Proverb</p>
                    </blockquote>
                    <p>As travelers, it\'s important to be mindful of our impact on the environment. Here are some tips for responsible tourism:</p>
                    <ul>
                    <li>Choose eco-friendly accommodations and tours.</li>
                    <li>Respect local customs and traditions.</li>
                    <li>Reduce your plastic use by bringing a reusable water bottle and shopping bag.</li>
                    <li>Support local businesses and communities.</li>
                    </ul>
                    <h3 id="coralreefs">Coral Reefs</h3>
                    <p>Coral reefs are one of the most biodiverse ecosystems on the planet. Here are some Fas<wbr>ci<wbr>na<wbr>ting facts about these underwater wonderlands:</p>
                    <ul>
                    <li>Coral reefs cover less than 1% of the ocean floor but support over 25% of marine life.</li>
                    <li>The Great Barrier Reef in Australia is the largest coral reef system in the world.</li>
                    <li>Coral reefs are made up of tiny animals called polyps that secrete calcium carbonate to form a hard skeleton.</li>
                    <li>Coral reefs are threatened by climate change, overfishing, and pollution.</li>
                    </ul>
                    </div>
                    
                `),
            }),
        ).toBe(`ocean-vibes-2kcnh3w2bhgj`);
    });

    it(`works without title in content`, () => {
        expect(
            computeWallpaperUriid({
                parent: 'ocean-vibes-1kmp5dwt35su',
                src: 'https://cdn.midjourney.com/6be2b125-4fbb-498f-8f08-fc153998fef5/0_3.png',
                prompt: 'A beautiful sunset over the ocean',
                author: validateUuid('8450ee88-d216-41c4-a30e-5bba49289573'),
                colorStats: hydrateColorStats({
                    palette: [
                        {
                            note: 'The most common color to appear at the bottom of the wallpaper.',
                            count: 1576,
                            value: '#111111',
                        },
                        {
                            note: '2nd most satulighted color of the bottom half of the wallpaper which is contrast enough (50%) against the primary color.',
                            count: 39,
                            value: '#ffcc55',
                        },
                        {
                            note: '2nd most frequent color of the bottom third of the wallpaper which is distant enough (10%) and hue-distant enough (30°) from all other palette colors.',
                            count: 101,
                            value: '#775566',
                        },
                        {
                            note: '3rd most satulighted color of the bottom half of the wallpaper which is distant enough (10%) and hue-distant enough (30°) from all other palette colors.',
                            count: 1,
                            value: '#77bbcc',
                        },
                    ],
                    version: 'colorful-192x108-16bit-v14palette',
                }),
                naturalSize: FULLHD,
                content: spaceTrim(`
                    This content has no title.
                `),
            }),
        ).toBe(`2rrgwx5bdwod`);
    });
});
