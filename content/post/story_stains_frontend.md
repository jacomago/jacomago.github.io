---
title: "Story Stains: Frontend"
date: 2022-07-08T11:11:53Z
draft: true
tags: ["Flutter", "coding", "Dart", "Story Stains"]
---


Another post about building [Story Stains](https://github.com/jacomago/storystains), the previous one can be found at ["Story Stains: Backend"]({{< ref "post/story_stains_backend">}}).

## Flutter

Last year I took a in Angular from udemy, but for this project as Angular appears to be [slowly dying](https://trends.google.com/trends/explore?date=today%205-y&q=%2Fg%2F11c6w0ddw9,%2Fm%2F012l1vxv), I decided to use another possible Google deadhorse, Flutter.

This time I didn't use a book, or tutorial or such to start building the application. I somehow expected a quite prescriptive development experience, which was not what happened. In retrospect, I think building the app as a pure HTML/CSS website first could have been quicker. Perhaps that's what I'll do for future projects, or even for this project's web frontend later.

I didn't expect the level of complexity in frontend development, but there is state management and the 'UI'. One problem I found, was the significant number of [state management libraries](https://docs.flutter.dev/development/data-and-backend/state-mgmt/options) to choose from. I started with [GetX](https://pub.dev/packages/get) but struggled with the lack of documentation and eventually swapped to using just the [provider](https://pub.dev/packages/provider) package.

 Mostly at the beginning using the [Flutter Cookbook](https://docs.flutter.dev/cookbook) provided a lot of good examples to start to work on, but I still ended up using an example projects in [f](https://pub.dev/packages/f) and [CodeIdeal's realworld example](https://github.com/CodeIdeal/realworld_flutter). And later when I had more UI things I wanted to change, the [Flutter Gallery](https://gallery.flutter.dev/).
