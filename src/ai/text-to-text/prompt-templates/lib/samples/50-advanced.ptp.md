# 👁‍🗨 Language Capabilities

Trying the language capabilities of GPT models.

## Synonym

Write synonym for "{word}"

-> removeQuotes -> {wordSynonym}

## Sentence with Synonym

Write sentence with "{word}" and "{wordSynonym}" in it

-> {sentenceWithTwoSynonyms}

## Sentence without original word

Remove word "{word}" from sentence and modify it so that it makes sense:

### Rules:

-   Sentence must be grammatically correct
-   Sentence must make sense after removing the word

#### The Sentence:

> {sentenceWithTwoSynonyms}

-> {sentenceWithOriginalWordRemoved}

## Comparison

### Requirements:

-   Use GPT-4

---

Compare meaning of thee two sentences:

### Sentence 1:

> {sentenceWithTwoSynonyms}

### Sentence 2:

> {sentenceWithOriginalWordRemoved}

-> {comparisonOfTwoSentences}
