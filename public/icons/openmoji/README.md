# 😉 Emojis

1. Go to https://openmoji.org/library/#search=love to search emoji and find the code
2. Switch to non-color version
3. Download SVG
4. Rename the file `2B50.svg` -> `2B50.black.svg`
5. Check that every stroke `stroke-width="2"` _(not for example `stroke-width="1.949"`)_
6. _(Rare)_ Check that every <path/> has set `stroke` and `fill="none"` _(Mostly eyes has not)_
7. Find & replace `stroke-width="2"` -> `stroke-width="1" vector-effect="non-scaling-stroke"`
8. _optional_ Make white version by find & replace `#000000` -> `#ffffff`
