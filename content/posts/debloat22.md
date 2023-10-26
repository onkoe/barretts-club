+++
title = "Debloating Windows 10 LTSC"
description = "Learn how to activate, debloat, and secure your Windows 10 LTSC system!"
date = 2022-06-02
[taxonomies]
tags = ["windows", "gaming", "debloat", "kms", "ltsc"]
+++

[In our previous article](/2022/05/18/ltsc22/), you learned how to prime installation media and properly install Windows 10 LTSC on your computer. This time around, you'll learn how to setup your LTSC system for maximum gaming performance. We'll install the Scoop package manager for app security, activate the OS with KMS, and safely strip the system of some extras. 

# Installing Firefox
Before we can focus on the rest of the system, your installation needs to be activated. We'll need a modern browser to do this, and Edge won't let you download the activation tool. 

As such, we'll install Firefox. Download and open the installer using [this link](https://www.mozilla.org/en-US/firefox/new/), then follow the on-screen instructions. Optionally, you can install uBlock Origin for content blocking - some pages may have confusing download advertisements. Just [click here](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/), then click _Add_!

##### It doesn't look like much, but UBO will save you a lot of trouble...

Now that you have Firefox, you can continue with the installation. 

# Activating Windows 10 LTSC

For most people, LTSC product keys are quite difficult to obtain legally. If you can get one through a company or an online store, that's great! However, almost everyone will end up using KMS, an open source activation script for Windows 7 and above. You should keep in mind that use of this software could break the law in some jurisdictions - use at your own risk! 

Installing KMS is simple. [Go to its GitHub link](https://raw.githubusercontent.com/abbodi1406/KMS_VL_ALL_AIO/master/KMS_VL_ALL_AIO.cmd), then press Ctrl + S to save it. If Windows Defender pops up, you can allow the script to stay - Microsoft doesn't like it when you try to activate their products like this.

Finally, you can run the script by double clicking on it. When you do so, Windows will try to scare you with a red warning box. If you think it'll be okay, click _More info_, then _run anyway_. 

When KMS starts, it'll ask you to select one of a few options. Press _2_ on your keyboard to install the auto-renewing license - your system will be activated forever. When it's done, press _0_ to escape.

##### KMS makes you feel like someone in Mr. Robot...

Your installation should be [activated now](https://archive.org/download/screenshot-from-2022-05-20-10-18-33/Screenshot%20from%202022-05-20%2010-18-33.png)! 

# Tweaking Your System
Windows 10 LTSC is relatively clean in comparison to most Windows versions, but you'll probably still want to remove some of the background telemetry and data collection. You can do this with two tools. Install the first, Winaero Tweaker, [using this link](https://winaerotweaker.com/download/) . 

When it's done, it'll appear in your Start menu. Go ahead and launch it. To continue, hit _I AGREE_ to their license, then allow it superuser permissions. At the top left, you'll [see a search bar](https://archive.org/download/2022-06-02-13-11-1/2022-06-02_13-11_1.png). Search for the following settings and check their boxes: 
- Ads and Unwanted Apps
	- Disable ads in Windows 10
	- Ensure everything below it is checked as well
- Error Reporting
	- Disable Error Reporting
- Power Throttling
	- Disable Power Throttling (FOR DESKTOP PCs ONLY!)
- Disable Action Center
- Disable Live Tiles
- Disable Web Search
	- Disable web search and taskbar and Cortana
- Disable Telemetry
	- Disable telemetry and data collection
- Activate Windows Photo Viewer
	- Click Activate Windows Photo Viewer

After you've finished all of these, restart your computer and return to this article. 

# Removing Remaining Telemetry

The next tool we'll use is called WPD. You'll have to install and run it manually. [Get it from this link!](https://wpd.app/get/latest.zip) Extract the folder, then run WPD.exe. Under the Telemetry option, just hit _Disable_. WPD will automatically diasable telemetry and tracking settings to reduce background processes. 

# All Done!

Congratulations! You now have a fully-activated Windows 10 LTSC system that is ready for competitive gaming! 

This work is licensed under a [Creative Commons Attribution-ShareAlike 2.0 Generic License](http://creativecommons.org/licenses/by-sa/2.0/).
