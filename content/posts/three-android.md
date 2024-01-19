+++
title = "Four Horsemen of Android Distributions"
description = "There's four types of Android ROMs. Why can't we have one?"
date = 2024-01-18
[taxonomies]
tags = ["android", "lineage", "rant"]
+++

Over the years, I've used a variety of Android distributions.

[LineageOS](https://lineageos.org), a sensible pick for folks wanting a usable AOSP downstream, has been on most of my devices at some point over the past half-decade. To be frank, I love Lineage! It's a blend of two things: creativity and determination.

Creativity is significant, as device maintainers pull out all stops to get devices running. Determination also defines the project as maintainers push toward a consistent, stable ecosystem with expected features - and only those features - working across devices.

LineageOS also has some glaring flaws, though, and they describe the entire Android ecosystem.

## 1: Freedom

Unlike alternative Android distributions, Lineage aims to give users two things: an unabridged, predictable AOSP experience and **freedom**.

You can do practically anything you'd like on a Lineage device. Want to root it and run wildly insecure tweaking scripts? Go for it! Are you interested in running privileged Google services you found online? Go ahead! Are you fascinated with Android 10's design and firmly refuse to upgrade? Well, it's your device!

LineageOS isn't just a standalone operating system - though for most people, it's great for that. The project also aims to be a solid base for downstream distributions. These aren't just goals - they're requirements for each maintainer and device, described [in a Charter](https://github.com/LineageOS/charter/blob/main/device-support-requirements.md) to the entire Lineage community.

Some downstream distros of Lineage include:

- [LineageOS for microG](https://lineage.microg.org/)
- [CalyxOS](https://calyxos.org/) (we'll talk about it later!)
- [DivestOS](https://divestos.org/) and [Replicant](https://replicant.us/)
- [/e/](https://e.foundation/e-os/)
- 'Unofficial' forks scattered across XDA and the rest of the internet.

Each of these projects has its own goals - some completely opposing those of LineageOS. And that's the point!

{% warning() %}

I'd be remiss not to include a disclaimer about bootloader relocking. Overall, LineageOS <a href="https://wiki.lineageos.org/faq#canshould-i-relock-my-bootloader">doesn't support relocking the bootloader</a> after installation, making it mildly insecure for some and unusable for others.

Be careful out there!

{% end %}

## Intermission: Privacy vs. Security

Often, folks equate or confuse **security** and **privacy.** Others may falsely assert that all users would be better off with one over another. This topic needs some clarification before we talk about more distributions.

I'll use [the dictionary](https://www.oed.com/) definition for both:

- **Security**: "the state of being free from danger or threat."
- **Privacy**: "the state... of being free from being observed or disturbed by \[others\]."

The difference is minor, but it has cascading effects on the Android community.

### 🛡️ Security Users

Users who value security may use an Android distribution that [quickly patches](https://www.xda-developers.com/how-android-security-patch-updates-work/) attack vectors, limits user freedom to guarantee certain protections, and enables [certain defenses](https://github.com/anthraxx/linux-hardened) that are off by default.

They may be more willing to put up with performance losses or complex workarounds to mitigate attack vectors and increase intrusion detection across their personal, academic, and professional devices/systems.

Security users often create a [threat model](https://en.wikipedia.org/wiki/Threat_model) and frame their actions within it. This process is comprehensive - all related considerations will be in the model's service.

### 🏰 Privacy Users

On the other hand, those seeking privacy may prioritize powerful device management settings, diminished application privileges, and general protection from oppressive corporations or systems.

These users prefer less initial setup for a 'clean', secure operating system. However, they often go to great lengths to get everyday apps running with fewer observation/monitoring heuristics. For example, countless tools exist to [reduce trackers](https://duckduckgo.com/duckduckgo-help-pages/p-app-tracking-protection/what-is-app-tracking-protection/) [in apps](https://gitlab.com/AuroraOSS/AppWarden/-/issues), [modify existing behavior](https://revanced.app/patches), and [sandbox unruly apps](https://f-droid.org/en/packages/com.oasisfeng.island.fdroid/).

Privacy-seeking users generally seek a similar experience to stock users, with minor tradeoffs.

### Overlap

These users aren't entirely distinct, though! For example, an activist under the censorship of an undemocratic government may value the security of their communications alongside the privacy away from a monolithic institution.

On the other hand, politicians or culturally significant organizations may seek protection from individual *and* organizational intrusion.

With these out of the way, let's discuss Android again!

## 2: Privacy

Many privacy-based distros are LineageOS derivatives, primarily because it provides a decent amount of base privacy. The most well-known[^1] example of a [privacy-focused](https://calyxos.org/docs/about/#privacy-by-design) operating system may be [CalyxOS](https://calyxos.org/).

From their homepage, you can see a lot of effort put in to make users feel safe by default. They include apps like Signal, Tor, and [F-Droid](https://f-droid.org/), all of which act as alternatives to more popular services with minimal usability tradeoffs.

This kind of "privacy by default" attitude is reminiscent of [Mozilla](https://www.mozilla.org/en-US/), a firm that provides the only [practical](https://batsov.com/articles/2021/11/28/firefox-is-the-only-alternative/) alternative to Blink-based web browsers.

As a countless entourage of annoying internet users has highlighted, [CalyxOS](https://privsec.dev/posts/android/choosing-your-android-based-operating-system/)[^2] and [especially F-Droid](https://protonvpn.com/blog/what-is-f-droid/#safe) both have noteworthy security issues.

Still, most CalyxOS users will find themselves reasonably happy with the distro. For quick access to privacy, it's fantastic! It comes preloaded with [everything that makes a new Lineage installation take a while to set up](https://news.ycombinator.com/item?id=28296738#28298062). And, frankly, most users are okay with the imperfections of the AOSP-based security model. It's up to your needs, though! Please decide based on your requirements.

## 3: Security

Security distros are hard to talk about consistently - their goals are everchanging as the required tweaks become increasingly adopted upstream. Still, GrapheneOS has been a consistent name in "security distros" for the last few years.

Graphene includes various security tweaks to the system, mostly comprised of customized/hardened packages and sandboxing techniques.

Unfortunately, the project is sometimes dramatic, with community members flaming others outside Graphene. Still, I don't think you should focus on that part of the project. There's a bit of backstory surrounding it.

### A Short History of GrapheneOS

Daniel Micay, the previous lead maintainer and Foundation director of Graphene, stepped down after [being swatted](https://en.wikipedia.org/wiki/Swatting).

How did this even happen? The project's rowdy behavior becomes more understandable when looking at its history. Graphene, alongside Micay, split from [CopperheadOS](https://en.wikipedia.org/wiki/CopperheadOS) after its backing company began to monetize aggressively under the direction of James Donaldson, the other co-founder.

Copperhead started with a minor change, moving from the GPL to BY-NC-SA and discontinuing open development.

These days, only project members and company partners are allowed to view the source code.

In my view, Micay likely felt a bit betrayed by his co-founder, somewhat moving his trust model inward and thinking of ways to avoid any corruption of his new project.

Overall, Graphene is [massively more successful and popular](https://trends.google.com/trends/explore?geo=US&q=grapheneos,copperheados&hl=en) than Copperhead, but since both exist to serve the same goal, neither is particularly friendly or trusting of the other. The maintainers of Graphene even state on their homepage that it was "formerly known as CopperheadOS."

Anyway, in combination with the weird takeover of a co-founded company, Micay was harassed online and even got swatted, further contributing to potential tensions.

I respect his decision to step down from the Foundation and his social media presence - especially when facing physical threats.

### Just a Project

In any case, Graphene as a security project is incredible - with years of developer time poured into even minor details. No stone is left unturned. It includes comprehensive security vector mitigations and refuses to support devices if they aren't compatible with [such choices](https://grapheneos.org/faq#future-devices).

For example, the maintainers declined to support the Fairphone 4 due to slow, inconsistent security patches and [using test keys in production](https://forum.fairphone.com/t/bootloader-avb-keys-used-in-roms-for-fairphone-3-4/83448/11)! (off-topic, but that's crazy)

While it may be infamous for its community, Graphene shows what a security-oriented distro can do.

## 4: Habit

No stock ROM is the same, so I can't make sweeping assertions about them. However, **habit** defines what stock Android means. Stock ROMs generally provide minimal user control and awful privacy - but deliver passable to excellent security.

Most stock users are unaware of the other Android options, and that's just fine! If it meets their needs, or there are no other options, who's to complain?

However, what's interesting is alternative distributions that target users of habit. For example, [Paranoid Android](https://paranoidandroid.co/) and [Pixel Experience](https://get.pixelexperience.org/about) have features that target 'casual' Android users. These folks may want some cool software to run on their devices.

There are fewer unopinionated distros these days, mostly dropping out of view when [Project Treble](https://android-developers.googleblog.com/2017/05/here-comes-treble-modular-base-for.html) made it 8000x more effortless to [get alternative Android distributions running](https://www.esper.io/blog/android-dessert-bites-6-project-treble-retrospective-3195734).

Still, they're fun to play around with!

## The Four Horsemen and a Conclusion

Given the insane diversity between the various types of Android distributions, I don't think we'll ever get a perfect - or near-perfect - distro.

There are too many development approaches for any single distro to stand out.

For example, someone who loves tinkering with Android internals would likely hate GrapeheneOS, but someone with a comprehensive threat model might view Lineage as a complete joke!

For that reason, most folks should consider their own needs for their devices. There isn't a perfect option, but given the wide range of existing ones, you'll find something great for you!

{% conclusion() %}

Thanks for reading! Is there anything I missed? If so, please let me know by <a href="mailto:contact@barretts.club">contacting me via email</a> or <a href="https://github.com/onkoe/barretts-club/issues/new">sending an issue on GitHub</a>! See you soon! ☺️

{% end %}

[^1]: I'm speaking from my own experience. I know about /e/, Divest, etc.

[^2]: This article looks to be biased, but it makes good points about CalyxOS. Note that the author is a moderator for GrapheneOS, and other PrivSec.dev contributors are involved, too. Scary! I would only trust that site's recommendations with a healthy dose of skepticism. 😄
