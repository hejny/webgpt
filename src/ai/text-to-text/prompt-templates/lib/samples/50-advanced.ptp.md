# Sample: Language Capabilities

Trying the language capabilities of GPT models.

-   PTP version 1.0.0
-   Use Chat
<!-- TODO: [🌚]> -   Use GPT-3 -->
-   Input parameter `{word}` The word to use in the prompt.
-   Output parameter `{comparisonOfTwoSentences}` Comparison between two sentences
-   Output parameter `{summary}` The overall summary of the comparison

## Synonym

Synonym for word

```prompttemplate
Write synonym for "{word}"
```

`-> {wordSynonymRaw}`

## Unquote synonym

-   Execute script

```javascript
removeQuotes(wordSynonymRaw);
```

`-> {wordSynonym}` Synonym for word

## Sentence with Synonym

Sentence with word and wordSynonym

-   Execute prompt template <!-- This is the default -->

```prompttemplate
Write sentence with "{word}" and "{wordSynonym}" in it
```

`-> {sentenceWithTwoSynonyms}` Sentence with word and wordSynonym

## Sentence without original word

Sentence "{sentenceWithTwoSynonyms}" without "{word}".

-   Execute prompt template <!-- This is the default -->

```prompttemplate
Remove word "{word}" from sentence and modify it so that it makes sense:

## Rules:

-   Sentence must be grammatically correct
-   Sentence must make sense after removing the word

## The Sentence:

> {sentenceWithTwoSynonyms}

```

`-> {sentenceWithOriginalWordRemoved}` Sentence with both synomyms but without a original word

## Comparison

Comparison between "{sentenceWithTwoSynonyms}" and "{sentenceWithOriginalWordRemoved}".

-   Use Chat
<!-- TODO: [🌚]> -   Use GPT-4 -->
-   Execute prompt template <!-- This is the default -->

```prompttemplate
Compare meaning of thee two sentences:

## Sentence 1:

> {sentenceWithTwoSynonyms}

## Sentence 2:

> {sentenceWithOriginalWordRemoved}
```

`-> {comparisonOfTwoSentences}` Comparison between two sentences

## Summary

-   Execute simple template

```markdown
You have entered a word **{word}**. For this word the best synonym is **{wordSynonym}**. The sentence with both words is **{sentenceWithTwoSynonyms}**. The sentence without the original word is **{sentenceWithOriginalWordRemoved}**. And the comparison between the two sentences is:

> {comparisonOfTwoSentences}
```

`-> {summary}`
