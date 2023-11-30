# 📝 Zkrácení textu

-   Input param `{inputText}`
-   Output param `{outputText}`

## Shorten the text

-   Use completion
-   Postprocessing `spaceTrim`

```markdown
## Dlouhá verze

{inputText}

## Krátká verze
```

`-> {shortText}`

## Join short and long version

-   Simple template

```text

{shortText}

/TL;DR/

{inputText}


```

`-> {outputText}`
