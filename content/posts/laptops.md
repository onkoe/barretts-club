+++
title = "The Laptop List"
description = "This is a continually-updated list of laptops that I like!"
date = 2023-01-15
updated = 2024-06-08
[taxonomies]
tags = ["laptops", "linux", "macos", "windows"]
+++

When it comes to laptops, there are a lot of options. For me, a good laptop has:

- Good battery (80 Wh or higher)
- A 3:2/16:10 display with 350+ nits and a resolution of 1600p90 or higher
- 14-inch panel or weight under 3.75 lbs.
- A power-efficient (Ryzen/ARM/Intel Ultra) processor
- The ability to run Linux natively

It can be challenging to find laptops with these specs. Here's a list of those I've discovered in the vast sea of (primarily) low-battery machines! It's ordered in terms of how closely it matches my ideal specifications.

## My Pick

I'm currently using the [MacBook Pro M1](#mbp). I hope to find a replacement for this machine in the near future.

## Laptops

### [Apple MacBook Pro 14" (M3, 2023)](https://www.apple.com/shop/buy-mac/macbook-pro/14-inch) {#mbp}

I already own this machine! Unfortunately, its Linux Support isn't quite there yet. The Asahi Linux project [is working on it](https://github.com/AsahiLinux/docs/wiki/Feature-Support), though!

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: Only 70 Wh, but its mobile processor is efficient! </li>
    <li> {{spec_color(c="y", text="Display")}}: Almost perfect! It's 500 nits, over 1600p120, and has an aspect ratio of 16:10! </li>
        <ul><li>However, the notch can get in the way of some applications.</li></ul>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14.2 inches. 3.5 lbs. </li>
    <li> {{spec_color(c="g", text="Processor")}}: The M1 Pro (and later releases) is powerful, though its 16kb page size can confuse (read: `SEGFAULT`) some older applications. </li>
    <li> {{spec_color(c="r", text="Linux Support")}}: On-going work, primarily through the Asahi Linux project. </li>
        <ul>
            <li> Speakers now work! </li>
            <li> Graphics drivers are now able to [use OpenGL ES 3.1](https://asahilinux.org/2024/01/fedora-asahi-new/)! OpenGL 3.3 and ES 3.2 are still in progress, and some apps still experience graphical issues. </li>
            <li> Battery life is poor in my experience. I get around ~3 hours with the newest drivers. That's several times less than on macOS. </li>
        </ul>
</ul>

### [Lenovo ThinkPad P16s Gen 2 (AMD/Intel, 21K9001NUS/21HK0020US, 2023)](https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadp/thinkpad-p16s-gen-2-(16-inch-amd)-mobile-workstation/21k9001nus#reviews)

I'm pretty blown away by these little machines! If nothing else, they're in the running. You can take a look at [their spec sheet here](https://download.lenovo.com/pccbbs/mobiles_pdf/t14_gen4_p14s_gen4_t16_gen2_p16s_gen2_ug_en.pdf)!

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 86 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: 2400p60 at 400 nits, with HDR 500 support! </li>
        <ul>
            <li> I can hardly fault Lenovo for choosing 60 Hz with a 5k display. I'm leaving it green, but keep it in mind! </li>
            <li>I'd pick one up with a lower resolution, higher refresh rate screen.</li>
            </ul>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 16 inches. 3.76 lbs. </li>
    <li> {{spec_color(c="g", text="Processor")}}: Comes with the speedy, reliable 7840U. Alternatively, you can get one with an i7-1360P. That's also a great choice! </li>
    <li>
        {{spec_color(c="g", text="Linux Support")}}: While it's technically not 'officially' supported, Lenovo puts great care into choosing FOSS-friendly parts,
        [making Linux work flawlessly](https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadp/thinkpad-p16s-gen-2-(16-inch-amd)-mobile-workstation/21k9001nus#reviews)!
    </li>
</ul>

### [Star Labs StarFighter (Mk I, 2023)](https://us.starlabs.systems/pages/starfighter)

Star Labs also has a lot of goodwill from the open-source community. Their platform is entirely in-house, and I've heard great things about their machines!

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 85 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: Excellent panels, with an aspect ratio of 16:10 at either UHD+ (2400p60) or 1600p165. Both panels run at around 600 nits! </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 16 inches. 3.1 lbs. </li>
        <ul><li>Despite its panel size, the machine weighs just 3.1 lbs, letting it pass with a green light!</li></ul>
    <li> {{spec_color(c="g", text="Processor")}}: There's a wide range of processors! These include the 15W i3-1315U (not an option due to 16GB memory limits), 15W i7-1355U, 45W i9-13800H, and 45W Ryzen 7 7840HS.</li>
        <ul>
            <li>Of these options, I'd opt for the 1355U - a great Intel chip!</li>
            <li>[This website](https://laptoping.com/cpus/product/intel-core-i7-1355u/) explains the 1355U's basics. I really would LOVE a Ryzen 7 7730U instead, though!</li>
        </ul>
    <li> {{spec_color(c="g", text="Linux Support")}}: Fully supported by the manufacturer! No quirks are necessary. 😄 </li>
    <li> {{spec_color(c="r", text="Note")}}: After over a year, review units still haven't been sent out. This machine will release with out-of-date hardware. </li>
</ul>

### [Yoga Slim 7x, 14″ Snapdragon (14Q8X9, June 2024)](https://www.lenovo.com/us/en/p/laptops/yoga/yoga-slim-series/yoga-slim-7x-gen-9-(14-inch-snapdragon)/len101y0049)

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 70 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: 1840p90 at 500 nits. HDR support boasts up to 1,000 nits! 16:10 aspect ratio. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14.5 inches, 2.82 lbs. </li>
    <li> {{spec_color(c="g", text="Processor")}}: The Snapdragon X Elite X1E-78-100 is a gorgeous chip with the ARM performance per watt you're used to. </li>
    <li> {{spec_color(c="r", text="Linux support")}}: Unknown - see below. </li>
        <ul>
            <li> Snapdragon X Series processors aren't yet fully supported by Linux. Work is underway on [upstreaming support](https://www.qualcomm.com/developer/blog/2024/05/upstreaming-linux-kernel-support-for-the-snapdragon-x-elite). </li>
            <li> Support status isn't known for some system components. </li>
            <li> For example, users [have reported trouble](https://forums.linuxmint.com/viewtopic.php?t=397770) with past Slim 7 machines. </li>
            <li> The wireless card is suspect, as [the specifications reference](https://psref.lenovo.com/syspool/Sys/PDF/Yoga/Yoga_Slim_7_14Q8X9/Yoga_Slim_7_14Q8X9_Spec.pdf) doesn't mention it. </li>
            <li> Expect this machine to quickly climb the list if full support is confirmed! </li>
        </ul>
</ul>

### [TUXEDO Stellaris Slim 15 (Gen6, 2024)](https://www.tuxedocomputers.com/en/TUXEDO-Stellaris-Slim-15-Gen6-AMD.tuxedo)

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 1600p240 at 500 nits; 16:10 aspect ratio. </li>
    <li> {{spec_color(c="r", text="Panel Size/Weight")}}: At 4.62 lb, this 15 inch machine is too heavy for my preferences. It's likely made heavier by its large dedicated GPU and respective cooling. </li>
    <li> {{spec_color(c="g", text="Processor")}}: AMD's Ryzen 7 8845HS is both powerful and efficient. It does have a TDP of 35 W, but online tests indicate serious efficiency. </li>
    <li> {{spec_color(c="g", text="Linux support")}}: TUXEDO fully supports Linux! </li>
</ul>

### [Framework Laptop 13.5" (2024)](https://frame.work/products/laptop-diy-13-gen-amd)

I adore this machine in almost every way, but its battery is too small.

<ul>
    <li> {{spec_color(c="r", text="Battery")}}: 61wh is too low for the hardware. </li>
    <li> {{spec_color(c="g", text="Display")}}: 1920p120 at 3:2, running at 500 nits. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 13.5 inches. 2.87 lbs. </li>
    <li> {{spec_color(c="g", text="Processor")}}: The Ryzen 5 7640U and 7 7840U are both great chips! </li>
    <li> {{spec_color(c="g", text="Linux support")}}: Officially supported! </li>
</ul>

### [LG Gram 17" (17Z90R-K.ADS9U1, 2023)](https://www.lg.com/us/laptops/lg-17z90r-k.ads9u1-gram-laptop)

Woah, what a name! This LG Gram model is both huge and tiny. I'm considering picking one up due to its specs and battery, though I'm still waiting on more Linux-friendly hardware.

You can take a look at [its spec sheet here]((https://files.bbystatic.com/yRSJPxodWR42ufQ7kzs6xQ%3D%3D/Specification%2BSheet))!

<ul>
    <li> {{spec_color(c="y", text="Battery")}}: 80 Wh </li>
    <li> {{spec_color(c="y", text="Display")}}: 1600p60 at 350 nits, with a nice aspect ratio of 16:10! </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 17" (huge)! However, it's just 3 lbs. </li>
        <ul><li>At its weight, there's not much of a weight trade-off here!</li></ul>
    <li> {{spec_color(c="y", text="Processor")}}: Intel's i7-1360P looks great, though its TDP is still a tad above competing Ryzen CPUs. </li>
        <ul><li>For example, the 7840U beats it in almost every way - and still uses less power!</li></ul>
    <li> {{spec_color(c="r", text="Linux Support")}}: Ships with unsupported hardware. </li>
        <ul>
            <li>The speakers don't seem to work due to the Realtek ALC298 codec chip [lacking Linux Support from Realtek](https://bugs.launchpad.net/ubuntu/+source/alsa-driver/+bug/2011385).</li>
            <li>
                There does appear to be [a janky workaround](https://forums.fedoraforum.org/showthread.php?331130-Fixing-ALC298-audio-(no-sound-from-speakers)), though I don't know how much
                I can recommend it personally. That linked repo's README warns of ["funny smells"](https://github.com/joshuagrisham/galaxy-book2-pro-linux/tree/main#sound) - that's a no from me..!
            </li>
        </ul>
</ul>

The [`16Z90R-K.ADB9U1`](https://linux-hardware.org/?probe=d3a9e05559) and [`14Z90RS-K.ADW9U1`](https://forums.debian.net/viewtopic.php?t=154677) are much the same! I hope to see LG dropping this cursed audio chip in the future.

### [Slimbook Excalibur (2024)](https://slimbook.com/en/excalibur)

This machine looks fantastic, but it suffers from a couple flaws. Its CPU is a bit too strong, and a larger battery would make it much more considerable. At around 4 lbs, the machine is also pretty heavy.

<ul>
    <li> {{spec_color(c="y", text="Battery")}}: 67 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: 1600p165 at 400 nits! </li>
    <li> {{spec_color(c="y", text="Panel Size/Weight")}}: At 16 inches, a weight of 4.1 lbs leaves the machine feeling kinda unportable. </li>
    <li> {{spec_color(c="g", text="Processor")}}: The Ryzen 7 7840HS is power-hungry with a TDP of 35W, though a larger battery would make this issue less severe. I'll leave it green for now. </li>
    <li> {{spec_color(c="g", text="Linux support")}}: Slimbook happily supports Linux on their machines! </li>
</ul>

### [Framework Laptop 16" (2023)](https://frame.work/laptop-16)

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 85 Wh. </li>
    <li> {{spec_color(c="y", text="Display")}}: Perfect! 1600p165 at 16:10, running at 500 nits. </li>
    <li> {{spec_color(c="r", text="Panel Size/Weight")}}: Too big - 16 inches. </li>
        <ul><li> Pretty hefty, too: it's 4.63 lbs with integrated graphics and 6.39 lbs with a dedicated card! 😱 </li></ul>
        <ul><li>Modularity is great, but you often pay a price. In this case, making the laptop lighter is genuinely difficult.</li></ul>
    <li> {{spec_color(c="y", text="Processor")}}: Uses either the Ryzen 7 7840HS or the Ryzen 9 7940HS. Both are decent options but sit with a TDP of 45W, which is a bit high. </li>
        <ul><li>There is also a discrete GPU option with the RX 7700S. More Linux laptops with AMD GPUs, please!!! 🥰</li></ul>
    <li> {{spec_color(c="g", text="Linux Support")}}: These machines are effectively made for Linux! So... yes! </li>
</ul>

### [Dell XPS 14 (9440, 2024)](https://dell.com/en-us/shop/laptops/new-xps-14-laptop/spd/xps-14-9440-laptop/usexchcto9440mtl01)

<ul>
    <li> {{spec_color(c="y", text="Battery")}}: 70 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10 at 400s nits with a resolution of 2000p120. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 3.8 lbs, but this may be with a dedicated GPU. Additional details aren't given. </li>
    <li> {{spec_color(c="g", text="Processor")}}: The Intel Ultra 7 155H isn't bad, but with a TDP of 28W, I'd still prefer a Ryzen chip. </li>
    <li> {{spec_color(c="y", text="Linux Support")}}: No guarentees are given by Dell, and I couldn't find a `linux-hardware` report. Here's a mini-list of important parts from [the datasheet](https://www.dell.com/support/manuals/en-us/xps-14-9440-laptop/xps-14-9440-owners-manual/specifications-of-xps-14-9440)! </li>
        <ul>
            <li>🔈 Cirrus Logic CS42L43: support gained with kernel 6.6.</li>
            <li>🛜 AX211: well-supported in Linux!</li>
            <li>⌨️ Keyboard: Touchbar compatibility isn't known. Be careful on Linux.</li>
        </ul>
</ul>

### [ASUS Zenbook 14 OLED (UM3402, 2023)](https://www.asus.com/us/laptops/for-home/zenbook/zenbook-14-oled-um3402/where-to-buy/)

My friend got one of these, so here's a mini-review!

- Processor:

<ul>
    <li> {{spec_color(c="y", text="Battery")}}: 75 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: It's a 16:10 panel at a resolution of 1800p90 - that's pretty good. It outputs 550 nits, which is excellent! </li>
        <ul>
            <li>Unfortunately, the panel has these weird diagonal lines across the screen. It's particularly noticeable in darker colors, like deep purple or blue.</li>
            <li>However, the color is NICE - it looks better than my MBP 14" M1 Pro.</li>
        </ul>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 3.1 lbs. </li>
    <li> {{spec_color(c="g", text="Processor")}}: Pick between a Ryzen 5 7530U and a Ryzen 7 7730U - both will perform great! </li>
        <ul><li>Heads up: this system only supports up to 16 GiB of memory - and it's soldered!</li></ul>
    <li> {{spec_color(c="r", text="Linux Support")}}: Ships with some 'shaky' hardware. </li>
        <ul>
            <li>Using anything before kernel 6.5, your wireless drivers will act up often.</li>
            <li>Some distros require an ACPI configuration file to get sound working. [Someone described the fixes needed here](https://github.com/farfaaa/asus_zenbook_UM3402YA#sound-fix)!</li>
            <li>The touchpad's fake number pad needs a driver to be enabled, but some users are happy to see it gone... 😅</li>
        </ul>
</ul>

### [Dell Inspiron 16 Plus 7630 (Iris, P125F004, 2023)](https://www.dell.com/en-us/shop/dell-laptops/inspiron-16-plus-laptop/spd/inspiron-16-7630-laptop/useichbts7630glcx)

This machine is heavy and features a legacy Intel CPU. You can see [its specification sheet here](https://dl.dell.com/content/manual26258980-inspiron-16-plus-7630-owner-s-manual-nvidia-geforce-rtx-3050-4050-and-intel-graphics.pdf?language=en-us).

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 86 Wh. </li>
    <li> {{spec_color(c="y", text="Display")}}: 1600p60 at 300 nits. </li>
    <li> {{spec_color(c="y", text="Panel Size/Weight")}}: 16 inches. 4.69 lb. </li>
    <li> {{spec_color(c="r", text="Processor")}}: The i7-13700H is inefficient, despite its TDP of 35W. </li>
    <li> {{spec_color(c="g", text="Linux Support")}}: Many users online [report](https://old.reddit.com/r/linuxhardware/comments/137ddzz/dell_inspiron_16_plus_7630/k45m2l1/) that it works without a hassle! </li>
</ul>

### Based on Tong-Fang's ID4H1

Several laptops on this list base themselves on a fancy Tong-Fang platform. Though some have specific adaptations for their intended audience, they're all Intel.

AMD adaptations existed in the past, particularly before the coronavirus.

**note: These are outside of the sorting. I wouldn't get any of them due to outdated internals and a general lack of support.**

#### [SLIMBOOK Executive 14 (2023)](https://slimbook.es/en/executive-en)

I would love an AMD version of this machine in particular! The open-source community has a deep relationship with SLIMBOOK.

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10 at 400 nits. The resolution is 1800p90. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 2.8 lbs. </li>
    <li> {{spec_color(c="y", text="Processor")}}: 13000H. 35W TDP. </li>
    <li> {{spec_color(c="g", text="Linux Support")}}: Yup! </li>
    <li> {{spec_color(c="g", text="Note")}}: offers ANSI keyboard support! 🎉 </li>
</ul>

#### [TUXEDO InfinityBook Pro 14 (Gen 8, 2023)](https://www.tuxedocomputers.com/en/TUXEDO-InfinityBook-Pro-14-Gen8.tuxedo)

So far, this is my favorite of all these platformed machines. A Ryzen version would be the perfect laptop, in my view. The Coreboot support is also notable!

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10 at 1800p90, with 400 nits of power! </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 2.87 lbs. </li>
    <li> {{spec_color(c="y", text="Processor")}}: 13700H is more than I need with its 35W TDP. </li>
    <li> {{spec_color(c="g", text="Linux Support")}}: Officially supported! </li>
    <li> {{spec_color(c="y", text="Note")}}: No ANSI keyboard options. </li>
</ul>

#### [SKIKK Green 5 (GREEN5, 2023)](https://www.skikk.eu/en/laptops/green)

This laptop is another generic example of the previous machines. However, they plant a tree when you buy a computer, so that's pretty cool. They also give you a choice of thermal paste during assembly - that's unique! I'd like to see a Ryzen processor and an ANSI keyboard for this to become the "prime option."

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10 aspect ratio at 1800p90. 400 nits. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 2.8 lbs. </li>
    <li> {{spec_color(c="y", text="Processor")}}: The 13700H is a bit too powerful (35W TDP). </li>
    <li> {{spec_color(c="y", text="Linux Support")}}: I wasn't able to find information about this machine's Linux capabilities. If you own it - or know someone who does - please [let me know](mailto:contact@barretts.club)! </li>
        <ul><li>The product page states that Skikk does "not provide support on Linux."</li></ul>
    <li> {{spec_color(c="y", text="Note")}}: Americans will be displeased by the lack of ANSI keyboard options. </li>
</ul>

#### [MALIBAL Aon S1](https://www.malibal.com/shop/laptops/aon-s1/)

My main issues with this machine come from its internals. In particular, the required RTX card makes it a difficult sell.

<ul>
    <li> {{spec_color(c="y", text="Battery")}}: 99 Wh. </li>
        <ul><li>It's only okay due to its required RTX 3050. </li></ul>
    <li> {{spec_color(c="g", text="Display")}}: It's got a 16:10 aspect ratio at 1800p90. 400 nits. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches, 2.8 lbs. </li>
    <li> {{spec_color(c="y", text="Processor")}}: Intel Core i7 13700H. 35W TDP. </li>
    <li> {{spec_color(c="y", text="Linux Support")}}: Fully supported. </li>
        <ul>
            <li>It does include an NVIDIA card. Look out if you're worried about that!</li>
        </ul>
    <li> {{spec_color(c="g", text="Note")}}: Includes an ANSI keyboard option. However, that's the *only* option! International users beware. </li>
</ul>

#### [SCHENKER Vision 14 (M23, 2023)](https://www.schenker-tech.de/en/schenker-vision-14-m23/)

This machine is SCHENKER's replacement for the E22. Sadly, it still lacks an ANSI keyboard offering!

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10. 380 nits. 1800p90. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 2.4 lbs. </li>
    <li> {{spec_color(c="y", text="Processor")}}: 13700H (35W). </li>
    <li> {{spec_color(c="g", text="Linux Support")}}: Linux unmentioned. Parts seem to be compatible, though! </li>
    <li> {{spec_color(c="g", text="Note")}}: no ANSI keyboard options! </li>
</ul>

#### [Monster Notebook Huma H4 (v4.2.5, 2023)](https://www.monsternotebook.com.tr/huma/monster-huma-h4-v4-2-5-gumus/)

These are exciting machines mainly due to Monster's guarantees: you may return your machine at any time if a game doesn't run, and the company currently offers lifetime maintenance and warranty to its buyers!

It also announced plans to [expand to the United States](https://www.pcmag.com/news/turkeys-monster-notebook-looks-to-do-battle-with-us-laptop-makers) soon! This laptop isn't perfect for my standards, but its lower-power chip and support match up.

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10 aspect ratio with a resolution of 1800p90.  </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 2.7 lbs. </li>
    <li> {{spec_color(c="g", text="Processor")}}: The i7-1360P is way more efficient than the other Tang-Fong-based machines on this list. This little chip should save a lot of energy! </li>
    <li> {{spec_color(c="y", text="Linux Support")}}: No information is currently available. [Please let me know](mailto:contact@barretts.club) if you have this machine! </li>
        <ul>
            <li> {{spec_color(c="r", text="Warning")}}: This machine uses Nahimic Audio, which comes with the risk of encountering the Realtek ALC3306 or similar chips. Please [contact me](mailto:contact@barretts.club) if you're aware of any audio compatibility issues. </li>
            <li> {{spec_color(c="r", text="Warning")}}: Two HUMA H4 V5.2 computers reported that the Realtek ALC269VB was in use. These chips can require [some quirks/configurations](https://unix.stackexchange.com/questions/766434/bluetooth-and-sound-not-working) to get running correctly. </li>
        </ul>
</ul>

## Discontinued or Outdated Machines

### [SLIMBOOK ProX 15" (2022)](https://slimbook.com/en/prox)

Unfortunately, this laptop has been left "out of stock with no availability date." In other words, SLIMBOOK has discontinued it!

Still, it has some excellent specs and fits the list reasonably well!

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 97 Wh! </li>
    <li> {{spec_color(c="y", text="Display")}}: A bit lower-spec'd. 1440p165 at 350 nits. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 15 inches. 3.3 lbs. </li>
        <ul><li>At its weight, the laptop is plenty portable.</li></ul>
    <li> {{spec_color(c="g", text="Processor")}}: The 5700U is perfect for this use case! </li>
    <li> {{spec_color(c="g", text="Linux Support")}}: Given that it's SLIMBOOK... yup! 😄 </li>
</ul>

### [SCHENKER Vision 14 (E22, 2022)](https://www.schenker-tech.de/en/schenker-vision-14-e22/)

This machine is SCHENKER's generic version of the ID4H1. It has no notable differences from the others. You have to get it from a site called `bestware.com`. I also don't see an ANSI keyboard option. :p

SCHENKER left Linux Support unmentioned on their website. That may be worth considering for manufacturer support.

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 99 Wh! </li>
    <li> {{spec_color(c="g", text="Display")}}: 16:10 at 380 nits with a resolution of 1800p90. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14 inches. 2.4 lbs (without dedicated GPU). </li>
    <li> {{spec_color(c="y", text="Processor")}}: 13000H. 35W TDP. 😖 </li>
    <li> {{spec_color(c="y", text="Linux Support")}}: Unknown! Please [let me know](mailto:contact@barretts.club) if you have any information! </li>
    <li> {{spec_color(c="y", text="Note")}}: Lacks ANSI keyboard options. </li>
</ul>

### [SCHENKER VIA 15 Pro (M22, 2022)](https://www.schenker-tech.de/en/schenker-via-15-pro-m22/)

I'd love this machine with a better display.

<ul>
    <li> {{spec_color(c="g", text="Battery")}}: 91 Wh! </li>
    <li> {{spec_color(c="r", text="Display")}}: Not ideal. It's 16:9 at 1440p165, and 300 nits is too dark in some outdoor settings. </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 15 inches. 3.2 lbs. </li>
        <ul><li>With its weight, though, this machine is still lighter than my 14" MBP!</li></ul>
    <li> {{spec_color(c="g", text="Processor")}}: Includes a 5700U, which is plenty efficient! </li>
    <li> {{spec_color(c="g", text="Linux Support")}}: Not officially supported, but the online consensus is that it works fine. </li>
</ul>

This machine has a great design, but some parts of the device are outdated or locked down. An updated version using common parts would be great!

### [ASUS Vivobook S 14X OLED (M5402RA, 2022)](https://www.asus.com/laptops/for-home/vivobook/vivobook-s-14x-oled-m5402-amd-ryzen-6000-series/)

<ul>
    <li> {{spec_color(c="y", text="Battery")}}: 70 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: Perfect! 1800p120 at 16:10, running at 600 nits! </li>
    <li> {{spec_color(c="g", text="Panel Size/Weight")}}: 14.5 inches. 3.53 lbs. </li>
    <li> {{spec_color(c="y", text="Processor")}}: Great, but the beefier 6800H/HS, and especially the 6900HX, are way above anything I need. They may also take more power when running above idle than other efficient chips. </li>
    <li> {{spec_color(c="y", text="Linux Support")}}: Ships with some shaky hardware. </li>
        <ul><li>Needs [a few tweaks](https://wiki.archlinux.org/title/ASUS_M5402), but they're nothing too crazy.</li></ul>
</ul>

I like this machine, but want a version with a less beefy CPU.

### [Microsoft Surface Laptop Studio (A1Y-00001, 2021)](https://www.microsoft.com/en-us/d/surface-laptop-studio/8srdf62swkpf)

I used this for a few weeks and got a good feel for its Linux Support. Take a look below!

<ul>
    <li> {{spec_color(c="r", text="Battery")}}: Not ideal - 58 Wh. </li>
    <li> {{spec_color(c="g", text="Display")}}: 3:2 at 1600p120, running at around 500 nits. </li>
    <li> {{spec_color(c="y", text="Panel Size/Weight")}}: 14.4 inches. 3.8 (i5) or 4 (i7) lbs. </li>
    <li> {{spec_color(c="r", text="Processor")}}: Not ideal. The i5-11300H and i7-11370H are both quad-core processors, showing their age. </li>
        <ul><li>Power usage is nice on these older chips, though!</li></ul>
    <li> {{spec_color(c="y", text="Linux Support")}}: Mostly works with lots of setup. </li>
        <ul><li>Practically everyone uses [Surface Linux](https://github.com/linux-surface/linux-surface/wiki/Supported-Devices-and-Features#feature-matrix) to avoid time-consuming manual setup.</li></ul>
</ul>

I'd love one of these machines with a low-power Ryzen, such as the 7840U. Shaving some weight off would be nice, too!

## Conclusion

Do you see a laptop that fits these specs and isn't on the list? Please let me know [via email](mailto:contact@barretts.club) or [with a GitHub issue](https://github.com/onkoe/barretts-club/issues/new)! :)
