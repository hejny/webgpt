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

Generativní AI nepřináší žádnou zásadní novou věc z hlediska kvality, revoluční je v tom, že pro průměrné úkoly dokáže jejich provedení řádově zlevnit a zrychlit. To může přínést i zásadní společenský problém do budoucna – výrazně se zvýší laťka a mnoho lidí dělající jednoduchou práci přijde o ekonomický benefit jejich času.

**Jaké jsou největší výzvy při generování webů?**

Velkou výzvou je _"zkrocení"_ GPT k tomu, aby dělalo přesně to, co potřebuju. Dám příklad:

-   Pokud mám jednoduché zadání / prompt _"Jaký zvuk dělá kočička"_, tak dostanu odpověď _"Mňau"_ nebo *""*Mňau*""* _(v uvozovkách)_ případně *"Kočička dělá "*Mňau*""* nebo něco podobného.
-   Pokud mám komplexní prompt _"Napiš mi komplení obsah webu v markdownu pro kavárnu {name}"_, tak se mi výrazně zvyšuje komplexita odpovědi a často nedostanu to, co chci.

Jakmile je potřeba něco složitějšího, existují v principu čtyři metody, jak na to:

-   **Fine tunning**, kdy se model dotrénuje na konkrétní úkol. Pokud mám tisíce příkladů vstupů a výstupů, tak to funguje dobře. Na rychlé prototypování je to ale pomalé a náročné.
-   **Prompt tunning**, kdy se snažím vymyslet a vyladit jeden prompt, který bude dělat přesně to, co chci. To funguje dobře pro jednodušší úkoly, ale pro složitější úkoly to často selhává na detailech. Například pokud chci vygenerovat obsah webu, pro superjednoduché webové stránky to funguje. Jakmile se ale dostanu do složitějších věcí, tak to opakuje stejný obsah, nebo se zacyklí na nějakém detailu, nedodrží formátování, nedokáže dodržet předepsanou strukturu, pomíchá jednotlivé sekce, atd... Obecně platí, že jakýkoliv model má jen omezenou _"kapacitu"_ a pokud požaduji komplexnější úkol, dostávám chabé výsledky.
-   **Multishot**: často je lepší rozdělit úkol na několik zcela oddělených úkolů. Například místo _"Napiš mi komplení obsah webu v markdownu pro kavárnu {name}"_ rozdělit na _"Napiš mi název kavárny"_, _"Napiš mi popis kavárny"_, _"Napiš mi menu kavárny"_, _"Vygeneruj mi fotky kavárny"_, _"Napiš mi odkaz na sociální sítě kavárny"_, atd... Každý z těchto úkolů je mnohem jednodušší a model je schopen je zvládnout. Zároveň můžeme nechat model podmínečně instruovat sama sebe. Například pokud se nám vygenerovaný název zdá dlouhý, můžeme ho požádat o zkrácení. Obecně se takovému přístupu říká **AutoGPT**.
-   **Multiapproach**: zároveň některé z úkolů mnohem lépe zvládne klasický kód oproti LLM modelu. Například převod markdown na html. To by se sice dalo provést i pomocí GPT, avšak je to zcela zbytečné a neefektivní. Úkoly se zcela deterministickým výsledkem se mají dělat pomocí klasického if/else programování. A pak máme situce, kdy se je uprostřed generovaní potřeba uživatele doptat a nevymýšlet si například _"Je název pro tvou kavárnu 'Kavárny Pod Kaštanem' dobrý?"_ nebo _"Programuješ i v TypeScriptu nebo mám napsat jen JavaScript"_. Také je občas potřeba určité informace dohledat a ne si je "vyhalucinovat". V ChatGPT takovou věc mají na starosti pluginy. V ChatBingu je integrovaný vyhledávač Bing, já ve WebGPT kombinuju možnosti od OpenAI a mám vytvořenou [vlastní lehkou nadstavbu - **Prompt template pipelines**](https://github.com/webgptorg/ptp) aby šli podobné postupy psát i neprogramátorem v dokumentech.



v principu máme čtyři směry kterými dokážeme zlepšovat výsledek, ty se dají docela dobře kombinovat mezi sebou



Tím prvním je zlepšovat Tím prvním je pokus je zlepšování na úrovni modelu, Dá se buď vybrat lepší či horší model Dá se nastavovat temperature nebo lze dělat fajn tuning kdy model dotrénovávám vlastními daty


tím druhým je práce na úrovni promptu případně systém message

tou třetí cestou je spojování do pipelines kdy výsledek 1 prombdu pro bublá do druhého a výsledek 2 do 3

a tou čtvrtou je zapojení klasického programování

tou pátou Je interakce s externími zdroji buď volání API nebo interakce s uživatelem









**A jaký je rozdíl mezi tvou knihovnou a desítkami jiných knihoven pro AutoGPT?**

To co dělám je opravdu lehká nadstavba nad OpenAI API, která umožňuje psát podobné postupy i neprogramátorem v dokumentech.


jde o takovou kuchařku receptů pro řízení velkých jazykových modelů i zcela neprogramátorama

 V principu je to jen o tom, že si vytvořím šablonu, která má nějaké proměnné a ty se nahradí za výsledky z GPT. Celé je to oproti jiným knihovnám velmi soustředěné na vývoj aplikací pro uživatele, takže tam řeším i interakci s uživatelem, streamování výsledků, UX, atd...

Druhá důležitá věc je, že se snažím rozdělit role. Dneska je prakticky nemožné
sehnat vývojáře, sehnat copyrightry je jednodušší a psaní podobných prompkuchařek bude zcela jistě nový druh práce a nový druh ekonomiky

opravdu zajímavé na tom je že tahle práce má jak povahu copyrightingu tak povahu programování – pomocí přirozeného jazyka pracuji velmi podobně jako copyrighter nebo manažer a pomocí přirozeného jazyka popisuji postupy avšak tyto postupy nevykonává sekretářka ale zabalí se do úplně běžné funkce použitelné v rámci aplikace – jde opravdu o úplně obyčejnou asynchronní funkci kterou lze použít přesně jako jakoukoliv jinou funkci v kódu





**Myslíš, že generativní AI ještě není na svém vrcholu?**

<!--



zcela jistě splaskne bublina a mnoho projektů zkrachuje neuspěje nebo zapadne do zapomnění avšak to je naprosto v pořádku – v tuhle chvíli nevíme co dává smysl a Co nedává smysl a bez praktického otestování to ani nezjistíme

co jsem si však zcela jistý, že ještě Rozhodně nejsme Na Vrcholu – Například co se týká generování obrázků je situace taková, že naprostým etalonem je mit Journey 5.x avšak Mid Journey se nedá použít přes API jako komponenta aplikace takže nad ním ještě nemohou vznikat žádné sekundární služby

Dalí i Stable Fusion se tímto způsobem použít dá avšak ty jsou graficky na mnohem nižší úrovni jakmile však přijde Dalí tři případně Mid Journey otevře API přijde podobná vlna záplava sekundárních služeb jako teď probíhá nad textovými modely zároveň tam bude určitý synergický efekt protože pro mnoho věcí dává smysl tyhle dva typy modelů zkombinovat – například pro webgpt 

ve společnosti je ohromná Míra neefektivity a neskutečně množství věcí se dělá se dá automatizovat, na to aby se to dělo existuje ohromný ekonomický tlak

Také si je dobré uvědomit že chat GPT nebyl ani tolik technologický nebo Ai průlom ale spíš dokázali vytvořit naprosto kularvoucí UX pro už existující GPT které trochu doladili a vylepšili A dokázali vytvořit rozhraní které se kterým dokáže pracovat zcela běžný člověk dobrého půl roku před chat GPT přišel k nám co pilot a ještě předtím to byl Tomáš Studeník který jako první člověk v Česku ukázal, že umělá inteligence dokáže napsat smysluplný lidský text v podobě divadelní hry












-->

** když jsme u té divadelní hry, Jakým způsobem teda ovlivní AI jazyk a kulturu?**

<!--

obsah byl vždy ovlivněn formou a ekonomikou

většina technologií neudělá fundamentální změnu v tom jaký obsah se dá vytvořit, spíš změní pravidla hry Jaký obsah dává smysl vytvořit


knihtisk byl jen obyčejná technologie kdy Gutenberg přišel na způsob jak vytvořit Slatinu pro raznice avšak tahle Technologická změna odemkla ohromný potenciál a řádově zlevnila tištění knih – najednou byli knihy mnohem levnější mnohem dostupnější dávalo mnohem větší smysl umět je číst a zároveň před tím byla kniha naprosto luxusní zboží kdy se za kilo knihy platilo víc než za kilo zlata potom se z nich stala komodita a gramotnost se prudce zvýšila zároveň s tím se v Evropě odehrály neuvěřitelné společenské a sociální změny které pak nastartovali první průmyslovou revoluci které pak nastartovali reformaci a potom první průmyslovou revoluce

internet zapříčinil obdobný efekt- najednou se dal obsah šířit nejen téměř zadarmo ale přestala hrát roli vzdálenost

umělá inteligence přinese podobný skok – Stále tu máme vzdálenost například v podobě jazykových bariér nebo bariér kdy Jeden člověk preferuje audio zatímco druhý preferuje psát text tyto bariéry byly doposud nepřekonatelné respektive tyto bariéry šly doposud překonat pouze z vynaložením Velkých ekonomických zdrojů, do pár let tu bude zcela běžné že já pošlu já tobě pošlu zprávu v libovolné formě Audio video a libovolném jazyce A ty jsi jí pustíš v libovolné kombinaci ového zcela bez

zároveň bude možné aby vzniklo spolu mnoho obsahu který bude výrazně více na míru – mám takový J K Rowlingová v minulosti vytvořila naprosto pevný obsah a kolem toho vznikl ohromný Kult světa Harryho Pottera – moderní J K Rowling Rowlingová může vytvořit nějaký koncept takového světa kdy popíše konkrétní příklady konkrétní situace konkrétní části světa avšak každý čtenář se bude moc vytvořit vlastní příběh Nad tímto světem Možná se dokonce rozdělí autorství na autory těch světů a konceptů a na autory konkrétních příběhů v rámci těch světů

zároveň bude velmi pravděpodobné že v těchto světech bude možné existovat v mnoha různých formách – někdo je bude chtít číst jiný si bude chtít povídat s postavami v nich jiný bude chtít poslouchat rádio vysílané z Ministerstva kouzel a někdo si bude chtít zahrát počítačovou hru









-->

** když mluvíš o počítačových hrách, ty sám jsi počítačovou hru vyviděl Řekni něco víc o hře Towns, co jsi vyvíjel**

<!--



šlo o online strategickou hru přes prohlížeč- taková kombinace mezi Age of Empires a travianem který v té v té době frčel – už je to poměrně dlouhá doba, doslova polovina a mého života kdy jsem tuhle věc začal dělat před 15 lety v mých 15 letech a docela jsem se na tom naučil programovat

v jedné z pozdějších verzí byl koncept nekonečného automatický generovaného světa a zároveň člověk mohl libovolně kombinovat budovy– například postavit dva domy na hradbu nebo pět domů na sebe Z čeho vznikl něco jako mrakodrap všechno to bylo procedurálněgerované, takže a šlo o takovou velmi proto verzi nějak určitého vektorového prostoru všech možných budov


zároveň to byl ale je svým způsobem velmi neivní projekt, kdy jsem neměl základní znalosti ohledně toho jak takovou věc škálovat nebo o ekonomice celé věci, Přesto to hrálo nižší tisíce lidí avšak Vzhledem k mé neznalosti jakékoliv optimalizace podobné věci To bylo neskutečně zasekané a chybové





-->

** další Z projektu díky kterému se známe je virtuální tabule kolboard Řekni něco víc o modulech do Collboardu**

<!--


jde o virtuální tabule kterou jsme založili v rámci elektronických učebnic hm které jsem také technicky zakládal kdy se nám stalo že na začátku pandemie covidu byla potřeba mít nějaký jednoduchý super jednoduchý nástroj pro učitele


já Obecně mám rád modularitu a tak jsem celý systém navrhl tak, že jakýkoliv prvek je modulem


když se bavíme o školství, připravujete do hidu nebo kolboardu něco s umělou inteligencí


momentálně připravuji připravujeme modely moduly pro generování obrázků přímo v rámci téhle tabule


pro H Edu pracujeme na chytrém asistentovi pro učitele který pomůže s psaním textu

a v samotných učebnicích hledáme způsob jak vytvářet úlohy na míru pro potřeby konkrétních žáků


jak se k tomu staví učitelé, nechtějí podobné věci spíš omezovat nebo zakazovat


záleží na tom konkrétním učiteli, ale co je pro mě naprosto neskutečné, Na kolik se učitelé dokázali popasovat s pandemií covidu a ze dne na den se z nich stali it správci virtuálních tříd a zároveň to dělali ke své práci učitele


Co je podle mě neskutečné, když mluvíme o školství to je podle mě úžasná věc co v Čechách dělá Eva Nečasová nebo asociace PGA protože spoustu škol a nebo i ty který překládáš který píše opravdu obrovské množství kvalitního obsahu v češtině


jsem tam ale čtu i povzdechy o tom, jak žáci používají vygenerovaný text a otázky Jakým způsobem do lze efektivně detekovat a zakazovat




-->

**Nebylo by teda lepší generativní AI ve školách zakázat?**

<!--


ne, ale rozvedu svou odpověď

bez ohledu na to, že jsem vývojář a nadšenec do nových technologií a vyvíjím nástroj nad velkými jazykovými modely, tak i kdybych nic z toho nedělal fakt jeden budoucnost s generativní umělou inteligencí je tady prakticky se jejím dopadům nelze vyhnout

Pravděpodobně nebude existovat žádná intelektuální práce která by touhle revolucí nebyla ovlivněna – neříkám že zanikne, říkám že prakticky všechny profese které se zabývají manipulacemi manipulací s informacemi budou ovlivněny

podle mě velmi dobrý příklad je počítač a kalkulačka, ve 40 letech bylo slovo počítač slovo počítač neznamenalo přístroj ale člověka který počítá tabulky obvykle balistických křivek pomocí logaritmického pravítka Computer byl člověk ne stroj

představme si v té době utvrzovat budoucí žáky v tom že ty počítače jsou stejně jenom nějaký divný Hype a že je velmi důležité umět počítat sloupečky čísel ručně protože bez toho

určitě je důležité umět počítat a mít přehled o tom jak funguje matematika, avšak a stejně tak je důležité znát jazyk ale vyhnout se použití jazykových použití a hlavně znalosti jazykových modelů je nesmírně hloupé, protože nás to nepřipravuje na budoucnost a jenom způsobí že zůstaneme montovnou Evropy

je důležité nepřeskakovat laťku ze země ale použít je jako stupínek

-->

<!--




















Kalkulačka
Musíme se naučit skákat z postavené laťky ne ze země přeskakovat laťku.
-->

<!--

======================================================================================================================

Jsi zkušený novinář a vydavatel, který se věnuje tématu umělé inteligence.
Před pár dny o sobě dal Pavol Hejný vědět s projektem na generování webů pomomocí AI.
Rozhodl jsi se ho vyzpovídat a zjistit, co ho k tomu vedlo, jak to funguje a co nás čeká v budoucnu.

Co zmínit v rozhovoru:

- Proč je generátor obrázků Dalle-3 velká věc [1]
- primární a sekundární služby: GPT a generování obrázků jsou *"pouze"* stavební bloky podobné jakými byl tranzistor [1]
- Do širokého povědomí dostal AI až ChatGPT, co je víc UX než technický průlom [2]
- Zcela jistě se vynoří spousta různých forem jak generativní AI ovládat [2]
- vznik zcela nového odvětví na pomezí programování a psaní textu
- programování má stejně daleko k matematice jako lingvistice i když běžný stereotyp ještě před pár lety byl že programování je primárně o matematice
- technologie zásnění kulturu- velmi pravděpodobně to budeme mít zásadní kulturní díla 21 století pomocí generativní umělé inteligence Případně se bude jednat o věc Na Pomezí kódu a textu například něco jako šablona nebo instrukce
- Já jsem primárně aplikační vývojář na výzkumník založil jsem H-edu colboard a teď mi dává smysl dělat tohle
- Dynamické galerie, divadlo či prezentace specificky pro publikum co mě ale napadá že by mohla být dokonalá forma Pro tuhle novou generativní technologie jsou počítačové hry například už před 15 lety Minecraft byl první hrou která masově rozšířila koncept procedurálně generovaných světů –
- Řekni mi o tom víc ty sám jsi vyvíjel počítačovou hru
- Důležité je vědět K čemu jsou technologie dobré A k čemu dobré nejsou – Každý by mě pokud lidé kteří Můj syn který má teď rok a půl bude Podle statistiky žít do roku 2100- není prakticky možné aby uspěl ve světě se znalostmi 20 století bude naprosto nutné je naprosto nutné a nejenom pro ní ale i pro mě naučit se pracovat s generativními velmi počítačové znalosti jsou prakticky jsou naprostá nezbytnost a obecně Těžko říct jestli je nutné umět programovat Spíš bych řekl že je důležité umět mít počítačové přemýšlení a umět skriptovat a také Těžko říct na kolik bude zásadní znalost mluvit v cizím jazykem – podle mě bude důležité umět mluvit a dorozumět se gramatika bude ale asi stále lépe a lépe pustínitelné jazykovými modely
- generativní textová umělá inteligence zcela jistě změní i povahu jazyka – mnoho věcí v jazyce vychází z technologických možností úplně jinak používáme jazyk v mluvené formě když přišla 19 století masová potřeba aby plošně populace uměla číst a psát nejenom mluvit přišla také potřeba kodifikovat pravidla
- Ztráta práce a etika přiznávání AI


Rozsah rozhovoru ideálně:
Počet znaků: 9021
Počet slov: 1364
Počet normostran: 5

---

[1] Ač se na první pohled může zdát, že se jedná o *"pouze další představení obrázkového generátoru"*, tak tomu však absolutně není.

Doposud byl hype a pozornost kolem primárních služeb, které poskytují *"cihly, maltu, beton, železo"* v podobě generátoru textu, generátoru obrázků, přepisu a syntézy zvuku,...

Přichází ale doba sekundárních služeb postavených z těchto ingrediencí, které budou umět generovat kompletní kulturní jednotky např. celé knihy, prezentace, návrhy fyzických produktů, matematické důkazy, návrhy byznys plánů, složení celého koncertu, navržení galerie nebo vygenerování celého webu.

Já pracuji na službě, která umí z různých zadání i pouhých nápadů generovat kompletní weby se vším všudy. A nové Dalle bude game changer:

Na vygenerování webu potřebuje @Aiwebdesigner jak dobrý generátor textů, ale také mít k dispozici dobrý generátor obrázků. Doposud byl etalonem MidJourney 5.X, který byl míle napřed oproti Dalle i jakémukoliv modelu Stable Difusion.

Poblém je však ten, že MidJouney nelze použít jako API; respektive vše lze teoreticky použít jako API a já jsem to poměrně složitě řešil tak, že jsem si do kontrolovaného prohlížeče pomocí Puppeteeru a posílal přes interní frontu zadání a pak je vytahoval jiným skriptem 🤯 – extrémně složité nespolehlivé řešení.
A hlavně vygenerování jednoho obrázku tímhle způsobem trvá cca 3 minuty + je to právně a licenčně na hraně.

Jakmile bude existovat generátor obrázků srovnatelný s MJ5, který lze použít jako stavební blok aplikace, najednou to odemkne potenciál všem sekundárním aplikacím a ještě uvidíme zajímavé věci.


---

[2] Opravdu hodně se mi líbí, jak se teď poprvé po dlouhé době vytváří zcela nový aplikační/UI/UX form-factor nad generativním AI.

V principu máme hodně pokročilou surovou technologii která umí pokračovat v libovolném textu, do jak ji zabalíme a prezentujeme uživateli může mít 1000 různých podob.

- Chat(GPT) byl právě jedna z takových podob a ač tu GPT bylo několik let před ChatGPT, tak pro drtivou většinu populace byl průlom právě ten chat.
- Další forma je (GitHub) copilot.
- A ještě trochu jiná je jediné políčko z požadavky.
- A také zajímavě má tuhle věc řešené Notion.
- A také nelze nezmínit Grammarly a Deepl

---

A nyní veď rozhovor.

-->
