# 📝 Vylepšení textu

Instrukce pro vylepšení textu za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/cs/other/enhance-text.cs.ptbk.md@v0.1.0
-   PTBK version 0.0.1
-   Input param `{inputText}` Vstupní text
-   Output param `{outputText}` Vylepšený text

## 🖋 Vylepšení textu

-   Use completion

```
# Zadání pro zkušeného copywritera

## Pravidla
- Výsledný text neobsahuje gramatické ani stylistické chyby
- Výsledný text zní profesionálně
- Výsledný text obsahuje bohatou slovní zásobu
- Výsledný text se významově neliší od surového textu
- Výsledný text má podobnou délku jako surový text


## Surový text:
{inputText}

## Výsledný text:
```

`-> {outputText}`
