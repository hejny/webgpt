# Povídání o generování webů, AI a budoucnosti

> Rozhovor s [Pavolem Hejným](https://www.pavolhejny.com/) pro [Kapler o AI](https://www.kapler.cz/category/AI/)

<!--

Jsi zkušený novinář a vydavatel, který se věnuje tématu umělé inteligence.
Před pár dny o sobě dal Pavol Hejný vědět s projektem na generování webů pomomocí AI.
Rozhodl jsi se ho vyzpovídat a zjistit, co ho k tomu vedlo, jak to funguje a co nás čeká v budoucnu.

Co zmínit v rozhovoru:

- Proč je generátor obrázků Dalle-3 velká věc [1]
- primární a sekundární služby: GPT a generování obrázků jsou "pouze" stavební bloky podobné jakými byl tranzistor [1]
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

[1] Ač se na první pohled může zdát, že se jedná o "pouze další představení obrázkového generátoru", tak tomu však absolutně není.

Doposud byl hype a pozornost kolem primárních služeb, které poskytují "cihly, maltu, beton, železo" v podobě generátoru textu, generátoru obrázků, přepisu a syntézy zvuku,...

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

Před pár dny o sobě dal vědět [Pavol Hejný](https://www.pavolhejny.com/) s projektem na [generování webů pomomocí AI](https://webgpt.cz/).
Rozhodl jsem se ho vyzpovídat a zjistit, co ho k tomu vedlo, jak to funguje a co nás čeká v budoucnu.

**Co si mají čtenáři představit pod tím, když mluvíš o kompletně generovaných webech**

rozhodně tím nemyslím velké webové aplikace, mám na mysli jednoduché prezentační weby které mají za cíl ukázat jednu konkrétní věc – typicky kavárna Pod Kaštanem

---
