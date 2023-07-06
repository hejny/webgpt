import { describe, expect } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { extractTitleFromHtml } from './extractTitleFromHtml';

describe('extractFirstHeadingFromHtmlRegex', () => {
    test('should return the first heading from an HTML string', () => {
        const contentText =
            '<html><head><title>This is a title</title></head><body><h1>This is a heading</h1>Some content</body></html>';
        expect(extractTitleFromHtml(contentText)).toBe('This is a heading');
    });

    test('should return null if there is no heading in the HTML string', () => {
        const contentText = '<html><head><title>This is a title</title></head><body>Some content</body></html>';
        expect(extractTitleFromHtml(contentText)).toBeNull();
    });

    test('should return the first heading from an real HTML string', () => {
        expect(
            extractTitleFromHtml(
                spaceTrim(`
                    <div style="font-family: Poppins, sans-serif;">
                        <h1 id="oceanvibes">Ocean vibes</h1>
                        <p>Welcome to Ocean Vibes, a website dedicated to exploring the wonders of the ocean. Our stunning wallpaper featuring a beautiful sunset over the ocean sets the tone for our passion for all things related to the sea.</p>
                        <h2 id="aboutus">About Us</h2>
                        <p>At Ocean Vibes, we are committed to sharing our love and knowledge of the ocean with others. We offer a variety of resources, including articles on marine life, conservation efforts, travel destinations, and much more.</p>
                        <h2 id="userstories">User Stories</h2>
                        <p>Our community is made up of people from all walks of life who share a common love for the ocean. Here are some stories from our users:</p>
                        <ul>
                            <li>"I've always been fascinated by the ocean, but never knew where to start. Ocean Vibes has given me a wealth of information and inspiration to explore this amazing world." - Emily, 28</li>
                            <li>"The articles on Ocean Vibes have helped me plan my dream trip to Hawaii. I can't wait to explore the coral reefs and see all the incredible marine life." - Mark, 35</li>
                            <li>"As an avid scuba diver, I appreciate the dedication Ocean Vibes has to promoting responsible tourism and conservation efforts. It's important to protect the ocean so future generations can enjoy it too." - Sarah, 42</li>
                        </ul>
                        <h2 id="resources">Resources</h2>
                        <p>Check out some of our most popular articles and resources:</p>
                        <ul>
                            <li><a href="#best-beaches">10 Best Beaches in the World</a></li>
                            <li><a href="#responsible-tourism">Protecting Our Oceans: Tips for Responsible Tourism</a></li>
                            <li>
                                <a href="#coral-reefs">The Fas<wbr />ci<wbr />na<wbr />ting World of Coral Reefs</a>
                            </li>
                        </ul>
                        <h2 id="contactus">Contact Us</h2>
                        <p>Do you have questions or suggestions? We'd love to hear from you! Reach out to us at <a href="mailto:oceanvibes@example.com">oceanvibes@example.com</a>.</p>
                        <p>Thank you for visiting Ocean Vibes. Let's work together to preserve the beauty of the ocean for generations to come 🐬🌊.</p>
                        <hr />
                        <h3 id="bestbeaches">Best Beaches</h3>
                        <ol>
                            <li>Anse Source d'Argent, Seychelles</li>
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
                        <p>As travelers, it's important to be mindful of our impact on the environment. Here are some tips for responsible tourism:</p>
                        <ul>
                            <li>Choose eco-friendly accommodations and tours.</li>
                            <li>Respect local customs and traditions.</li>
                            <li>Reduce your plastic use by bringing a reusable water bottle and shopping bag.</li>
                            <li>Support local businesses and communities.</li>
                        </ul>
                        <h3 id="coralreefs">Coral Reefs</h3>
                        <p>Coral reefs are one of the most biodiverse ecosystems on the planet. Here are some Fas<wbr />ci<wbr />na<wbr />ting facts about these underwater wonderlands:</p>
                        <ul>
                            <li>Coral reefs cover less than 1% of the ocean floor but support over 25% of marine life.</li>
                            <li>The Great Barrier Reef in Australia is the largest coral reef system in the world.</li>
                            <li>Coral reefs are made up of tiny animals called polyps that secrete calcium carbonate to form a hard skeleton.</li>
                            <li>Coral reefs are threatened by climate change, overfishing, and pollution.</li>
                        </ul>
                    </div>
        
                `),
            ),
        ).toBe('Ocean vibes');
    });

    test('should return the first heading from an real multiline HTML string', () => {
        expect(
            extractTitleFromHtml(
                spaceTrim(`
                        <div style="font-family: 'Roboto', sans-serif;">
                            <h1 id="starrydesertnights">Sta</h1>
                        </div>
                        <div style="font-family: 'Roboto', sans-serif;"><h1>rry D</h1></div>
                        <div style="font-family: 'Roboto', sans-serif;"><h1>e</h1></div>
                        <div style="font-family: 'Roboto', sans-serif;"><h1>se</h1></div>
                        <div style="font-family: 'Roboto', sans-serif;">
                            <h1>rt Nights</h1>
                            <p>
                                Looking for a way to add some magic to your device's background? Our Desert Nights image is the perfect choice. Featuring a stunning photograph of a desert landscape at night, with the stars twinkling above, this image will
                                transport you to another world.
                            </p>
                            <h2 id="whychooseourdesertnightsimage">Why Choose Our Desert Nights Image?</h2>
                            <ul>
                                <li>Unique design: Unlike generic images that can be found anywhere online, our Desert Nights image is a one-of-a-kind design that will make your device stand out from the crowd.</li>
                                <li>Relaxing atmosphere: The peaceful beauty of the desert landscape and starry sky creates a calming atmosphere that can help you unwind after a long day.</li>
                                <li>High-quality resolution: Our image is created using high-resolution photography, ensuring that every detail of the desert landscape and starry sky is captured in stunning clarity.</li>
                            </ul>
                            <h2 id="howtouseourimage">How to Use Our Image</h2>
                            <p>Using our Desert Nights image is easy! Simply download the image and set it as your device's background. Whether you're using a desktop computer, laptop, tablet, or smartphone, our image will look great on any screen size.</p>
                            <h2 id="userstories">User Stories</h2>
                            <p>"I love using the Desert Nights image on my phone. It reminds me of my camping trips in the desert and helps me stay relaxed during the day." - Sarah, Freelance Writer</p>
                            <p>"Since I started using the Desert Nights image on my laptop, I've received so many compliments from my colleagues. It's such a unique and beautiful design!" - Alex, Graphic Designer</p>
                            <h2 id="references">References</h2>
                            <p>Want to learn more about the beauty of the desert at night? Check out these resources:</p>
                            <ul>
                                <li>National Geographic: <a href="#">Desert Nightlife</a></li>
                                <li>NASA: <a href="#">Stargazing in the Desert</a></li>
                                <li>Lonely Planet: <a href="#">The Best Places to See the Stars</a></li>
                            </ul>
                            <h2 id="contactus">Contact Us</h2>
                            <p>If you have any questions or comments about our Desert Nights image, we'd love to hear from you! Contact us at me@pavolhejny.com and we'll get back to you as soon as possible.</p>
                            <hr />
                            <p>Experience the magic of the starry sky with our Desert Nights image. Download it today and enjoy a stunning new background that will transport you to another world.</p>
                        </div>
                    `),
            ),
        ).toBe(
            spaceTrim(`
                    Sta
                    rry D
                    e
                    se
                    rt Nights
                `),
        );
    });

    test('should return non-trimmed result', () => {
        expect(extractTitleFromHtml(`<h1> a </h1>`)).toBe(` a `);
        expect(extractTitleFromHtml(`<h1>&nbsp;a&nbsp;</h1>`)).toBe(` a `);
        expect(extractTitleFromHtml(`<h1> &nbsp;a&nbsp; </h1>`)).toBe(`  a  `);
        expect(extractTitleFromHtml(`<h1> &nbsp; a &nbsp; </h1>`)).toBe(`   a   `);
    });

    test('should return the first heading from an real multi-whitespace HTML string', () => {
        expect(extractTitleFromHtml(`<h1>a&nbsp;a</h1>`)).toBe(`a a`);
        expect(extractTitleFromHtml(`<h1>a&nbsp; a</h1>`)).toBe(`a  a`);
        expect(extractTitleFromHtml(`<h1>a &nbsp; a</h1>`)).toBe(`a   a`);
        expect(extractTitleFromHtml(`<h1>a&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a</h1>`)).toBe(`a     a`);
    });

    test('should return the first heading from an real special-characters HTML string', () => {
        expect(extractTitleFromHtml(`<h1>&quot;</h1>`)).toBe(`"`);
    });
});

/**
 *  TODO: !!!! Not test but it ACRY
 */
