drop view if exists public."Wallpaper_random";

create view
  public."Wallpaper_random" as
select
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
  1 as "nonce"
from
  public."Wallpaper"
order by
  (random());