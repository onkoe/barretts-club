+++
title = "How to Download Meta Quest APKs from the Quest Store"
description = "Sometimes, you want the APKs themselves. And you can do it!"
date = 2025-04-06
[taxonomies]
tags = ["VR", "XR", "Oculus", "Meta"]
+++

I'll keep this one short and sweet. We're going to download APKs of games/apps from the Oculus (Meta) Quest store.

This process allows you to update your (standalone) Oculus apps without an internet connection! If you're trying to avoid updates, telemetry, or unwanted automatic updates on your other installed experiences, you can use the APKs instead!

Note that, for paid apps and games, you'll need to own them (have bought them on your account) before downloading them as APK files.

## Step 1: Logging In

Please log in with your Meta account in the [Meta Developer Hub](https://developers.meta.com), previously Oculus Developer Hub ("ODH").

You might need a developer account. To get one, just log in with your typical Oculus account, and when it asks you to become a developer, tick all the little agreement boxes.

## Step 2: Grabbing a Cookie

Great, you're signed in on ODH! You now need to yoink the access token on the website.

note: the following is for Firefox. you may follow similar steps on Chromium-based browsers, but I'm not going to install one just for this.

Press F12 (or Ctrl+Shift+I) on your keyboard to open the Web Developer Tools. Alternatively, press the hamburger menu in the top right of Firefox, then hit More tools, and "Web Developer Tools." You'll get a big list of nerdy stuff. Drag its inner edge into the browser window to make it big.

Click the "Storage" tab on the top of the Web Developer Tools sidebar. On the left listing, click "Cookies," then `https://developers.meta.com`. In the list of junk, look for `oc_ac_at` under the "Name" column, then copy the random nonsense next to it (under the "Value" column).

**It should either start with `FRL` or `OCA`.**

## Step 3: Finding the App Version ID

You've got your authentication key! The last thing you need is the app's version ID.

There are several ways to find this. Currently, the [OculusDB website](https://oculusdb.rui2015.me/search?query=virtual%20desktop) provides an easy way to see the version number to ID mappings. Click "details" on the listing, then navigate to the "Versions" tab.

Find the version you want and expand the green arrow button. Copy its big number under the "Id" field. For example, Virtual Desktop 1.33.4 has version ID `9246433715399698`.

## Step 4: Download the App

You're all done with the nonsense! We've just got one last step. Replace these two fields in the link below:

- `<USER_AUTH>`: `OCAabcVeryLongAbcdefghijklmnopqrstuvwxyz`
  - This is the authentication key we got from ODH!
- `<VERSION_ID>`: `9246433715399698`
  - And we got this from the version number.

So, `https://securecdn.oculus.com/binaries/download/?id=<VERSION_ID>&access_token=<USER_AUTH>` will become...

```
https://securecdn.oculus.com/binaries/download/?id=9246433715399698&access_token=OCAabcVeryLongAbcdefghijklmnopqrstuvwxyz
```

Click the link to download the app, and we're done! :D

You can install the APK using [SideQuest](https://sidequestvr.com/setup-howto#app-setup-howto) or [`adb`](https://developer.android.com/tools/releases/platform-tools). Please see their documentation for instructions.
