# 🌍 Aktualizace obsahu webu

Instrukce pro úpravu obsahu webové stránky za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/en/update-website-content.ptbk.md@v0.1.0
-   PTBK version 0.0.1
-   Use chat
<!-- TODO: [🌚]> - Use GPT-3.5 -->
-   Input param `{oldContent}` Původní obsah webu
-   Input param `{rawAssigment}` Požadavek od uživatele na změnu
-   Output param `{newContent}` Nový obsah webu

## 🖋 Vylepšení zadání

-   Use completion
-   Postprocessing `spaceTrim`

```
Jste zkušený webdesignér a manažer, od uživatele máte nezpracované zadání, co na webu změnit.
Udělejte si z toho profesionální úkol.

## Pravidla
- Nedělejte to dlouho
- NEPOzdravujte ani nepodepisujte
– NEPŘIDÁVEJTE zdvořilá slova jako „prosím“ nebo „děkuji“
- Zachovat jazyk původního zadání

## Původní zadání:
{rawAssigment}

## Profesionální, ale krátký úkol:
```

`-> {proffesionalAssigment}` Profesionálně vypadající požadavek na změnu

## 👤 Schválení vylepšeného zadání

-   Prompt dialog

Je to změna, kterou chcete provést?

```
{proffesionalAssigment}
```

`-> {finalAssigment}` Finální žádost o změnu

## 🖋 Úpravy

-   Use completion
-   Postprocessing `spaceTrim`

```
Jste zkušený copywriter a upravujte obsah stránky podle pokynů uživatele.

## Úkol:
{finalAssigment}

## Původní obsah:
{oldContent}

## Obsah změněn podle zadání:
```

`-> {newContent}`
