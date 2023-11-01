# 🌍 Vytvoření obsahu webové stránky

Instrukce pro vytvoření obsahu webové stránky za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/cs/write-website-content.ptbk.md@v0.1.0
-   PTBK version 0.0.1
-   Use chat
<!-- TODO: [🌚]> -   Use GPT-3.5 -->
-   Input param `{rawTitle}` Automatický návrh názvu webu _v Angličtině_ nebo prázdný text
-   Input param `{rawAssigment}` popis obrázku _v Angličtině_
-   Output param `{content}` Obsah webu _v Češtině_

## 🖋 Překlad popisu

-   Use completion
-   Postprocessing `trim`

```text

English assignment:
> {rawAssigment}

České zadání:
>
```

`-> {rawAssigmentCs}` popis obrázku v češtině

## 🖋 Účel stránek

-   Use completion
-   Postprocessing `unwrapResult`

```markdown
Navrhni možný účel webových stránek z čistého popisu co se nachází na obrázku

## Pravidla

-   Piš jediný návrh, neříkej "může to být toto nebo toto"
-   Navrhni obecnou kategorii, např. "Autoservis" ne "Autoservis Pod Ohradou"
-   Návrh je v češtině
-   Návrh je stručný, maximálně 3 slova
-

## Příklady

-   "Kavárna"
-   "Autoservis"
-   "Dětská herna"
-   "Svatba"
-   "Osobní stránka fotografa"

Text na obrázku:

> {rawAssigmentCs}
```

`-> {draftedPurpose}`Návrh účelu webu

## 👤 Upřesnění účelu uživatelem

Je toto účelem vašeho webu?

-   Prompt dialog

```text
{draftedPurpose}
```

`-> {purpose}` Účel webu

## 🖋 Návrh zadání

-   Use completion
-   Postprocessing `trim`

```markdown
Vytvoř zadání reálného webu pro {purpose} z čistého popisu co se nachází na obrázku

## Pravidla

-   Účelem webu je {purpose}
-   Zadání je strukturované
-   Zadání obsahuje konkrétní čísla, odrážky a je přesné
-   Stručně, maximálně 4 body zadání, každý bod je maximálně 2 věty

## Text na obrázku

{rawAssigmentCs}

## Zadání webu v Češtině
```

`-> {draftedAssigment}` Zadání webu v Češtině

## 👤 Upřesnění zadání uživatelem

Popište cíl vašeho webu

-   Prompt dialog

```text
{draftedAssigment}
```

`-> {assigment}` Zadání webu

## 🖋 Vylepšení názvu

-   Use completion
-   Postprocessing `unwrapResult`

```markdown
Jako zkušenému marketingovému specialistovi vám bylo svěřeno vylepšení názvu klientova podnikání.

## Navrhovaný název od zákazníka

"{rawTitle}"

## Zadání od zákazníka

\`\`\`
{assigment}
\`\`\`

## Pokyny

-   Účelem webu je {purpose}
-   Napište pouze jeden návrh názvu
-   Napište pouze název, ne zdůvodnění ani jiný text okolo
-   Název je v češtině
-   Název bude použit na webu, vizitkách, vizuálu, atd.

## Vylepšený název
```

`-> {draftedTitle}` Vylepšený název

## 👤 Schválení názvu uživatelem

Je název Vašeho webu v pořádku?

-   Prompt dialog

```text
{draftedTitle}
```

`-> {title}` Název webu

## 🖋 Claim pro web

-   Use completion
-   Postprocessing `unwrapResult`

```markdown
Jako zkušenému copywriterovi vám bylo svěřeno vytvoření claimu pro webovou stránku "{title}".

## Zadání webu od zákazníka

\`\`\`
{assigment}
\`\`\`

## Pokyny:

-   Účelem webu je {purpose}
-   Napište pouze JEDEN návrh názvu
-   Claim bude použit na webu, vizitkách, vizuálu, atd.
-   Claim má být rázný, vtipný, originální

## Příklad

Chcete mít web nebo řešit web?!

## Jeden návrh claimu webu
```

`-> {draftedClaim}` Návrh claimu webu

## 👤 Schválení claimu uživatelem

Je podtitulek Vašeho webu v pořádku?

-   Prompt dialog

```text
{draftedClaim}
```

`-> {claim}` Claimu webu

## 🖋 Analýza klíčových slov

<!--
Note+TODO: This is not a real keyword analysis, but rather a list of keywords that should be used in the content.
-->

-   Use completion

```markdown
Jako zkušenému SEO specialistovi vám bylo svěřeno vytvoření klíčových slov pro webovou stránku "{title}".

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

## Pokyny

-   Napište seznam klíčových slov
-   Klíčové slova jsou v základním tvaru
-   Účelem webu je {purpose}

## Klíčová slova
```

`-> {keywords}` Klíčová slova

## 🔗 Vytvoření začátku obsahu webu

-   Simple template

```text

# {title}

> {claim}

```

`-> {contentBeginning}` Začátek obsahu webu

## 🖋 Vytvoření obsahu webu

-   Use completion
<!-- TODO: [🌚]> -   Use GPT-3 -->

```markdown
Jako zkušenému copywriterovi a webdesignérovi vám bylo svěřeno vytvoření textu pro novou webovou stránku {title}.

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

## Pokyny:

-   Formátování textu je v Markdownu
-   Buďte struční a výstižní
-   Účelem webu je {purpose}
-   Použijte klíčová slova, avšak ta mají být přirozeně v textu
-   Jedná se o kompletní obsah stránky, tedy nezapomeňte na všechny důležité informace a prvky, co by měla stránka obsahovat
-   Použijte nadpisy, odrážky, formátování textu

## Klíčová slova:

{keywords}

## Obsah webu:

{contentBeginning}
```

`-> {contentBody}` Stať obsahu webu

## 🔗 Spojení obsahu

-   Simple template

```markdown
{contentBeginning}

{contentBody}
```

`-> {content}`
