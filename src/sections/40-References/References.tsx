import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import bobKartous from '../../../public/people/bob-kartous.transparent.png';
import janSedo from '../../../public/people/jan-sedo.transparent.png';
import maxKozlov from '../../../public/people/max-kozlov.transparent.cropped.png';
import terezaTexlova from '../../../public/people/tereza-texlova.transparent.png';
import tomasStudenik from '../../../public/people/tomas-studenik.transparent.png';
import { Item } from '../../components/Items/Item';
import { Items } from '../../components/Items/Items';
import { Section } from '../../components/Section/Section';
import { Shuffle } from '../../components/Shuffle/Shuffle';
import { Translate } from '../../components/Translate/Translate';
import styles from './References.module.css';

interface ReferencesProps {
    variant: 'SHORT' | 'FULL';
}

/**
 * @@@
 */
export function ReferencesSection(props: ReferencesProps) {
    const { variant } = props;

    const { t } = useTranslation();

    return (
        <Section id="References" className={styles.ReferencesSection}>
            <h2>{t('References.title')}</h2>

            <Items>
                <Shuffle seed="references" limit={variant === 'FULL' ? Infinity : 3} isDisabled>
                    <Item>
                        <Item.PersonImage>
                            <Image
                                alt="Portrait photo of Tomáš Studeník"
                                src={tomasStudenik}
                                draggable="false"
                                placeholder="blur"
                            />
                        </Item.PersonImage>
                        <Item.Title>
                            <a href="https://www.tomas-studenik.com/" target="_blank" rel="noreferrer">
                                Tomáš Studeník
                            </a>
                        </Item.Title>
                        <Item.Description>
                            <Translate locale="en">
                                <p>
                                    I&apos;ve known Pavol for 6 years. Especially from hackathons and other innovation
                                    projects. If you are with his team, you can bet he&apos;ll be in the top three.
                                    <br />
                                    And you would have right!
                                </p>
                                <p>
                                    Pavol is an innovator who knows the latest technologies and can find quick solutions
                                    to challenges in industry, education and urban development. He&apos;s capable of
                                    making a difference within 24 hours. He is one of the top 10 people in the country
                                    for rapid prototyping of applications.
                                </p>
                            </Translate>

                            <Translate locale="cs">
                                <p>
                                    Pavola znám už 6 let. Zejména z hackathonů a dalších inovačních projektů. Pokud se
                                    se svým týmem zúčastnil, mohli byste si vsadit, že bude mezi nejlepšími třemi. A
                                    měli byste pravdu!
                                </p>
                                <p>
                                    Pavol je inovátor, který se orientuje v nejnovějších technologiích a dokáže nacházet
                                    rychlá řešení výzev v průmyslu, vzdělávání či rozvoji měst. Dokáže během 24 hodin
                                    postavit funkční aplilkaci. Je jedním z top 10 lidí v Česku na rychlé prototypování
                                    aplikací.
                                </p>
                            </Translate>

                            {/*
                             Original Version:

                                Pavola znám už 6 let. Zejména z hackathonů a dalších inovačních projektů. Pokud se se
                                svým týmem zúčastnil, mohli byste si vsadit, že bude mezi nejlepšími třemi. A měli byste
                                pravdu.

                                Pavol je softwarový inovátor, který se orientuje v nejnovějších technologiích a dokáže
                                nacházet rychlá řešení výzev v průmyslu, vzdělávání či rozvoji měst. Dokáže během 24
                                hodin postavit funkční aplilkaci, ...

                                Je jedním z top 10 lidí v Česku na rychlé prototypování aplikací.

                                IT je pro něj nejen denním chlebíčkem, ale také životním koníčkem.
                             
                             */}
                        </Item.Description>
                    </Item>

                    <Item>
                        <Item.PersonImage>
                            <Image
                                alt="Portrait photo of Jan Šedo"
                                src={janSedo}
                                // TODO: [🧑] Make some <ImageGravatar component; This is jan.sedo@h-mat.cz
                                //src="https://www.gravatar.com/avatar/0879e2d2136c90854d7c52adc712e915?s=1024"
                                // width={1024}
                                // height={1024}
                                draggable="false"
                                placeholder="blur"
                                style={{
                                    // TODO: [💫] What is the propper place for this radial-gradient, in JSX or in CSS module + DRY
                                    backgroundImage: 'radial-gradient(circle at center, #b4952c 0%, #000000 120%)',
                                }}
                            />
                        </Item.PersonImage>
                        <Item.Title>
                            <a href="http://www.jansedo.cz/" target="_blank" rel="noreferrer">
                                Jan Šedo
                            </a>
                        </Item.Title>
                        <Item.Description>
                            <Translate locale="en">
                                <p>
                                    Pavol built a prototype of our H-edu app so that we could get immediate investment.
                                    He then designed the architecture of the system and the use of the technology, which
                                    proved to be the right choice for our proved to be the right choice for our
                                    purposes. In the early days of covid-19, responded very well to the teaching needs
                                    of the teachers and in record time created exactly the solution that thousands of
                                    teachers have since used.
                                </p>
                            </Translate>
                            <Translate locale="cs">
                                <p>
                                    Pavol vytvořil prototyp naší aplikace H-edu tak, že jsme okamžitě získali investici.
                                    Následně navrhl architekturu systému a využití technologií, které se v testu času
                                    ukázaly jako správně zvolené pro naše účely.
                                    <br />
                                    Na začátku covidu-19 výborně zareagoval na potřeby učitelů při výuce a v rekordním
                                    čase vytvořil přesně takové řešení, které následně využívaly tisíce učitelů.
                                </p>
                            </Translate>
                            {/*
                             Original Version:

                               Pavol vytvořil prototyp naší aplikace H-edu tak, že jsme okamžitě získali investici.
                                Následně navrhl architekturu systému a využití technologií, které se v testu času
                                ukázaly jako správně zvolené pro naše účely. Na začátku covidu výborně zareagoval na
                                potřeby učitelů při výuce a v rekordním čase vytvořil přesně takové řešení, které
                                následně využívaly tisíce učitelů.

                            */}
                        </Item.Description>
                    </Item>

                    <Item>
                        <Item.PersonImage>
                            <Image
                                alt="Portrait photo of Max Kozlov"
                                src={maxKozlov}
                                draggable="false"
                                placeholder="blur"
                                style={{
                                    // TODO: [💫] What is the propper place for this radial-gradient, in JSX or in CSS module + DRY
                                    backgroundImage: 'radial-gradient(circle at center, #b4952c 0%, #000000 120%)',
                                }}
                            />
                        </Item.PersonImage>
                        <Item.Title>
                            <a href="https://www.linkedin.com/in/themaxkozlov" target="_blank" rel="noreferrer">
                                Max Kozlov
                            </a>
                        </Item.Title>
                        <Item.Description>
                            <Translate locale="en">
                                <p>
                                    Pavol is an absolute beast when it comes to creating digital products. I&apos;ve
                                    seen him – literally overnight – create an integrated chatbot that won us the 1st
                                    place at Startup Weekend Prague.
                                </p>
                                <p>
                                    He learns any topic or technology quickly and builds even faster, with exceptional
                                    usability.
                                </p>
                                <p>
                                    I&apos;d recommend Pavol to everyone who wants to see real life results in a
                                    manageable time frame.
                                    <br />
                                    Plus he&apos;s really considerate, kind and a pleasure to work with.
                                </p>
                            </Translate>
                            <Translate locale="cs">
                                <p>
                                    Pavol je naprosto špičkový v tvorbě digitálních produktů. Viděl jsem ho – doslova
                                    přes noc – vytvořit integrovaného chatbota, který nám zajistil první místo na
                                    Startup Weekendu v Praze. {/* <- TODO: !! Auto-link */}
                                </p>
                                <p>Rychle vezme jakoukoliv technologii nebo téma a postaví nad ní fungující produkt.</p>
                                <p>
                                    Vřele bych Pavola doporučil každému, kdo chce vidět výsledky v reálném životě v
                                    reálném čase.
                                    <br />
                                    Navíc je velmi ohleduplný, laskavý a radost s ním spolupracovat.
                                </p>
                            </Translate>
                            {/*
                             Original Version:

                                Pavol is an absolute beast when it comes to creating digital products. I’ve seen him - literally overnight - create an integrated chatbot that won us the 1st place at Startup Weekend Prague.

                                He learns any topic or technology quickly and builds even faster, with exceptional usability.

                                I’d recommend Pavol to everyone who wants to see real life results in a manageable time frame. Plus he’s really considerate, kind and a pleasure to work with.

                            */}
                        </Item.Description>
                    </Item>

                    <Item>
                        <Item.PersonImage>
                            <Image
                                alt="Portrait photo of Bob Kartous"
                                src={bobKartous}
                                draggable="false"
                                placeholder="blur"
                            />
                        </Item.PersonImage>
                        <Item.Title>
                            <a
                                href="https://www.linkedin.com/in/bob-kartous-5b472526/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Bob Kartous
                            </a>
                        </Item.Title>
                        <Item.Description>
                            <Translate locale="en">
                                <p>
                                    Regarding my personal, professional experience, Pavol is highly capable innovator
                                    who&apos;s potential range across digital technologies and socially prioritized
                                    themes. In projects collaborated on, he brought new visions and approaches to the
                                    world of education. I am convinced that he is ready to replicate it wherever it will
                                    make sense.
                                </p>
                            </Translate>
                            <Translate locale="cs">
                                <p>
                                    Pokud jde o jeho osobní a profesní zkušenosti, Pavol je velmi schopný inovátor,
                                    jehož potenciál sahá napříč digitálními technologiemi a společenskými tématy. V
                                    projektech, na kterých spolupracoval, přinesl do světa vzdělávání nové vize a
                                    přístupy. Jsem přesvědčen, že je připraven je replikovat všude tam, kde to bude mít
                                    smysl.
                                </p>
                            </Translate>
                            {/*
                             Original Version:

                             Regarding mu personal, professional experience, Pavol is highly capable innovator who’s potential range across digital technologies and socially prioritized themes. In projects collaborated on, he brought new visions and approaches to the world of education. I am convinced that he is ready to replicate it wherever it will make sense.


                            */}
                        </Item.Description>
                    </Item>

                    <Item>
                        <Item.PersonImage>
                            <Image
                                alt="Portrait photo of Tereza Texlová"
                                src={terezaTexlova}
                                draggable="false"
                                placeholder="blur"
                            />
                        </Item.PersonImage>
                        <Item.Title>
                            <a href="https://www.linkedin.com/in/tereza-texlova/" target="_blank" rel="noreferrer">
                                Tereza Texlová
                            </a>
                        </Item.Title>
                        <Item.Description>
                            <Translate locale="en">
                                <p>
                                    Pavol and I have worked together on several projects, the main being czech.events --
                                    the only newsletter you really want to get. I&apos;ve worked with many developers
                                    before, but Pavol&apos;s combination of technical skills, together with public
                                    speaking and the ability to kick-start new ideas, is imposing.
                                </p>
                                <p>I am looking forward to our next super exciting project!</p>
                            </Translate>
                            <Translate locale="cs">
                                <p>
                                    S Pavolem jsme spolupracovali na několika projektech, z nichž hlavní je Czech.events
                                    - jediný newsletter, který opravdu chcete dostávat. Pracoval jsem už s mnoha
                                    vývojáři, ale Pavolova kombinace technických dovedností spolu s veřejným
                                    vystupováním a schopností nastartovat nové nápady je impozantní.
                                </p>
                                <p>Těším se na náš další super zajímavý projekt!</p>
                            </Translate>
                            {/*
                             Original Version:

                             Pavol and I have worked together on several projects, the main being czech.events -- the only newsletter you really want to get. I've worked with many developers before, but Pavol's combination of technical skills, together with public speaking and the ability to kick-start new ideas, is imposing. 
                             I am looking forward to our next super exciting project!

                            */}
                        </Item.Description>
                    </Item>
                    {/*
                    <Item>
                        <Item.PersonImage>
                            <Image
                                alt="Portrait photo of Xxx Xxx"
                                src={xxxXxx}
                                draggable="false"
                                placeholder="blur"
                            />
                        </Item.PersonImage>
                        <Item.Title>
                            <a href="http://www.xxxxx.cz/" target="_blank" rel="noreferrer">
                                Xxxx Xxxx
                            </a>
                        </Item.Title>
                        <Item.Description>
                            <Translate locale="en">
                                <p>
                                    xxxx
                                </p>
                            </Translate>
                            <Translate locale="cs">
                                <p>
                                    xxxx
                                </p>
                            </Translate>
                            {/*
                             Original Version:


                            * /}
                        </Item.Description>
                    </Item>
                    */}
                </Shuffle>
            </Items>

            {variant === 'SHORT' && (
                <Link className="button" href="/references">
                    {t('References.more-references')}
                </Link>
            )}
        </Section>
    );
}

/**
 * TODO: !! Add active links
 * TODO: !!?? Add job title on references
 * TODO: !! Add all other people
 * TODO: !! Add links to multiple socials
 */
