# 🌍 Creating website content

<!-- TODO: !!! Use custom html components -->
<!-- TODO: !!! [🧠] How to propperly update ptbk version -->

Instructions for creating web page content using [🌠 Prompt template pipelines](https://github.com/webgptorg/promptbook).

-   PTBK URL https://ptbk.webgpt.com/cs/write-website-content.ptbk.md@v0.1.0
-   PTBK version 0.0.1
-   Use chat
<!-- TODO: [🌚]> - Use GPT-3.5 -->
-   Input param `{idea}` General web idea
-   Input param `{rawTitle}` `Automatic suggestion of the site title or empty text
-   Input param `{rawAssignment}` image description
-   Output param `{content}` `Content of the site
-   Output param `{wallpaperPrompt}` Prompt for image model<!-- TODO: !!> , only if not specified ... -->

## 🖋 Page purpose

-   Use completion
-   Postprocessing `unwrapResult`

```markdown
Design the purpose of the website

## Rules

-   Write a single proposal, don't say multiple options
-   Suggest a general category, e.g. "Car Service" not "Car Service Under Ohradou"
-   Keep the proposal short, no more than 3 words

## Examples

-   "Café"
-   "Autoservis"
-   "Children's playroom"
-   "Wedding"
-   "Photographer's personal page"

## Background

-   {idea}
-   {rawAssignment}

## Purpose of the site

>
```

`-> {draftedPurpose}` Drafting the purpose of the site

## 👤 Specification of the purpose by the user

Is this the purpose of your site?

-   Prompt dialog

```text
{draftedPurpose}
```

`-> {purpose}` Site purpose

## 🖋 Draft assignment

-   Use completion
-   Postprocessing `trim`

```markdown
Create a real site assignment for {purpose} from a clean description of what is in the image

## Rules

-   The purpose of the site is {purpose}
-   The assignment is structured
-   The assignment contains specific numbers, bullets and is precise
-   Brief, maximum 4 points of the assignment, each point is a maximum of 2 sentences

## Handout

-   {idea}
-   {rawAssignment}

## Web assignment
```

`-> {draftedAssignment}` Web assignment

## 👤 Specification of the assignment by the user

Describe the goal of your site

-   Prompt dialog

```text
{draftedAssignment}
```

`-> {assignment}` Site Assignment

## 🖋 Image design

-   Use completion
-   Postprocessing `trim`
      <!-- TODO: !!> Skip if `rawAssignment!==''` -->
      <!-- TODO: Maybe more samples... -->

```markdown
## Illustrative images

## Café

### Website assignment

Create a website for a cafe in Prague called "Space Cafe", which is all about space.

### Image prompt

A large mug full of coffee with milk foam, on which a galaxy is depicted. The mug is on a table with a book about space and coffee beans on it.

## {purpose}

### Website assignment

{assignment}

### Image prompt
```

`-> {wallpaperPrompt}`

## 🖋 Name enhancement

-   Use completion
-   Postprocessing `unwrapResult`

```markdown
As an experienced marketer, you have been entrusted with improving the name of a client's business.

## Suggested name from the client

"{rawTitle}"

## Client's submission

\`\`\`
{assignment}
\`\`\`

## Instructions

-   The purpose of the website is {purpose}
-   Write only one name suggestion
-   Write only the title, no justification or other text around it
-   The name will be used on the website, business cards, visuals, etc.

## Improved title
```

`-> {draftedTitle}` Improved title

## 👤 User approval of the title

Is the title of your site okay?

-   Prompt dialog
-   Postprocessing `spaceTrim`

```text
{draftedTitle}
```

`-> {title}` Site name

## 🖋 Claim for site

-   Use completion
-   Postprocessing `unwrapResult`

```markdown
As an experienced copywriter, you have been entrusted with creating a claim for the "{title}" web page.

## Client's web assignment

\`\`\`
{assignment}
\`\`\`

## Instructions:

-   The purpose of the site is {purpose}
-   Write only ONE name suggestion
-   Claim will be used on website, business cards, visuals, etc.
-   Claim should be punchy, funny, original

## Example 1

> Do you want to have a website or deal with a website!

## Example 2

> Coffee as pure joy

## One proposal for a web claim

>
```

`-> {draftedClaim}` Web design

## 👤 User approval of the claim

Is the subtitle of your site okay?

-   Prompt dialog

```text
{draftedClaim}
```

`-> {claim}` Claim of the site

## 🖋 Keyword Analysis

<!--
Note+TODO: This is not a real keyword analysis, but rather a list of keywords that should be used in the content.
-->

-   Use completion

```markdown
As an experienced SEO specialist, you have been entrusted with creating keywords for the "{title}" web page.

Website assignment from the customer:

\`\`\`
{assignment}
\`\`\`

## Instructions

-   Write a list of keywords
-   The keywords are in basic form
-   The purpose of the site is {purpose}

## Keywords
```

`-> {keywords}` Keywords

## 🔗 Creating the beginning of the web content

-   Simple template

```text


# {title}


> {claim}


```

`-> {contentBeginning}` Start of web content

## 🖋 Creating web content

-   Use completion
<!-- TODO: [🌚]> - Use GPT-3 -->

```markdown
As an experienced copywriter and web designer, you have been entrusted with creating the text for a new web page {title}.

A website assignment from a customer:

\`\`\`
{assignment}
\`\`\`

## Instructions:

-   Text formatting is in Markdown
-   Be concise and to the point
-   The purpose of the site is {purpose}
-   Use keywords, but they should be naturally in the text
-   This is the complete content of the page, so don't forget all the important information and elements the page should contain
-   Use headings, bullets, text formatting

## Keywords:

{keywords}

## Web Content:

{contentBeginning}
```

`-> {contentBody}` Web Content Stack

## 🔗 Content Linking

-   Simple template

```markdown
{contentBeginning}

{contentBody}
```

`-> {content}`
