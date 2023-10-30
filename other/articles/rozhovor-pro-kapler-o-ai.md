# Povídání o generování webů, AI a budoucnosti

> Rozhovor s [Pavolem Hejným](https://www.pavolhejny.com/) pro [Kapler o AI](https://www.kapler.cz/category/AI/)

Před měsícem dal o sobě vědět [Pavol Hejný](https://www.pavolhejny.com/) s projektem na [generování webů pomomocí AI WebGPT](https://webgpt.cz/).
Rozhodl jsem se ho vyzpovídat a zjistit, co ho k tomu vedlo, jak to funguje a co nás čeká v budoucnu.

**Co si mají čtenáři představit pod tím, když mluvíš o kompletně generovaných webech**

Rozhodně tím nemyslím velké webové aplikace, mám na mysli jednoduché prezentační weby které mají za cíl ukázat jednu konkrétní věc – typicky web kavárny Pod Kaštanem, Osobní weby, weby svateb, konferencí, landing page pro produkty,...

**Jak to funguje?**

V principu je to spojení jazykového modelu, obrázkového generátoru, rozpoznání obrázků a několika dalších technologií.

Samozřejmě je na pozadí mnoho dalších věcí, například analýza obrázku a sestavení palety barev, fontů a dalších věcí.

**Jaké jsou výhody a nevýhody generování webů pomocí AI?**

Je to hlavně o ekonomice a časové náročnosti. Pokud chci jednoduchý web, který má za cíl ukázat jednu konkrétní věc, tak je to ideální řešení.
Naopak pro složitější weby, e-shopy, webové aplikace to není.

Obecně u prezentačních webů platí jedna věc – dokáží žrát prakticky neomezené množství času a peněz bez zvyšování hodnoty.
Ostatně oba to známe z hackathonů, jednoduchá aplikace se dá udělat za pár hodin, ale pokud se chceš pustit do vylepšování, tak to může trvat nekonečně dlouho. U aplikací se taková investice může vyplatit, ale u prezentačních webů to jsou obvykle utopené náklady.

**A nedají se všechny tyhle věci udělat čistě pomocí ChatGPT?**

Rozhodně ano, WebGPT ostatně na pozadí OpenAI API využívá. Zase je to jen o nákladech. Pokud jsi majitelem pizzerie, máš umět tvořit nejlepší pizzu, ne nejlepší prompt.

A pak je tu mnoho technických detailů, které jsou potřeba na webu udělat správně - SEO, responzivita, rychlost, bezpečnost, přístupnost... není to raketová věda, ale to všechno je potřeba řešit.

**Není lepší použít Wordpress nebo jiný redakční systém**

Pro některé případy určitě je. Ale opět přichází na řadu stejná otázka, co SEO, responzivita, rychlost, bezpečnost, přístupnost,... WordPress (a jiné redakční systémy) tyhle věci řeší, ale je potřeba je nastavit, spravovat a aktualizovat. A zase je to otázka času, peněz a kapacity.

Generativní AI nepřináší žádnou zásadní novou věc z hlediska kvality, revoluční je v tom, že pro průměrné úkoly dokáže jejich provedení řádově zlevnit a zrychlit.

<!-- !!! Make all WebGPT active links with utm source-->

Jinak svým způsobem je WebGPT také redakčním systémem, akorát jeho administrace je přirozený text.

**Jaké jsou největší výzvy při generování webů?**

Velkou výzvou je _„zkrocení“_ GPT k tomu, aby dělalo přesně to, co potřebuju. Dám příklad:

-   Pokud mám jednoduché zadání / prompt _„Jaký zvuk dělá kočička“_, tak dostanu odpověď _„Mňau“_ nebo _„"Mňau"“_ _(v uvozovkách)_ případně _„Kočička dělá Mňau“_ nebo něco podobného.
-   Pokud mám komplexní prompt _"Napiš mi komplení obsah webu v markdownu pro kavárnu {name}"_, tak se mi výrazně zvyšuje komplexita odpovědi a často nedostanu to, co chci.

Jakmile je potřeba něco složitějšího, máme čtyři v principu 6 směrů kterými dokážeme zlepšovat výsledek, ty se dají docela dobře kombinovat mezi sebou:

-   **Model picking** vybrat správný model pro mou potřebu. Obvykle je nejlepší začínat na `GPT-4 32k` a poté optimalizovat směrem dolů.
-   **Param finding** ladit parametry jako `temperature ` nebo `top_t`
-   **Fine tunning** dotrénovat správný model na konkrétní úkol. Pokud mám tisíce příkladů vstupů a výstupů, tak to funguje dobře. Na rychlé prototypování je to ale pomalé a náročné.
-   **Prompt writing**, kdy se snažím vymyslet a vyladit jeden prompt, který bude dělat přesně to, co chci. To funguje dobře pro jednodušší úkoly, ale pro složitější úkoly to často selhává na detailech. Například pokud chci vygenerovat obsah webu, pro superjednoduché webové stránky to funguje. Jakmile se ale dostanu do složitějších věcí, tak to opakuje stejný obsah, nebo se zacyklí na nějakém detailu, nedodrží formátování, nedokáže dodržet předepsanou strukturu, pomíchá jednotlivé sekce, atd... Obecně platí, že jakýkoliv model má jen omezenou _„kapacitu“_ a pokud požaduji komplexnější úkol, dostávám chabé výsledky.
-   **Multishot**: často je lepší rozdělit úkol na několik zcela oddělených úkolů. Například místo _"Napiš mi komplení obsah webu v markdownu pro kavárnu {name}"_ rozdělit na _„Napiš mi název kavárny“_, _„Napiš mi popis kavárny“_, _„Napiš mi menu kavárny“_, _„Vygeneruj mi fotky kavárny“_, _„Napiš mi odkaz na sociální sítě kavárny“_, atd... Každý z těchto úkolů je mnohem jednodušší a model je schopen je zvládnout. Zároveň můžeme nechat model podmínečně instruovat sama sebe. Například pokud se nám vygenerovaný název zdá dlouhý, můžeme ho požádat o zkrácení. Obecně se takovému přístupu říká **AutoGPT**.
-   **Multiapproach**: zároveň některé z úkolů mnohem lépe zvládne klasický kód oproti LLM modelu. Například převod markdown na html. To by se sice dalo provést i pomocí GPT, avšak je to zcela zbytečné a neefektivní. Úkoly se zcela deterministickým výsledkem se mají dělat pomocí klasického `if/else` programování. A pak máme situce, kdy se je uprostřed generovaní potřeba uživatele doptat a nevymýšlet si například _"Je název pro tvou kavárnu 'Kavárny Pod Kaštanem' dobrý?"_ nebo _„Programuješ i v TypeScriptu nebo mám napsat jen JavaScript“_. Také je občas potřeba určité informace dohledat a ne si je _„vyhalucinovat“_. V ChatGPT takovou věc mají na starosti pluginy. V ChatBingu je integrovaný vyhledávač Bing, já ve WebGPT kombinuju možnosti od OpenAI a mám vytvořenou [vlastní lehkou nadstavbu - **📖 PromptBook**](https://github.com/webgptorg/promptbook) aby šli podobné postupy psát i neprogramátorem v dokumentech.

**A jaký je rozdíl mezi tvou knihovnou a desítkami jiných knihoven pro AutoGPT?**

To co dělám je opravdu lehká nadstavba nad OpenAI API a dalšími, která umožňuje psát podobné postupy i neprogramátorem v dokumentech.

Jde o takovou _„kuchařku receptů“_ pro řízení velkých jazykových modelů i naprostým neprogramátorem.

V principu je to jen o tom, že si vytvořím šablonu, která má nějaké proměnné a ty se nahradí za výsledky z modelu nebo od uživatele. Celé je to oproti jiným knihovnám velmi soustředěné na vývoj uživatelských aplikací, takže tam řeším i interakci s UI, streamování výsledků, UX, atd...

Druhá důležitá věc je, že se snažím rozdělit role. Dneska je prakticky nemožné sehnat vývojáře, sehnat copyrightry je jednodušší a psaní podobných promptbooků se zcela jistě stane novou profesí.

Opravdu zajímavé na tom je, že taková práce má jak povahu copywritingu, tak povahu programování pomocí přirozeného jazyka.

Jako výsledek dostanu úplně obyčejnou asynchronní funkci, kterou lze použít přesně jako jakoukoliv jinou funkci v rámci kódu.

**A nemyslíš, že generativní AI a celý ten trend, že co týden vznikne stovka aplikací a knihoven, je jen další obrovská nafouknutá bublina jako například NFTs?**

Zcela jistě splaskne bublina a mnoho projektů zkrachuje, neuspěje nebo zapadne do zapomnění. Avšak to je naprosto v pořádku – v tuhle chvíli nevíme, co dává smysl a co smysl nedává smysl a bez praktického otestování to ani nezjistíme.

Co jsem si však zcela jistý, že ještě rozhodně nejsme na vrcholu – Například co se týká generování obrázků je situace taková, že naprostým etalonem je MidJourney 5.x,avšak MidJourney se nedá použít přes API jako komponenta aplikací jakou je například WebGPT, takže nad ním ještě nemohou vznikat žádné sekundární služby, které by fungovaly v reálném čase pro koncové uživatele.

Dalle-2, Stable Fusion se tímto způsobem použít dají, avšak ty jsou graficky na mnohem nižší úrovni. A jakmile se otevře Dalle-3, případně MidJourney API, přijde podobná exploze sekundárních služeb, jakou teď zažíváme nad textovými modely.

Zároveň tam bude určitý synergický efekt, protože pro mnoho věcí dává smysl tyto dva typy modelů kombinovat – například pro WebGPT.

A pak mám druhý důvod, proč se nemyslím, že jde o pouhou nafouknutou bublinu. Ve společnosti je ohromná míra neefektivity a neskutečné množství věcí lze nově automatizovat.

Také si je dobré uvědomit, že ChatGPT nebyl ani tolik technologický průlom, ale spíš dokázali vytvořit naprosto kularvoucí UX pro už existující GPT-3, které trochu doladili a vylepšili a dokázali vytvořit rozhraní, se kterým dokáže pracovat zcela běžný člověk.

Dobrého půl roku před ChatGPT jsme měli my programátoři k dispozici GitHub Co-pilot a ještě celý rok předtím to byl Tomáš Studeník, který jako první člověk v Česku ukázal, že umělá inteligence dokáže napsat smysluplný lidský text v podobě divadelní hry. To bylo postavené nad GPT-2 a GPT-2 byl ten opravdový technologický průlom, v tu dobu ještě nezaznamenaný širokou veřejností.

!!! Ainautes někde

**Když jsme u té divadelní hry, jakým způsobem ovlivní generativní AI jazyk a kulturu?**

Obsah byl vždy ovlivněn formou a způsobem distribuce.

Knihtisk byl _„jen“_ obyčejná technologie, kdy Gutenberg objevil správnou slitinu pro raznice, avšak tahle čistě technologická změna odemkla ohromný potenciál a řádově zlevnila výrobu knih. Najednou byli knihy mnohem levnější, mnohem dostupnější, dávalo mnohem větší smysl umět je číst a přestali být luxusním zbožím. I díky tomu se v Evropě odehrály neuvěřitelné společenské a sociální změny.

Internet zapříčinil obdobný efekt- najednou se dal obsah šířit nejen téměř zadarmo, ale přestala hrát roli vzdálenost.

Generativní umělá inteligence přinese podobný skok – stále tu máme vzdálenost například v podobě jazykových bariér nebo bariér, kdy jeden člověk preferuje audio zatímco druhý preferuje text.
Takové bariéry byly doposud nepřekonatelné respektive tyto bariéry šly doposud překonat pouze s vynaložením netriviálních ekonomických zdrojů. Pokud člověk napsal knihu namluvit audioknihu vyžadovalo značnou část dalších zdrojů.

Za pár let bude zcela běžné, že já pošlu zprávu v libovolné formě a libovolném jazyce a ty si ji pustíš v libovolné kombinaci obého.

Zároveň bude možné, aby vzniklo mnoho obsahu, který bude výrazně více na míru – J.K.Rowlingová v minulosti vytvořila naprosto pevný obsah a až kolem toho vznikl úžasný svět Harryho Pottera.

Budoucí J K Rowling může vytvořit koncept takového světa, kdy popíše konkrétní příklady, konkrétní situace, konkrétní části světa, avšak každý čtenář si bude moc vytvořit vlastní příběh nad tímto světem.

Možná se dokonce rozdělí autorství na autory těch světů a konceptů a na autory konkrétních příběhů v rámci těch světů.

Podobná věc s autorstvím se teď diskutuje z hlediska obrazů – Možná se zcela rozdělí autorství stylu a konkrétního obrazu.

Zároveň bude velmi pravděpodobné, že v těchto světech bude možné existovat v mnoha různých formách – někdo je bude chtít číst, jiný si bude chtít povídat s postavami, jiný bude chtít poslouchat rozhlas z Ministerstva kouzel a někdo si bude chtít zahrát počítačovou hru.

**Když mluvíš o počítačových hrách, ty sám jsi počítačovou hru vyviděl, řekni něco víc o hře Towns, kterou jsi vyvíjel**

Šlo o online strategickou prohlížečovou hru - taková kombinace mezi Age of Empires a Travianem, který v té v té době frčel. Už je to poměrně dlouhá doba, doslova polovina a mého života kdy jsem tuhle věc začal dělat před 15 lety v mých 15 letech a docela jsem se na tom naučil programovat.

V jedné z pozdějších verzí byl koncept nekonečného automatický generovaného světa + hráč mohl libovolně kombinovat budovy – například postavit dva domy na hradbu nebo pět domů na sebe z čehož vznikl něco jako mrakodrap. Vše bylo procedurálně generované, takže a šlo o takový proto-koncept vektorového prostoru všech možných budov.

<!-- !!! Link to H-Edu -->
<!-- !!! Link to Collboard -->

**Další z projektů (díky kterému se známe) je virtuální tabule Collboard. Řekni něco víc!**

Jde o virtuální tabuli, kterou jsme založili v rámci elektronických učebnic H-Edu na začátku pandemie Covidu.

Já mám obecně rád modulární systémy, a tak jsem celý systém navrhl tak, že jakýkoliv prvek je zároveň pluginem.

A když se o H-Edu a Collboardu bavíme, jak do H-Edu tak do Collboardu připravujeme integraci s AI.

**Jak se k tomu staví učitelé, nechtějí podobné věci spíš omezovat nebo zakazovat**

Záleží na tom konkrétním učiteli, ale co je pro mě naprosto neskutečné, jak se učitelé dokázali popasovat s celou pandemií covidu a ze dne na den se z nich stali IT správci virtuálních tříd a k tomu zůstali ve své práci učitele.

Velkou propagaci AI pro školství v Čechách dělá Eva Nečasová nebo PRG.AI nebo i ty, který píšeš opravdu obrovské množství kvalitního obsahu o AI v češtině.

jsem tam ale čtu i povzdechy o tom, jak žáci používají vygenerovaný text a otázky Jakým způsobem do lze efektivně detekovat a zakazovat

Často ale také šlyším povzdechy, že by se AI a obecně technologie měli ve škole omezit.

**A nebylo by teda lepší generativní AI ve školách zakázat?**

Ne, avšak rozvedu svou odpověď:

Bez ohledu na to, že sám jsem vývojář a nadšenec do nových technologií a k tomu vyvíjím nástroje nad velkými jazykovými modely, tak i kdybych nic z toho nedělal, fakt jeden: **budoucnost s generativní umělou inteligencí je tady** a prakticky se jejím dopadům nelze vyhnout.

Pravděpodobně nebude existovat žádná intelektuální práce, která by touhle revolucí nebyla ovlivněna – neříkám, že zanikne; říkám, že prakticky všechny profese, které se zabývají manipulací s informacemi budou tak či onak ovlivněny.

Podle mě velmi dobrým příklad je počítač a kalkulačka, ve 40. letech 20. století slovo _„počítač“_ neznamenalo přístroj, ale člověka, který počítá tabulky. Představme si v té době utvrzovat budoucí žáky v tom, že ty počítače jsou stejně jenom nějaký divný hype a že je velmi důležité umět počítat sloupečky čísel ručně.

Určitě je důležité umět počítat a mít přehled o tom jak funguje matematika a stejně tak je důležité znát jazyk, ale vývýbat se využívání velkých jazykových modelů (např. přes ChatGPT) je nesmírně hloupé, protože nás to nepřipravuje na budoucnost a jenom způsobí, že zůstaneme montovnou Evropy.

Je důležité nepřeskakovat laťku ze země, ale použít ji jako stupínek.

**Díky moc za rozhovor! Ještě se tě zeptám, můžou se s tebou čtenáři potkat někde na probíhajících Dnech AI?**

Mluvíme teď na mnoha konferencích, Na Dnech AI máme v úterý s Tomášem přednášku o business příležitostech v AI světě a v pátek mluvím o tom, jak mohou využít generativní AI děti. Zároveň teď v průběhu podzimu probíhá mnoho dalších akcí.
