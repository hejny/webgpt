# Sample prompt

Show how to use two consecutive prompts with one parameter each.

-   PTP version 1.0.0
-   Input parameter `{word}` Any single word

## Synonym

Synonym for word

-   Postprocessing `unwrapResult`

```prompttemplate
Write synonym for "{word}"
```

`-> {wordSynonym}`

## Sentence

Sentence with word and wordSynonym

-   Postprocessing `unwrapResult`
-   Postprocessing `spaceTrim`

```prompttemplate
Write sentence with "{word}" and "{wordSynonym}" in it
```

`-> {sentenceWithTwoSynonyms}`
