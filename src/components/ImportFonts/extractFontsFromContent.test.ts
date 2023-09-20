import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { extractFontsFromContent } from './extractFontsFromContent';

describe('extractTitleFromContent', () => {
    it('should extract no font from string without a font', () => {
        expect(extractFontsFromContent('')).toEqual(new Set());
        expect(extractFontsFromContent('Hello world')).toEqual(new Set());
    });

    it('should extract font from string with a font', () => {
        expect(extractFontsFromContent('font-family: "Arial";')).toEqual(new Set(['Arial']));
    });

    it('should extract fonts from multiple notations in style', () => {
        expect(extractFontsFromContent(`<div style="font-family:Poppins">`)).toEqual(new Set(['Poppins']));
        expect(extractFontsFromContent(`<div style="font-family:'Poppins'">`)).toEqual(new Set(['Poppins']));
        expect(extractFontsFromContent(`<div style="font-family:Poppins, sans-serif">`)).toEqual(new Set(['Poppins']));
        expect(extractFontsFromContent(`<div style="font-family:'Poppins', sans-serif">`)).toEqual(
            new Set(['Poppins']),
        );
        expect(extractFontsFromContent(`<div style="font-family: Poppins">`)).toEqual(new Set(['Poppins']));
        expect(extractFontsFromContent(`<div style="font-family:  'Poppins' ">`)).toEqual(new Set(['Poppins']));
        expect(
            extractFontsFromContent(`<div style="font-family: Poppins, sans-serif; border: 1px solid red;">`),
        ).toEqual(new Set(['Poppins']));
        expect(
            extractFontsFromContent(`<div 
                                        style="font-family:'Poppins', sans-serif"  
                                    >`),
        ).toEqual(new Set(['Poppins']));
    });

    it('should extract font from real markdown content', () => {
        expect(
            extractFontsFromContent(
                spaceTrim(`
                    <!--font:Cabin-->

                    # Ocean Workspace

                    <!--font:Montserrat-->
                    
                    Transform your workspace into a peaceful oasis with our Ocean Vibes background. Featuring a stunning sunset over the ocean, this background is designed to promote relaxation and reduce stress.
                    
                    ## Why Choose Ocean Vibes?
                    
                    Our Ocean Vibes background is more than just a pretty picture. It's carefully crafted to help you create a calming and inspiring workspace that promotes productivity and well-being. Here are some of the benefits of using Ocean Vibes:
                    
                    - **Soothing colors:** The warm oranges and yellows of the sunset blend seamlessly with cool blues and greens, creating a balanced and harmonious color palette that's easy on the eyes.
                    - **Promotes relaxation:** Research has shown that exposure to natural environments can help reduce stress and promote relaxation. With Ocean Vibes, you can bring the beauty of nature right to your desktop.
                    - **Easy installation:** Installing our background is quick and easy, so you can start enjoying its benefits right away.
                    
                    ## User Stories

                    <!--font:Poppins-->

                    
                    Don't just take our word for it - here are some stories from real users who have transformed their workspaces with Ocean Vibes:
                    
                    > "As a writer, I spend a lot of time staring at my computer screen. Ocean Vibes has helped me create a calm and peaceful environment that makes it easier to focus and be creative." - Sarah, Writer
                    
                    > "I work in a high-stress environment, and sometimes I just need a moment of peace. Ocean Vibes helps me take a deep breath and reset before diving back into work." - Mark, Accountant
                
                `),
            ),
        ).toEqual(new Set(['Cabin', 'Montserrat', 'Poppins']));
    });

    it('should extract font from real html content', () => {
        expect(
            extractFontsFromContent(
                spaceTrim(`
                    <div style="font-family:'Poppins', sans-serif">
                        <h1 id="aispaceexplore">AI Space Explore</h1>
                        <p>
                            Welcome to AI Space Station, where we bring you closer to the mysteries of the
                            universe through cutting-edge technology and artificial intelligence. Our team of
                            Ainautes is dedicated to exploring the vast expanse of space, discovering new
                            worlds, and pushing the boundaries of human knowledge.
                        </p>
                        <h2 id="aboutus">About Us</h2>
                        <p>
                            At AI Space Station, we believe that the future of space exploration lies in
                            combining the power of artificial intelligence with human ingenuity. Our
                            state-of-the-art space station is equipped with the latest technologies, including
                            advanced telescopes, drones, and robots, all controlled by our intelligent AI
                            systems.
                        </p>
                        <p>
                            Our team of Ainautes includes some of the brightest minds in the fields of
                            astrophysics, engineering, and computer science. Together, we are working towards a
                            common goal - to unlock the secrets of the universe and pave the way for future
                            generations of explorers.
                        </p>
                        <h2 id="ourmission">Our Mission</h2>
                        <p>
                            Our mission at AI Space Station is to use the power of artificial intelligence to
                            revolutionize space exploration. We believe that by combining human creativity with
                            the speed and efficiency of AI, we can achieve things that were once thought
                            impossible.
                        </p>
                    </div>
                    <!-- Note: Testing one font with quotes and one without the quotes -->
                    <div style="font-family:Montserrat, sans-serif">
                        <p>
                            Through our research and discoveries, we hope to inspire the next generation of
                            scientists, engineers, and explorers. We aim to make space exploration accessible to
                            everyone, and to create a world where the wonders of the universe are within reach.
                        </p>
                        <h2 id="ourtechnology">Our Technology</h2>
                        <p>
                            At AI Space Station, we utilize the latest advancements in artificial intelligence
                            to enhance our exploration capabilities. Our AI systems are designed to analyze vast
                            amounts of data, identify patterns, and make predictions based on complex
                            algorithms.
                        </p>
                        <p>
                            Our high-tech space station is equipped with advanced telescopes, capable of
                            capturing stunning images of distant galaxies and celestial bodies. We also use
                            drones and robots to explore planets and asteroids, collecting valuable data and
                            samples for analysis.
                        </p>
                        <h2 id="userstories">User Stories</h2>
                        <p>
                            Here are just a few examples of the incredible discoveries made by our team of
                            Ainautes:
                        </p>
                        <ul>
                            <li>
                                <p>
                                    Using our advanced telescopes, we were able to capture stunning images of
                                    the rings of Saturn, revealing new details about their composition and
                                    structure.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Our drones explored the surface of Mars, discovering evidence of ancient
                                    microbial life that could provide clues about the origins of life on Earth.
                                </p>
                            </li>
                            <li>
                                <p>
                                    We analyzed data from distant galaxies, uncovering new insights into the
                                    nature of dark matter and the evolution of the universe.
                                </p>
                            </li>
                        </ul>
                        <h2 id="references">References</h2>
                        <p>
                            If you're interested in learning more about AI Space Station and our mission,
                            check out these resources:
                        </p>
                        <ul>
                            <li>
                                <p>
                                    <a href="#blog">Our blog</a>: Stay up-to-date with the latest news and
                                    discoveries from our team of Ainautes.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="#papers">Our research papers</a>: Read about our groundbreaking
                                    research and discoveries in astrophysics and artificial intelligence.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <a href="#team">Our team</a>: Meet the talented individuals behind AI Space
                                    Station and learn more about their backgrounds and expertise.
                                </p>
                            </li>
                        </ul>
                        <h2 id="contactus">Contact Us</h2>
                        <p>
                            If you have any questions or comments about AI Space Station, we'd love to hear
                            from you! You can reach us at:
                        </p>
                        <ul>
                            <li><p>Email: info@aispacestation.com</p></li>
                            <li><p>Phone: +1 (555) 123-4567</p></li>
                            <li><p>Address: 1234 Space Station Blvd, Houston, TX 77058</p></li>
                        </ul>
                        <p>
                            Thank you for visiting AI Space Station - we look forward to exploring the wonders
                            of the universe with you!
                        </p>
                    </div>
                `),
            ),
        ).toEqual(new Set(['Montserrat', 'Poppins']));
    });
});
