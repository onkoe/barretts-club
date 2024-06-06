+++
title = "Rust is for the Engine, Not the Game"
description = "Macros are cool! But, if we're going to create another language anyways..."
date = 2024-05-31
updated = 2024-06-06
[taxonomies]
tags = ["rust", "game development"]
+++

LogLog Games recently posted [*Leaving Rust gamedev after 3 years*](https://loglog.games/blog/leaving-rust-gamedev/), a must-read article for folks who're doing game development in Rust. It focuses on a small indie developer organization and their experiences with Rust development. If you haven't given it a read, please do so before continuing. Or... at least look at [some Twitter comments](https://twitter.com/LogLogGames/status/1783906189459202319). You'll find some good ones. ☺️

Great! Now that we're on the same page, I want to discuss these problems a bit. We don't have to start with an entire game engine, though. There are lots of good examples! Let's touch on UI.

## Rust's UI Toolkit

Ever since the language became stable, various groups of dedicated developers [have put years of time](https://raphlinus.github.io/rust/gui/2022/07/15/next-dozen-guis.html) into creating a Rusty UI toolkit. In general, there are two views on the project. You can either embrace Rust's borrow checker, inheriting its safety and efficiency but losing on style and readability, or you can create systems that feel closer to something like typical UI programming.

Users of the borrow checker need to approach abstractions differently, as callers need to specify everything about their application state and hook it all together. These toolkits tend to act like React, often keeping around some kind of prop-like state. However, maintaining a codebase like you would with React feels rather difficult. The borrow checker is constantly in the way - it's difficult to re-use existing components without doing something a little more... [immediate](https://rustacean-station.org/episode/emil-ernerfeldt/). Thinking around these challenges has put some users on a long journey, and [it's not over yet](https://raphlinus.github.io/rust/druid/2019/10/31/rust-2020.html).

Even so, there's a traditional form of toolkit that's been moderately popular and successful. This is the macro-reliant or type erasure style. Most 'frameworks' aim for some of this functionality, with practically all major players using procedural macros for declaring types and state. Type erasure is also common, with some implementers getting tons of use from `mem::transmute` and general `unsafe`. These aren't necessarily bad, but they do begin to form another language entirely. It's still the Rust you know and love - it has the helpful libraries, well-defined rules, and algebraic type system. It gives you `Result`, `Option`, easy threading, and a technical (but well-thought-out) `async` format.

However, it also has its safety features disabled - it's similar to C in freedom and safety, particularly in the area of runtime problems.

This Rust is how Bevy works.

## Bevy and Magic

Right now, [Bevy Engine](https://bevyengine.org/) is Rust's premiere option for game development. It's powered by a giant base of nearly a thousand contributors! However, Bevy is pushing the limits of the language, and there are certain features that make Bevy's compilation somewhat unstable.

First off, Bevy uses lots of type erasure. The plugin system is based on the concept of dynamic type resolution. It uses something similar to compile-time reflection when attempting to add `Plugins` to an `App`. These can even be dynamically loaded from a shared object/library file, allowing for 'true' modding. These are type-erased through the process of reflection.

In fact, Bevy even provides *users* with [a custom implementation of reflection](https://crates.io/crates/bevy_reflect), built within the macro system and something similar to type erasure.

Bevy also uses `panic!()` quite a lot within their codebase. Things that should ideally be fallible at compile-time, like adding plugins or running an app, aren't. Instead, they blow up at runtime, perhaps in a 'cold' path, causing issues that typical game engines would pick up with regular static analysis. To be clear, some of these issues can be addressed with something like [`PhantomData` generics to maintain type state](http://twitter.com/sanguine_skies/status/1793717209178529890) before runtime, but many are built deep into the engine or would require something like 'real' reflection (or additional `const` facilities).

Others are pretty impossible to fix. For example, the plugin system [has support for dynamic loading](https://github.com/bevyengine/bevy/blob/ea283c1dead8a1b3d6929d1e9d2d2bdddaa93e05/crates/bevy_dynamic_plugin/src/loader.rs),
so most techniques like `const`, compile-time reflection, and `PhantomData` marker types are difficult or impossible to implement without panicking.

These helpful features are a form of magic in Rust. Both macros and type erasure severely limit the reach of the type system, often decreasing the compiler's effectiveness and more often bothering you with `Any` types that are unproven or completely crashing `rustc`.

Do you see what I'm getting at here? When people use Rust, they expect many viral problems to disappear entirely. `Result` and algebraic data types can take you pretty far, but when you start to interfere with Rust's static analysis, you lose a lot of its most important features.

## The Magic is Gone

It seems like we need a new language! Bevy Engine isn't the problem - it's the misalignment from Rust's guarantees, mostly within the loosely typed [nature of ECS](https://bevyengine.org/learn/quick-start/getting-started/ecs/). `void` pointers are much the same, but C programmers have grown to 'expect' them in place of generics. I don't think Rust developers should do the same.

Another example of Bevy's magic glue is their task/concurrency system. For now, `bevy` barely supports external `async` on the user end of things. There are some plugins that can assist here, like [`bevy_async_ecs`](https://docs.rs/bevy-async-ecs/latest/bevy_async_ecs/) and [`bevy-async-task`](https://crates.io/crates/bevy-async-task), but both are mostly untested and need additional users.

In theory, Bevy could integrate these features into their API. Users could get more control over what `async` operations are happening, and they wouldn't have to create quick and dirty solutions to internal problems. However, I think the "2018 Edition"-esque `Future` errors would surface to annoy folks, particularly if the implementation is rushed. `crossbeam` (the real one, not the `std` API) is still used in various parts of Bevy, though. I don't have much hope that such sweeping changes would come to Bevy, nor do I think that they necessarily make a whole `sync`/`async` API split. That's a ton of work!

So, yes - I think we'd need a new language. It could still perform Bevy's magic, use its tooling, include helpful constructs like algebraic type and `Result`, and stay 'close to the hardware'. However, it could handle complex issues like concurrency/asynchrony and dynamic plugin loading without making the user think about it at all.

I'm not sure if Bevy contributors would want such a language. The current engine is already a huge undertaking, and it introduces another layer of design, development, and bugs. However, a lot of significant issues would be completely fixed, and it would cut out several niche issues within Bevy Engine projects.

## June, A New Foe

{% warning() %}

Unfortunately, June's primary maintainer had to archive the project. Its main source of funding pulled out, leaving her with the tough decision of either self-funding the project or archiving it. Please <a href="https://www.sophiajt.com/following-new-paths-ahead/">see her blog post</a> for additional information.

If you become aware of any active forks of June, or similar languages overall, please <a href="https://github.com/onkoe/barretts-club/issues/new">reach out</a>!

In any case, the following section should otherwise hold up. Take care!

{% end %}

The problems I've described define the complexities of creating large, extensible Rust libraries. However, the issues don't harm the library maintainers - just the users. When someone goes to write a game or make a user interface, they want minimal friction. Rust is good at that when you're in control, but without extended language features, it's difficult to create any tangible engine API that feels normal. That's not to say other languages are perfect:

- Python is interpreted, slower, and lacks some of Rust's best constructs. It's good for 2D games due to its ease of use, though!
- GDScript has minimal tooling. Most of Rust's best lints and static analysis features are missing.
- C and C++ face issues with safety, readability, and simplicity. Both lack satisfactory language features for writing dependable code.
    - I'm less harsh on C++ due to some advances in safety, but writing an engine in it (or for it) still seems like you're building on shaky ground.
- C# is great for writing games, but it misses out on some nice ideas from Rust and other languages.

I'm imagining a language that learns from the best features of the above. [June, a Rust-like language](https://www.sophiajt.com/search-for-easier-safe-systems-programming/), feels like a good start. It's effectively Rust, but possibly closer to [the style that Graydon Hoare wanted](https://graydon2.dreamwidth.org/307291.html). June isn't quite complete yet, and there's quite a ways to go for it to reach a point of relative usability, but I'm confident that June (or some derivative language) will find its way to the gamedev world in the near future.

The "shared lifetimes" of June should significantly improve the user experience in virtually all downstream cases. Best of all, the authors even plan Rust interop, though that's currently pending a stable ABI - which is [still far away](https://www.youtube.com/watch?v=MY5kYqWeV1Q) at the moment. If that does complete, though, all your Rust libraries will be available, and June will be yet another amazing part of this community!

## Renovating Rust

I know that there'd probably be some folks who'd ask me how Rust itself can get better. It's definitely possible, so I may as well touch on it! In my view, if our community wants Rust to be great for game development, we'll need some enhanced language features. Namely:

- Compile-time reflection would help a lot with almost all crates. That's both for their compile times and feature set. [(goodnight, sweet prince)](https://soasis.org/posts/statement-on-rustconf-compile-time-introspection/)
- Enhanced `const` support would assist in places where things are known at compile-time. [The `const` `Iterator` RFC](https://github.com/rust-lang/rust/issues/92476) is looking to unblock quite a few interesting ideas! I'm also interested in [the unibrow `const` `impls`](https://internals.rust-lang.org/t/pre-rfc-revamped-const-trait-impl-aka-rfc-2632/15192)...
- [A stable Rust ABI](https://github.com/rust-lang/rfcs/issues/600) for June (and other language) integration! (preferably [without the demons](https://thephd.dev/binary-banshees-digital-demons-abi-c-c++-help-me-god-please))
- [`cargo-script`](https://rust-lang.github.io/rfcs/3424-cargo-script.html) for better example code.
- [An effects system](https://blog.yoshuawuyts.com/extending-rusts-effect-system/) for easier handling of things like `const`, `async`, etc.
- Anything that helps folks avoid the borrow checker in certain situations. The [integration of non-lexical lifetimes](https://blog.rust-lang.org/2022/08/05/nll-by-default.html) is a great example!
- More `rust-lang/rust` [E-easy or "good first issue"](https://github.com/rust-lang/rust/issues?q=is%3Aopen+is%3Aissue+label%3AE-easy) labelers. The language will only get better if we continue to introduce additional contributors.
    - It's also worth nothing that there's no "unclaimed"/"claimed" issue tags. These would help a lot with keeping things clean!

If you're familiar with these issues and have some ideas around them (or know something I don't), please feel free to [contact me by email](mailto:contact@barretts.club) [or on GitHub](https://github.com/onkoe) directly. I'd love to help bring the language to a better spot.

Better yet, document them for the community! I'd love to see some well-documented issues popping up on the issue tracker. When there's no RFC or detailed issue, the best options become stalking Zulip and reading blog posts. Fixing that is... good. 🥹

With these changes, we'll be on our way.

{% conclusion() %}

Thanks for making it to the end! I hope you enjoyed the article and considered some of these ideas. If you have any suggestions (or just know something I don't), please <a href="mailto:contact@barretts.club">shoot me an email</a>!

I'm also planning to start posting on YouTube. If you feel any particular way about that, I'd love to hear. Take care!

{% end %}
