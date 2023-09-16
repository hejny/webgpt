drop view if exists public."Prompt_stats";

create view
  public."Prompt_stats" as
select
  "Prompt".id,
  "Prompt"."previousExternalId",
  "Prompt"."createdAt",
  "Prompt"."promptAt",
  "Prompt"."answerAt",
  "Prompt"."systemMessage",
  "Prompt".prompt,
  "Prompt".answer,
  "Prompt".model,
  "Prompt"."modelSettings",
  "Prompt".metadata,
  "Prompt"."clientId",
  "Prompt".type,
  "Prompt"."fullCompletion",
  "Prompt"."externalId",
  1 as "nonce"
from
  public."Prompt"
order by
  "Prompt"."answerAt";