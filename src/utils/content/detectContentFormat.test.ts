import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { detectContentFormat } from './detectContentFormat';

describe('detectContentFormat', () => {
    it('should return html for valid HTML content', () => {
        const htmlContent = '<p>Hello, this is Bing.</p>';
        expect(detectContentFormat(htmlContent)).toBe('html');
    });

    it('should return markdown for valid markdown content', () => {
        const markdownContent = '# Hello, this is Bing.\n\nThis is a *markdown* document.';
        expect(detectContentFormat(markdownContent)).toBe('markdown');
    });

    it('should return markdown for plain text content', () => {
        const plainTextContent = 'Hello, this is Bing.';
        expect(detectContentFormat(plainTextContent)).toBe('markdown');
    });

    it('should treat content as html despite it starts with markdown comment ', () => {
        expect(
            detectContentFormat(
                spaceTrim(`
                    <!--
                    # Markdown title in comment

                    Content in comment
                    -->

                    <h1>Real title outside of comment</h1>
                    <p>Real content</p>
                `),
            ),
        ).toBe('html');
    });

    it('should treat content as markdown despite it starts with html comment ', () => {
        expect(
            detectContentFormat(
                spaceTrim(`
                    <!--
                    <h1>Title in comment</h1>
                    <p>Content in comment</p>
                    -->

                    # Real title outside of comment

                    Real content
                    
                `),
            ),
        ).toBe('markdown');
    });

    it('should treat content as markdown despite it contains html markup ', () => {
        expect(
            detectContentFormat(
                spaceTrim(`

                    # Title

                    Markdown content

                    <button>HTML Button</button>
                    
                `),
            ),
        ).toBe('markdown');
    });

    it('should treat content as html despite it contains markdown markup inside HTML tags', () => {
        expect(
            detectContentFormat(
                spaceTrim(`

                    Unknown content

                    <button># Not a title but hashtag</button>
                    
                `),
            ),
        ).toBe('html');
        expect(
            detectContentFormat(
                spaceTrim(`
                    <button>\\\\\
                    # Not a title but hashtag
                    </button>
                `),
            ),
        ).toBe('html');
    });

    it('should return markdown for original pages', () => {
        expect(
            detectContentFormat(
                spaceTrim(`

                    <!--font:Futura-->

                    # See
                    
                    Welcome to our website, where we provide you with the latest and greatest in tech news, product reviews, and more. As part of our commitment to keeping you up-to-date on all things cutting-edge, we're pleased to offer this stunning background featuring a csg-style rendering of a spaceship in orbit around a planet.
                    
                    ## A Modern and Sleek Design
                    
                    This background is the perfect choice for anyone who appreciates clean lines, sharp angles, and modern design. The spaceship featured in the image is rendered with incredible detail, highlighting its sleek and futuristic look. Whether you're a fan of science fiction or just appreciate great design, this background is sure to impress.
                    
                    ## How to Download
                    
                    To download this background, simply right-click on the image and select "Save Image As." You can then choose where to save the file on your computer. We recommend setting it as your desktop background to give your workspace a tech-forward feel.
                    
                    ## User Stories
                    
                    Here are some user stories from satisfied customers who have downloaded and used this background:
                    
                    > "I'm a big fan of science fiction, and this background really speaks to me. It's like having a little piece of the future right on my desktop."
                    >
                    > "I work in tech, so I'm always looking for ways to make my workspace feel more modern and cutting-edge. This background is the perfect addition to my setup."
                    >
                    > "I love how detailed and realistic the spaceship looks. It's almost like I'm looking out a window at a real spacecraft."
                    
                    ## References
                    
                    If you're interested in learning more about the technology behind this background, check out these references:
                    
                    - [CSG Rendering](#)
                    - [Spaceship Design Principles](#)
                    - [Futuristic Background Trends](#)
                    
                    ## Contact Us
                    
                    If you have any questions or comments about this background, or if you'd like to suggest other tech-related content for our website, please don't hesitate to [contact us](#). We're always happy to hear from our readers and are committed to providing the best possible experience for our users.
                    
                    <!--
                    
                    Write me content for website with wallpaper which alt text is:
                    
                    "A csg-style rendering of a spaceship in orbit around a planet, with sharp angles and clean lines that highlight its modern and sleek design."
                    
                    The name/title of the page should not be 1:1 copy of the alt text but rather a real content of the website which is using this wallpaper.
                    
                    - Use markdown format 
                    - Start with heading
                    - Heading should be short and concise
                    - The content should look like a real website 
                    - The website should not be about the wallpaper, wallpaper is just a related background
                    - Heading should be contain work "wallpaper" or "background"
                    - Include real sections like references, contact, user stories, etc. use things relevant to the page purpose.
                    - Feel free to use structure like headings, bullets, numbering, blockquotes, paragraphs, horizontal lines, etc.
                    - You can use formatting like bold or _italic_
                    - You can include UTF-8 emojis
                    - Links should be only #hash anchors (and you can refer to the document itself)
                    - Do not include images
                    
                    
                    ---
                    
                    
                    # Modern Spaceship Wallpaper for Your Tech-Forward Desktop
                    
                    Welcome to our website, where we provide you with the latest and greatest in tech news, product reviews, and more. As part of our commitment to keeping you up-to-date on all things cutting-edge, we're pleased to offer this stunning wallpaper featuring a csg-style rendering of a spaceship in orbit around a planet.
                    
                    ## A Modern and Sleek Design
                    
                    This wallpaper is the perfect choice for anyone who appreciates clean lines, sharp angles, and modern design. The spaceship featured in the image is rendered with incredible detail, highlighting its sleek and futuristic look. Whether you're a fan of science fiction or just appreciate great design, this wallpaper is sure to impress.
                    
                    ## How to Download
                    
                    To download this wallpaper, simply right-click on the image and select "Save Image As." You can then choose where to save the file on your computer. We recommend setting it as your desktop background to give your workspace a tech-forward feel.
                    
                    ## User Stories
                    
                    Here are some user stories from satisfied customers who have downloaded and used this wallpaper:
                    
                    > "I'm a big fan of science fiction, and this wallpaper really speaks to me. It's like having a little piece of the future right on my desktop."
                    >
                    > "I work in tech, so I'm always looking for ways to make my workspace feel more modern and cutting-edge. This wallpaper is the perfect addition to my setup."
                    >
                    > "I love how detailed and realistic the spaceship looks. It's almost like I'm looking out a window at a real spacecraft."
                    
                    ## References
                    
                    If you're interested in learning more about the technology behind this wallpaper, check out these references:
                    
                    - [CSG Rendering](#)
                    - [Spaceship Design Principles](#)
                    - [Futuristic Wallpaper Trends](#)
                    
                    ## Contact Us
                    
                    If you have any questions or comments about this wallpaper, or if you'd like to suggest other tech-related content for our website, please don't hesitate to [contact us](#). We're always happy to hear from our readers and are committed to providing the best possible experience for our users.
                    
                    
                    ---
                    
                    
                    Heading should not include word "wallpaper". The website should not be about the wallpaper itself, wallpaper is just a related background, rewrite whole content.
                    
                    
                    ---
                    
                    
                    # Elevate Your Desktop Aesthetics with a Futuristic Spaceship Background
                    
                    Welcome to our website, where we provide you with the latest and greatest in tech news, product reviews, and more. As part of our commitment to keeping you up-to-date on all things cutting-edge, we're pleased to offer this stunning background featuring a csg-style rendering of a spaceship in orbit around a planet.
                    
                    ## A Modern and Sleek Design
                    
                    This background is the perfect choice for anyone who appreciates clean lines, sharp angles, and modern design. The spaceship featured in the image is rendered with incredible detail, highlighting its sleek and futuristic look. Whether you're a fan of science fiction or just appreciate great design, this background is sure to impress.
                    
                    ## How to Download
                    
                    To download this background, simply right-click on the image and select "Save Image As." You can then choose where to save the file on your computer. We recommend setting it as your desktop background to give your workspace a tech-forward feel.
                    
                    ## User Stories
                    
                    Here are some user stories from satisfied customers who have downloaded and used this background:
                    
                    > "I'm a big fan of science fiction, and this background really speaks to me. It's like having a little piece of the future right on my desktop."
                    >
                    > "I work in tech, so I'm always looking for ways to make my workspace feel more modern and cutting-edge. This background is the perfect addition to my setup."
                    >
                    > "I love how detailed and realistic the spaceship looks. It's almost like I'm looking out a window at a real spacecraft."
                    
                    ## References
                    
                    If you're interested in learning more about the technology behind this background, check out these references:
                    
                    - [CSG Rendering](#)
                    - [Spaceship Design Principles](#)
                    - [Futuristic Background Trends](#)
                    
                    ## Contact Us
                    
                    If you have any questions or comments about this background, or if you'd like to suggest other tech-related content for our website, please don't hesitate to [contact us](#). We're always happy to hear from our readers and are committed to providing the best possible experience for our users.
                    
                    -->
                
                
                `),
            ),
        ).toBe('markdown');
    });

    it('should return html for edited pages', () => {
        expect(
            detectContentFormat(
                spaceTrim(`

                    <p></p>
                    <div style="font-family: Poppins, sans-serif;"><p></p>
                    <h1 id="oceanvibes">Ocean</h1><p>Welcome to Ocean Vibes, a website dedicated to exploring the wonders of the ocean. Our stunning wallpaper featuring a beautiful sunset over the ocean sets the tone for our passion for all things related to the sea.</p>
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
                    <li><a href="#coral-reefs">The Fas<wbr>ci<wbr>na<wbr>ting World of Coral Reefs</a></li>
                    </ul>
                    <h2 id="contactus">Contact Us</h2>
                    <p>Do you have questions or suggestions? We'd love to hear from you! Reach out to us at <a href="mailto:oceanvibes@example.com">oceanvibes@example.com</a>.</p>
                    <p>Thank you for visiting Ocean Vibes. Let's work together to preserve the beauty of the ocean for generations to come 🐬🌊.</p><hr>
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
        ).toBe('html');
    });
});
