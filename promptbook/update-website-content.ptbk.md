# 🌍 Update website content

Instructions for creating web page content using [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/en/update-website-content.ptbk.md@v0.1.0
-   PTP version 0.0.1
-   Use chat
<!-- TODO: [🌚]> - Use GPT-3.5 -->
-   Input param `{oldContent}` Original content of the web
-   Input param `{rawAssigment}` Request from the user what to change
-   Output param `{newContent}` New content of the web

## 🖋 Enhance the assigment

-   Use completion
-   Postprocessing `spaceTrim`

```
Act as an experienced webdesigner and manager, you have a raw assigment from the user what to change on the web.
Make a proffesional assigment from it.

## Rules
- Do NOT make it long
- Do NOT greeting or signature
- Do NOT add polite words like "please" or "thank"
- Preserve the language of the original assigment

## Original assigment:
{rawAssigment}

## Proffesional but short assigment:
```

`-> {proffesionalAssigment}` Proffesional looking request for change

## 👤 Specifying the assigment

-   Prompt dialog

It this the change you want to make?

```
{proffesionalAssigment}
```

`-> {finalAssigment}` Final request for change

## 🖋 Apply assigment

-   Use completion
-   Postprocessing `spaceTrim`

```
Act as an experienced copywriter and modify the markdown content of the page according to the user prompt.

## Assigment:
{finalAssigment}

## Original content:
{oldContent}

## Content changed according to the assigment:
```

`-> {newContent}`
