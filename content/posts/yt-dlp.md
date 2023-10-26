+++
title = "Downloading from YouTube"
description = "Find out how you can download your favorite videos from YouTube!"
date = "2023-05-20"
[taxonomies]
tags = ["YouTube", "Android", "iOS", "Linux", "macOS", "Windows", "Video", "yt-dlp"]
+++

YouTube tends to disallow downloading content from their service, but if you have rights to the content, then you may need to access it on your own computer.

Let’s talk about how to download from YouTube on your platform!

<!--- TODO: when we get a ToC, add this! -->
<!---
## Platforms

If you need to do this quickly, click on your platform and follow the short instructions.

[table]
yt-dlp (link)
Linux (link)
macOS and Windows (link)
Android (link)
iOS (link)
Online (link)

-->

## The Underlying Tool

In general, almost every tool that downloads from YouTube or similar websites uses `yt-dlp` underneath. This is a customizable tool you run in your terminal. It can download basically any media from most websites, including YouTube.  

To get it, just download the [package for your system](https://repology.org/project/yt-dlp/versions). Here's the commands for some common systems:

- Fedora: `sudo dnf install yt-dlp`
- Ubuntu: `sudo apt install yt-dlp`
  - 20.04 needs backports: `sudo apt install yt-dlp/focal-backports`
- macOS: `brew install yt-dlp` (if you don't have brew, [get it here](https://brew.sh/))
- Windows: `winget install yt-dlp`

If you're like most people, you'll only use one command. Just type: `yt-dlp https://www.youtube.com/watch?v=dQw4w9WgXcQ` with your YouTube link to download it. Additional download options are available. To see some common ones, [click here](https://tldr.inbrowser.app/pages/common/yt-dlp)!

However, there are also some graphical tools you can use instead. These tools should be easier to use, like apps!

## Linux

On Linux, I recommend using Tube Converter! It allows for easy configuration of the different qualities, file formats, captions, and other options from YouTube and many other sites.

You can get it from GNOME Software by typing "Tube Converter," or you can grab it from [Flathub](https://flathub.org/apps/org.nickvision.tubeconverter). If you don't have Flathub installed, [click here](https://flatpak.org/setup/) and select your distribution.

Once you have it, you can get any video you'd like - pretty much anywhere!

![Tube Converter is super easy!](https://i.imgur.com/spacLPX.png)

## macOS and Windows

For macOS and Windows (also Linux if you want), you can use Open Video Downloader, also known as `youtube-dl-gui`, to download videos.

You can download the installer [for your system here](https://github.com/jely2002/youtube-dl-gui/releases/tag/v2.4.0).

Unfortunately, the app doesn't seem to support ARM Linux, so I can't show it off on my own computer. However, here's the official Windows Store screenshot!

![I know what video I'd put there...](https://i.imgur.com/xqQ9gUd.png)

## Android

On Android, I have two suggestions! One is for newer phones, but the other will run on pretty much anything that turns on.

### Seal

Seal is a modern, Material You wrapper for `yt-dlp` and `aria2c`. It should let you download pretty much anything you can think of! It has an easy-to-use UI and morphs its colors to your wallpaper, so it should look great on modern devices!

Most importantly, it has a Share button option. You can download any video as long as it can be shared, including on YouTube, but also with other social media apps like Twitter!

Here's how it looks:

![Woah, it's my favorite color! And your favorite color...](https://i.imgur.com/GG070Idl.png)

### dvd

`dvd` is another `yt-dlp` wrapper on Android. Unlike Seal, it eschews the fancy UI and options. Instead, you can click the search bar, paste your link in, and download one of the (many) size options. Also differing from Seal, it can run on Android 5.0 - that's from 2014!

It doesn't look great, and GUI options are limited (though you can always add your config values through the command line options setting). Even so, it'll run on pretty much anything.

It also has a Share button feature!

![When the world ends, dvd will be downloading videos.](https://i.imgur.com/e8mkQmAl.png)

## iOS

On iOS, apps that download from services like YouTube are not allowed on the Apple App Store (see the App Store Review Guidelines, [section 5.2.3](https://developer.apple.com/app-store/review/guidelines/#intellectual-property)). However, you are able to install a Shortcut that does this for you!

Tap here, then click "An _iOS shortcut_..." to install the script. When you want to download something, share it, then click the red `youtube-dl` icon in the listing.

While the script has been helpful at times, I've found that it tends to freeze often. (In fact, it froze when I took the screenshot below.) I suggest using the website instead.

![It's useful sometimes!](https://i.imgur.com/oH7nuxTl.jpg?1)

## Online

Finally, if no other options do, you can use the web interface! On iOS devices in particular, I prefer using a web interface instead.

The iOS Shortcut uses projectlounge's site underneath, so if you want, you can just paste links into their website instead! You can find [the website here](https://projectlounge.pw/ytdl).

It works great, and unlike many of the other websites, the person behind it has a clear path to sustaining their website. Donate to them [here](https://patreon.com/TheEssem)!

![It works pretty much anywhere..!](https://i.imgur.com/6UAB6vF.png)

## Conclusion

In general, if you need to download a video or song from YouTube, you can be sure that there's a way to do it! If you have any suggestions for additional applications, please feel free to email me: <contact@barretts.club>!
