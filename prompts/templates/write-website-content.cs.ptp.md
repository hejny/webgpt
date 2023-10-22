# 🌍 Obsah webové stránky

Instrukce pro vytvoření obsahu webové stránky za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/ptp).

-   PTP URL https://ptp.webgpt.com/cs/write-wallpaper-content.ptp.md@v0.1.0
-   PTP version 0.0.1
-   Use chat
<!-- TODO: [🌚]> -   Use GPT-3.5 -->
-   Input param `{rawTitle}` Automatický návrh názvu webu _v Angličtině_ nebo prázdný text
-   Input param `{rawAssigment}` Automaticky vygenerované zadání webu z rozpoznání obrázku _v Angličtině_
-   Output param `{content}` Obsah webu _v Češtině_

## 🖋 Zadání v Češtině

-   Use completion

-   Postprocessing `trim`

```text

English assignment:
> {rawAssigment}

České zadání:
>
```

`-> {rawAssigmentCs}` Zadání webu v Češtině

## 👤 Upřesnění zadání uživatelem

Popište cíl vašeho webu

-   Execute prompt dialog

```text
{rawAssigmentCs}
```

`-> {assigment}` Zadání webu

## 💬 Vylepšení názvu

```markdown
Jako zkušenému marketingovému specialistovi vám bylo svěřeno vylepšení názvu klientova podnikání.

Navrhovaný název od zákazníka:
"{rawTitle}"

Zadání od zákazníka:

\`\`\`
{assigment}
\`\`\`

## Pokyny:

-   Napiště pouze jeden návrh názvu
-   Název bude použit na webu, vizitkách, vizuálu, atd.
```

`-> {enhancedTitleQuoted}` Vylepšený název

## Vylepšení názvu (Odstranění uvozovek)

-   Execute script
-   Postprocessing `unwrapResult`

```javascript
unwrapResult(enhancedTitleQuoted);
```

`-> {enhancedTitle}` Vylepšený název (bez uvozovek)

## 👤 Schválení názvu uživatelem

Je název Vašeho webu v pořádku?

-   Execute prompt dialog

```text
{enhancedTitle}
```

`-> {title}` Název webu

## 💬 Vymyšlení claimu

-   Postprocessing `unwrapResult`

```markdown
Jako zkušenému copywriterovi vám bylo svěřeno vytvoření claimu pro webovou stránku "{title}".

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

## Pokyny:

-   Napiště pouze jeden návrh názvu
-   Claim bude použit na webu, vizitkách, vizuálu, atd.
-   Claim má být rázný, vtipný, originální
```

`-> {claim}` Podtitulek pro web

## 💬 Analýza klíčových slov

<!--
Note+TODO: This is not a real keyword analysis, but rather a list of keywords that should be used in the content.
-->

```markdown
Jako zkušenému SEO specialistovi vám bylo svěřeno vytvoření klíčových slov pro webovou stránku "{title}".

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

## Pokyny:

-   Napiště seznam klíčových slov
-   Klíčové slova jsou v základním tvaru

## Příklad:

-   Zmrzlina
-   Olomouc
-   Kvalita
-   Rodina
-   Tradice
-   Itálie
-   Řemeslo
```

`-> {keywords}` Klíčová slova

## + Vytvoření začátku obsahu webu

-   Execute simple template

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
-   Použijte klíčová slova, avšak ta mají být přirozeně v textu
-   Jedná se o kompletní obsah stránky, tedy nezapomeňte na všechny důležité informace a prvky, co by měla stránka obsahovat
-   Použijte nadpisy, odrážky, formátování textu

## Klíčová slova:

{keywords}

## Obsah webu:

{contentBeginning}
```

`-> {contentBody}` Stať obsahu webu

## + Spojení obsahu

-   Execute simple template

```markdown
{contentBeginning}

{contentBody}
```

`-> {content}`
