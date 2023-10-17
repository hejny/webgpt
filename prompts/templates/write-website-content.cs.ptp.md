# Obsah webové stránky

Instrukce pro vytvoření obsahu webové stránky za pomocí [🌠 Prompt template pipelines](https://github.com/hejny/ptp).

<!--
TODO: !!! [🚲] New format
TODO: !!! [🚲] Parse this new format
-->

-   PTP version 0.0.1
-   Use chat
<!-- TODO: [🌚]> -   Use GPT-3.5 -->
-   Input param `{title}` Návrh názvu webu od zákazníka
-   Input param `{assigment}` Zadání webu od zákazníka
-   Output param {content}` Obsah webu

## Vylepšení názvu

```prompttemplate

Jako zkušenému marketingovému specialistovi vám bylo svěřeno vylepšení názvu klientova podnikání.

Navrhovaný název od zákazníka:
"{title}"

Zadání od zákazníka:

\`\`\`
{assigment}
\`\`\`

**Pokyny:**

-   Napiště pouze jeden návrh názvu
-   Název bude použit na webu, vizitkách, vizuálu, atd.

```

`-> {enhancedTitle}` Vylepšený název

## Vymyšlení claimu

```prompttemplate

Jako zkušenému copywriterovi vám bylo svěřeno vytvoření claimu pro webovou stránku "{enhancedTitle}".

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

**Pokyny:**

-   Napiště pouze jeden návrh názvu
-   Claim bude použit na webu, vizitkách, vizuálu, atd.
-   Claim má být rázný, vtipný, originální

```

`-> {claim}` Podtitulek pro web

## Analýza klíčových slov

<!--
Note+TODO: This is not a real keyword analysis, but rather a list of keywords that should be used in the content.
-->

```prompttemplate

Jako zkušenému SEO specialistovi vám bylo svěřeno vytvoření klíčových slov pro webovou stránku "{enhancedTitle}".

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

**Pokyny:**

-   Napiště seznam klíčových slov
-   Klíčové slova jsou v základním tvaru

**Příklad:**

-   Zmrzlina
-   Olomouc
-   Kvalita
-   Rodina
-   Tradice
-   Itálie
-   Řemeslo

```

`-> {keywords}` Klíčová slova

## Vytvoření začátku obsahu webu

```text

\# {enhancedTitle}

> {claim}

```

`-> {contentBeginning}` Začátek obsahu webu

## Vytvoření obsahu webu

-   Use completion
<!-- TODO: [🌚]> -   Use GPT-3 -->

```prompttemplate

Jako zkušenému copywriterovi a webdesignérovi vám bylo svěřeno vytvoření textu pro novou webovou stránku {enhancedTitle}.

Zadání webu od zákazníka:

\`\`\`
{assigment}
\`\`\`

**Pokyny:**

-   Formátování textu je v Markdownu
-   Buďte struční a výstižní
-   Použijte klíčová slova, avšak ta mají být přirozeně v textu
-   Jedná se o kompletní obsah stránky, tedy nezapomeňte na všechny důležité informace a prvky, co by měla stránka obsahovat
-   Použijte nadpisy, odrážky, formátování textu

**Klíčová slova:**

{keywords}

**Pokraujte obsahem:**

{contentBeginning}

```

`-> {contentBody}` Prostředek obsahu webu

## Spojení obsahu

```text

{contentBeginning}

{contentBody}

```

`-> {content}` Obsah webu
