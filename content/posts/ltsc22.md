+++
title = "How to Install Windows 10 LTSC '22"
description = "Installing Windows 10 LTSC in 2022"
date = 2022-05-18
[taxonomies]
tags = ["windows", "gaming", "debloat", "rufus"]
+++

These days, many people talk about their computers coming with lots of _bloat_. Frankly, for most people, bloat hardly matters. When it comes to gaming, though, background processes start to matter - just a few frames more can change game outcomes. Windows 10 LTSC is a clean version of Windows 10 that comes without its extra utilities. To many, it feels like an update to Windows 7, and luckily, it runs like it.

In this article, you will learn how to install and setup Windows 10 LTSC 21H2 for low-end, old computers or new computers that you want to optimize.

**By the way, this article has images to help you out. Click underlined text to get more instructions on any given step.**

## What You'll Need

- A flash drive with a capacity of 16 GB or greater
- Another device to keep this article open
- A Windows or Linux computer to flash the installer - your current install **will** work
- Some time (probably an hour at most)

## Getting Started

To begin, you'll need to get a Windows 10 LTSC ISO from a reputable source. Until Microsoft provides official downloads for end users, I suggest using [this website](https://isofiles.bd581e55.workers.dev/Windows%2010/Windows%2010%20Enterprise%20LTSC%202021/). For most computers, you'll want to select _IoT LTSC_, the third option in the list. This version will provide you with ten years of security updates, so you won't need to upgrade for some time.

![Get this one](https://i.postimg.cc/13BWPh1w/image.png)

After you download this ISO, you'll want to install Rufus, a program we'll use to flash the Windows installer to your USB flash drive. To get the program, visit [the Rufus website](https://rufus.ie/en/) and click on the _Download_ button.

You might notice that there's no Linux or macOS downloads for this program. With these systems, you're just going to have to figure it out. On Linux, [Ventoy allows you to make a multiboot drive](https://www.ventoy.net/en/doc_start.html) in just a few minutes. These work with Windows ISOs as well. In my view, it's the easiest way to make a Windows USB on Linux. As for Mac, I don't have one to test on, but if you do, please [let me know](mailto:contact@barretts.club) about your experiences. I'd be happy to add any useful feedback here!

## Flashing the Installer

Anyways, back to Rufus! Flashing an ISO with Rufus takes just four steps. I'll leave that to the image and list below!

![The Rufus Steps](https://i.postimg.cc/3R1rFxsW-/image.png)

1. Under _Device_, click on your flash drive!
2. On _SELECT_, click on your downloaded ISO!
3. Keep everything else as-is!
4. Click _START_!

bonus step: wait

## Booting the Drive

Once the flashing process is complete, you can close Rufus and eject/remove your flash drive. With the flash drive plugged in, reboot your machine and open the boot menu. Different vendors use different keys, but you can [click here to find out](https://web.archive.org/web/20220518210154/https://guide.lauricella.eu/boot-from-cd-vendor-key-list/) the combination for your computer. Select your flash drive in the boot menu.

Once you've completed these steps, you should now be in the Windows 10 LTSC installer! It should look like the image below. If you're not there, try doing the last step again, but select a different drive in your boot menu.

![It should look like this!](https://i.postimg.cc/L8YR7T1t/IMG-20220518-190911-245.png)

## Installation

This will go a bit fast - prepare yourself! To continue, click _Next_ then _Install now_. If you see a box saying that you already have Windows installed, just allow the installer to continue. When prompted to input a product key, you can either enter one that you bought from the VLK network or hit [_I don't have a product key_](https://i.postimg.cc/MWgXWcZZ/Untitled1-20220518180729.png).

Next, you'll be asked which version of LTSC you'd like to install. I suggest [clicking IoT](https://archive.org/download/untitled-4-20220518181610/Untitled2_20220518181104.png) - it's only available as an English install, but will provide up to ten years of updates and support.

You'll now need to accept Microsoft's terms of service and other legal stuff to continue. If you agree, just check the box and [hit _Next_](https://i.postimg.cc/DZFTS3Y6/Untitled3-20220518181339.png).

Be careful on this step. **Ensure that you click _Custom: Install Windows only_**. You'll need to delete the existing partitions of the drive you want to install on - just don't remove data or other operating systems. Once you've done that, or if your drive is clean, [just hit _New_, _Apply_, then _Next_](https://i.postimg.cc/GhpbPr3S/Untitled5-20220518181716.png).

If you see a loading screen, then the installation has started. It may take some time - maybe grab a drink or watch a YouTube video while you wait. When it's done, though, allow the machine to restart. You'll get kicked onto the next step.

## Initial Setup

Congrats! If you see [a fancy setup screen](https://i.postimg.cc/GtmnjJRs/Untitled6-20220518181925.png), you're half-way done! Choose your language and keyboard layout, then _skip_ the second keyboard layout.

When you reach the sign-in screen, you'll be unable to sign in with a personal Microsoft account. This sign-in is for work or school accounts only. As such, [hit _Domain join instead_](https://i.postimg.cc/J0pMwYxq/Untitled8-20220518191019.png) at the bottom left. Next, [enter your user name](https://i.postimg.cc/x8fn4Vv8/Untitled9-20220518191127.png) in the box and hit _Next_. Finally, type a user password (or nothing) and click _Next_.

If you're asked to "Do more across devices with activity history," just select _No_ - you can't use Microsoft sync anyways. On the privacy settings slide, [disable ALL the switches](https://i.postimg.cc/vGBmf7cH/Untitled10-20220518191246.png).

If all of that went well, you'll now be asked to wait for some time, then you'll be dropped on the Windows desktop. It should look like a blank slate.

![Windows Desktop](https://i.postimg.cc/yN0K68nW/IMG-20220518-190847-999.png)

## All Done!

If you only wanted to install Windows and you already have a product key for LTSC, you don't need to read further. Otherwise, [continue on to our next article](/2022/06/02/debloat22/). You'll see how to activate your install and make your machine as fast as it can be!

This work is licensed under a [Creative Commons Attribution-ShareAlike 2.0 Generic License](http://creativecommons.org/licenses/by-sa/2.0/).
