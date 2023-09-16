-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

drop view if exists public."Prompt_stats";

create view
  public."Prompt_stats" as
select

  /* Metadata */
  "Prompt".id,
  "Prompt".type,
  "Prompt"."createdAt",
  "Prompt"."clientId",
  "Prompt".metadata,

  /* Stats */
  ("Prompt"."answerAt" - "Prompt"."promptAt") as duration,

  /* Model */
  "Prompt".model,
  "Prompt"."modelSettings",

  /* Prompt */
  "Prompt".prompt,
  "Prompt"."systemMessage",
  "Prompt"."previousExternalId",
  "Prompt"."promptAt",

  /* Response */
  "Prompt".answer,
  "Prompt"."externalId",
  "Prompt"."fullCompletion",
  "Prompt"."answerAt",


  /* Other */
  2 as "nonce"
  
from
  public."Prompt"
order by
  "Prompt"."answerAt";