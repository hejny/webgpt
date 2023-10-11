# Sample: Language Capabilities

Trying the language capabilities of GPT models.

-   Use PTP 1.0.0
-   Use Chat
-   Use GPT-3
-   `{word}` The word to use in the prompt.

## Synonym

Synonym for {word}

```prompt
Write synonym for "{word}"
```

`-> {wordSynonymRaw}`

## Unquote synonym

```javascript
removeQuotes(wordSynonymRaw);
```

`-> {wordSynonym}` Synonym for {word}

## Sentence with Synonym

Sentence with {word} and {wordSynonym}

```prompt
Write sentence with "{word}" and "{wordSynonym}" in it
```

`-> {sentenceWithTwoSynonyms}` Sentence with {word} and {wordSynonym}

## Sentence without original word

Sentence "{sentenceWithTwoSynonyms}" without "{word}".

```prompt
Remove word "{word}" from sentence and modify it so that it makes sense:

**Rules:**

-   Sentence must be grammatically correct
-   Sentence must make sense after removing the word

**The Sentence:**

> {sentenceWithTwoSynonyms}

```

`-> {sentenceWithOriginalWordRemoved}` Sentence "{sentenceWithTwoSynonyms}" without "{word}"

## Comparison

Comparison between "{sentenceWithTwoSynonyms}" and "{sentenceWithOriginalWordRemoved}".

-   Use Chat
-   Use GPT-4

```prompt
Compare meaning of thee two sentences:

**Sentence 1:**

> {sentenceWithTwoSynonyms}

**Sentence 2:**

> {sentenceWithOriginalWordRemoved}
```

`-> {comparisonOfTwoSentences}` Comparison between two sentences
