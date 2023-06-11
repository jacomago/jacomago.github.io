---
title: "Story Stains: Frontend"
date: 2022-07-08T11:53:48+02:00
draft: false
taxonomies:
  tags: ["Flutter", "coding", "Dart", "Story Stains"]
---

Another post about building [Story Stains](https://github.com/jacomago/storystains), the previous one can be found at ["Story Stains: Backend"](@/archive/story_stains_backend.md).

## Flutter

Last year I took a in Angular from Udemy, but for this project as Angular appears to be [slowly dying](https://trends.google.com/trends/explore?date=today%205-y&q=%2Fg%2F11c6w0ddw9,%2Fm%2F012l1vxv), I decided to use another possible Google dead-horse, Flutter.

This time I didn't use a book, or tutorial or such to start building the application. For one, I couldn't find a good up to date tutorial and I somehow expected a quite prescriptive development environment, which was not what happened. In retrospect, I think building the app as a pure HTML/CSS website first could have been quicker. Perhaps that's what I'll do for future projects, or even for this project's web frontend later.

From my anecdotal experience so far, Flutter appears to have a lot of developers from Asia and South America, unlike other tech communities heavily focused in the US. The community also feels smaller than rust considering the number of Medium articles or blog posts. Sometimes that's useful, as there are fewer answers to your googled questions, but sometimes annoying as they can not fit into your specific use case.

At the beginning I would take examples from the [Flutter Cookbook](https://docs.flutter.dev/cookbook), but I still ended up using an example project from [f](https://pub.dev/packages/f) and [CodeIdeal's realworld example](https://github.com/CodeIdeal/realworld_flutter) for a larger architecture example. When I started trying to make the UI look like my sketches, I checked examples from the [Flutter Gallery](https://gallery.flutter.dev/).

I didn't expect the level of complexity there is for frontend development, but there are several layers: Loading from the network, state management, User interface logic and the displaying UI. I have more respect than before for UI developers since there are so many decisions to be made. One of the first in Flutter is choosing from loads of [state management libraries](https://docs.flutter.dev/development/data-and-backend/state-mgmt/options). I started with [GetX](https://pub.dev/packages/get) but struggled with the lack of documentation and eventually swapped to using just the [provider](https://pub.dev/packages/provider) package. It seems like [Riverpod(https://riverpod.dev/) is becoming somewhat of a replacement for provider and should be looked out for.

Even with the new to me complexity, I'm still quite impressed with how easy it is to build in Flutter. From my git logs, it took me from 30th May to 9th June to with no flutter experience to have authentication, create, edit and read my initial API. With the material UI as an initial basis, it doesn't look like a dog's dinner either.

Some other problems are the lack of testing and documentation for all but the larger packages on [pub.dev](http://pub.dev). Most examples written in blog posts, also lack tests. It can be a problem when looking for good test examples outside of the main Google supported packages. Many tests took me a long time to write, simply because I could not find a good example for a particular widget or provider. I'm also not sure about a sensible testing design pattern with the provider package, many tests I end up mocking unrelated providers simply so they don't fail on construction.
