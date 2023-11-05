# 📝 Vylepšení textu

Instrukce pro vylepšení textu za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/cs/other/enhance-text.cs.ptbk.md@v0.1.0
-   PTBK version 0.0.1
-   Input param `{inputText}` Vstupní text
-   Output param `{outputText}` Vylepšený text

## Úprava postu

- use completion
- postprocess spaceTrim


```
Jako zkušenému copywriterovi s vytříbeným jazykem a smyslem pro detail vám bylo svěřeno zpracování následujícího textu.
Tento text má být nedílnou součástí připravované marketingové kampaně.

Pokyny pro tento úkol jsou následující:

- Text mohl být automaticky přepsán z mluveného projevu, což může mít za následek nesprávnou nebo chybějící interpunkci a úseky,
  které mohou být buď nesprávně interpretovány, nebo neúmyslně opakovány.
- Rozšiřte bohatost jazyka a slovní zásobu použitou v textu.
- Opravte gramatické chyby.
- Dodejte textu vyšší úroveň profesionality.
- Zachovejte původního vyznění textu.

## Surový text příspěvku

{inputText}


## Vylepšený text příspěvku

```


`-> {outputText}`
