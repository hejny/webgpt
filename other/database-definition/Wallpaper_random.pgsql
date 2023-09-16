CREATE VIEW public."Wallpaper_random" AS
 SELECT
    "Wallpaper".id,
    "Wallpaper".parent,
    "Wallpaper"."createdAt",
    "Wallpaper".src,
    "Wallpaper".prompt,
    "Wallpaper"."colorStats",
    "Wallpaper".title,
    "Wallpaper".content,
    "Wallpaper".keywords,
    "Wallpaper".author,
    "Wallpaper"."isPublic",
   FROM public."Wallpaper"
  ORDER BY (random());