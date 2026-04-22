+++
title = "How to Update macOS Between Minor Versions Only"
description = "You can easily update macOS without using the newest major version! Here's how..."
date = 2026-04-22

[taxonomies]
tags = ["macos", "security", "updates"]
+++

Before today, I hadn't updated my MacBook in a couple of years, as some of the newest macOS versions add features that piss me off. I want to update to the newest security update without installing the absolute newest version (the newest "major" version) of macOS.

Avoiding the newest major version might seem dumb, but there are a few important reasons highlighting why you may want to stick to **just** security updates on macOS 14:

- If you're on macOS 14 (Sonoma) or earlier, you avoid Apple Intelligence!
    - To many folks, LLMs just mean more clutter. I don't really need it.
    - Some parts of the LLM run locally, which could harm performance and battery life.
- macOS 14 is before Liquid ~~Gl~~ass, which places an additional computational burden on your computer (and may reduce visibility/accessibility, or it could even harm focus).
- macOS 14 is still provided with security updates (as of writing).
    - Unfortunately, major versions of macOS are only supported for a few years, so you'll have to upgrade at some point for continued security improvements.

You can maintain your current major version of macOS using the normal updater in Settings, but it's been inconsistent in showing minor updates for me. When they do appear, they're under: `General > Software Update > Also Available > macOS Sonoma 14.8.5 and 2 more...` (click "More Info..." at the bottom right)

But... they don't always work. So, if you _also_ have trouble with getting them to install via the GUI, you can use the terminal -- like me!

## Great! So, how do I do that?

There are two commands to run. First, list the macOS installers available:

```bash
~ $ softwareupdate --list-full-installers
Finding available software
Software Update found the following full installers:
* Title: macOS Tahoe, Version: 26.4.1, Size: 17814740KiB, Build: 25E253, Deferred: NO
* (...)
* Title: macOS Sonoma, Version: 14.8.5, Size: 13338689KiB, Build: 23J423, Deferred: NO
* (...)
* Title: macOS Monterey, Version: 12.7.4, Size: 12117810KiB, Build: 21H1123, Deferred: NO
```

As you can see, there are several versions available! What I want is the newest version of Sonoma, though it's also worth noting that all of these options are available for my machine:

- downgrade back to macOS 12
- update existing macOS 14
- upgrade to macOS 15
- upgrade all the way to macOS 26 (which is the latest major release as of writing)

Since macOS 15 adds Apple Intelligence (and likely further increases OS storage usage), I'm going to avoid upgrading any further than macOS 14, at least for now. That said, you can choose any option you'd like, of course!

Either way, run the following command, replacing `14.8.5` with whatever version appears in the `Version: x.y.z` in the previous command's output, for whatever `x` version you want to update/install:

```bash
~ $ softwareupdate --fetch-full-installer --full-installer-version 14.8.5
Scanning for 14.8.5 installer
Installing: 39.0%
```

This command (slowly) downloads an update file to `/Applications`. It won't appear until the `Installing: x%` reaches 100%, in which case it'll remove the `Installing` message and say:

```bash
Scanning for 14.8.5 installer
Install finished successfully
```

You can open it via Finder -- it should be called `Install macOS Sonoma.app` (or "Install macOS Whatever.app", if you're using another version).

{{ cache_image(alt="A screenshot of macOS Finder in the /Applications folder with the Install macOS Sonoma.app file selected.", link="images/update-macos-between-minor-versions-only/installer_app_screenie.avif", filetype="avif") }}

Double-click it to open the installer:

{{ cache_image(alt="A screenshot of the Install macOS Sonoma app's first screen, proving that the app works.", link="images/update-macos-between-minor-versions-only/installer_app_continue.avif", filetype="avif") }}

Then, follow the on-screen instructions to complete the update process!

## All done!

Now, our OS is up-to-date, all without installing any additional nonsense or applying giant major upgrades. So... go enjoy your updated (but basically unchanged) computer now! :)

[^update link]: This guide is based on [an official Apple guide](https://support.apple.com/en-us/102662), except I'm more specific and actually tried everything on my own computer first.
