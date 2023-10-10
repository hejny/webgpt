import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { computeWallpaperDomainPart } from './computeWallpaperDomainPart';

describe(`computeWallpaperDomainPart`, () => {
    it(`is compute deterministic uriid`, () => {
        expect(
            computeWallpaperDomainPart(
                spaceTrim(`
                
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
            ),
        ).toBe(`ocean-vibes`);
    });

    it(`works without title in content`, () => {
        expect(computeWallpaperDomainPart('This content has no title.')).toBe(`` /*<- !!! */);
    });
});
