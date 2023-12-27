# 📝 Vylepšení textu

Instrukce pro vylepšení textu za pomocí [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/cs/other/enhance-text-cs.ptbk.md@v0.1.0
-   PTBK version 0.0.2
-   Input param `{inputText}` Vstupní text
-   Output param `{outputText}` Vylepšený text

## Preprocessing

-   execute script

```javascript
let preprocessedText = inputText;
preprocessedText = preprocessedText.split('\n\n\n').join('\n\n');
preprocessedText = preprocessedText.split('\n\n\n').join('\n\n');
preprocessedText = preprocessedText.split('\n\n\n').join('\n\n');

preprocessedText = preprocessedText.split('pomlčka').join('–⁠');

return preprocessedText;
```

`-> {preprocessedText}`

## Úprava postu

-   use chat
-   postprocess spaceTrim

```
Oprav zadaný text

## Pravidla

- Opravte gramatické chyby
- Oprav velká a malá písmena
- Přidej háčky a čárky
- Oprav interpunkci


## Text

{preprocessedText}



```

`-> {correctedText}`

## Map outputText

-   execute simple template

```
{correctedText}
```

`-> {outputText}`
