On AiAi API is not working - it is kinda static build without propper database
Here is manually saved wallpapers from API

TODO: Remove and replace with proper API in future

---

```js
copy(JSON.stringify(localStorage));
```

```js
copy(
    JSON.stringify(
        {
            wallpapers: wallpapers.wallpapers
                .map((wallpaper) => ({
                    ...wallpaper,
                    likedStatus: hejny[`likedStatus_${wallpaper.id}`] || 'NONE',
                }))
                .filter(({ likedStatus }) => ['LOVE', 'LIKE'].includes(likedStatus)),
        },
        null,
        4,
    ),
);
```
