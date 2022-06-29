---
title: "Story Stains: The Backend"
date: 2022-06-29T13:30:48+02:00
draft: false
tags: ["rust-lang", "coding", "actix", "Story Stains"]
---

Another post about building [Story Stains](https://github.com/jacomago/storystains), the previous one can be found at ["Story Stains: An Idea forms"]({{< ref "post/story_stains_idea_forms">}}).

## Rust

I like to follow trends as much as the next guy, so I'm writing the backend in rust.

There were two main resources that I used:

- ['Zero To Production In Rust' (zero2prod)](https://www.zero2prod.com), a great book about building a backend service from scratch using [actix](https://actix.rs/). It's what I based most of my server code on. I enjoyed how each tiny step is broken down and that it's written in a test driven methodology.

- [RealWorld App](https://realworld-docs.netlify.app/), a community show case of examples in building a Medium clone. You can see code examples for the backend and frontend based on a single API. In particular a rust version by [snamiki1212](https://github.com/snamiki1212/realworld-v1-rust-actix-web-diesel).

As I wanted to be mobile first, (most of my day to day is only phone after all) I didn't want to build a server side html renderer, as in zero2prod. So I used the API design from the RealWorld App to start.

I also swapped out the session based authentication from the zero2prod in favour of JWT. Likely, it's something I plan to change in the future for an oauth2 implementation. Although any article on Hacker News about authentication has many negative opinions on oauth2 complexity and the ease of badly implementing JWT, so that might change my mind. Generally, I enjoy using my Google account as a login, so I will aim for that in the future.

## Mistakes

An aim of Story Stains is to teach myself programming a full stack application with deployment. I expect to make mistakes and learn from them.

One mistake was strictly following the RealWorld App's API design. All of the POST or PUT methods involve sending a wrapper object, i.e.

```javascript
{
    user: {
        username: 'fred',
        password: 'totallynotarobot'
    }
}
```

Rather than:

```javascript
{
    username: 'fred',
    password: 'totallynotarobot'
}
```

It led me to write, in both the backend and frontend code, a lot of similar into_inner() methods.

Another mistake is using actix or rust in the first place. I chose them because I wanted to learn rust and I enjoyed the zero2prod book, and I have learnt a lot. Often, however, I yearn for the readymade admin interface, pre made queries and ORM from Django. The rust and actix ecosystem doesn't give you nearly as much hand holding and requires you to spend a lot of time fitting parts together.

I found this apparent when adding the emotion feature to the API and found I was writing a lot of repetitive code. I will aim to refactor it out and aim for DRY (don't repeat yourself), but I'm essentially writing part of an ORM. For a one man band or small start-up, that's a lot of work. 

Before I felt quite skeptical about no-low-code backends like Firebase and it's competitors, but I can really feel it's appeal. The want to focus on business logic rather than application logic is high.
