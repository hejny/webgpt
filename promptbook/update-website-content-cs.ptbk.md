# 🌍 Aktualizace obsahu webu

Instrukce pro úpravu obsahu webové stránky za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/en/update-website-content.ptbk.md@v0.1.0
-   PTBK version 0.0.1
-   Use chat
<!-- TODO: [🌚]> - Use GPT-3.5 -->
-   Input param `{oldContent}` Původní obsah webu
-   Input param `{rawAssignment}` Požadavek od uživatele na změnu
-   Output param `{newContent}` Nový obsah webu

<!--
## 🖋 Vylepšení zadání

-   Use completion
-   Postprocessing `spaceTrim`

```markdown
Jste zkušený webdesignér a manažer, od máte od uživatele nezpracované zadání, co změnit na webových stránkách.
Udělejte si z toho profesionální a strukturované zadání.

## Surové zadání ve znění od zákazníka

{rawAssignment}

## Zadání
```

`-> {proffesionalAssignment}` Profesionálně vypadající požadavek na změnu

## 👤 Schválení vylepšeného zadání

-   Prompt dialog

Je to změna, kterou chcete provést?

```
{proffesionalAssignment}
```

`-> {finalAssignment}` Finální žádost o změnu

-->

## 🖋 Úpravy

-   Use completion
-   Postprocessing `spaceTrim`

```markdown
Jste zkušený copywriter a upravujete obsah stránky podle pokynů uživatele.

## Úkol

{rawAssignment}

## Původní obsah

{oldContent}

## Nový obsah dle zadání
```

`-> {newContent}`
