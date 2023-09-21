<!--
Note: Trying the language capabilities of GPT models:
-->

Write synonym for "{word}"

-> {wordSynonym}

---

Write sentence with "{word}" and "{wordSynonym}" in it

-> {sentenceWithTwoSynonyms}

---

Remove word "{word}" from sentence and modify it so that it makes sense:

## Rules:

-   Sentence must be grammatically correct
-   Sentence must make sense after removing the word

## The Sentence:

> {sentenceWithTwoSynonyms}

-> {sentenceWithOriginalWordRemoved}

---

Compare meaning of thee two sentences:

## Sentence 1:

> {sentenceWithTwoSynonyms}

## Sentence 2:

> {sentenceWithOriginalWordRemoved}

-> {comparisonOfTwoSentences}
