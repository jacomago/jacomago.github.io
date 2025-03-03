---
title: "Story Stains: Full Stack Enums"
date: 2022-07-16T17:03:38+02:00
draft: false
taxonomies:
    tags: ["rust", "coding", "actix", "Story Stains", "Flutter"]
---

Another post about building [Story Stains](https://github.com/jacomago/storystains), the previous one can be found at ["Story Stains: Frontend"](@/archive/2022/20220708-story_stains_frontend/index.md).

## Enums

Enums are a way of having multiple options programmatically, when a Boolean (true or false) isn't expressive enough. Think traffic lights: Red, Orange, Green, Http Status Codes: Unauthorized, Not Found, OK,..., and Countries: Germany, Poland, Great Britain, England? UK?...

Some things seem obviously able to fit into an Enum data type, until they don't. Emotions are what I was tackling. How many emotions can you feel when you watch a great film? Grief, Fear, Joy, Melancholy. The list may be large but it seems possible to do a suitable search in a dictionary or thesaurus and have a finite list, that's unlikely to change much. So I thought to use an Enum in my backend.

## Database storage

How do you store an Enum in a database? Postgres actually supports Enums, but the backend is where the API lives so surely it should be stored there? I decided to use an extra table, I wanted to store a name and a description for each emotion, pretty easy. I'll then have the Enum stored in the backend so I don't need to do database lookups, clever right?

But if the backend is the ultimate source of truth of the enum, how do I keep them in sync? Write a little sync function! So I wrote a little sync function to keep the database in sync with the emotions on start up, easy.

My staging app keeps failing in the sync check... 

## More Data

Story stains is meant to be somewhat of a mood tracker for the stories you read or watch. What do mood trackers have? Cute little icons to represent the moods. So I need more info in the Enum, using [strum](https://crates.io/crates/strum) I can add many more fields to my Enum, so why not one for an SVG location as well. I could store the whole SVG, but that would only make sense in the database, and that's not the source of truth is it?

Well, when I started adding the emotions to the review API, then I was doing joins on the Emotions table. So for that part of the API the Database table is the source of truth. My sync check seems a little silly now. 

## More emotions

The first twenty one emotions I decided on were rather extreme: Cruelty, Horror, Betrayal,Disgust,... Reviewing the subtle short story 'I stand here ironing', I'm not sure I felt any of those. I need more emotions, and preferably a quicker way to add them than refactoring an Enum and with a linked migration in the database each time. Time to delete some enums.
