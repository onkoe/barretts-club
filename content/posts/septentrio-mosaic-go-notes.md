+++
title = "My Thoughts on the Septentrio mosaic-Go (X5)"
description = "As a member of the Sooner Rover Team's leadership (which is a URC team)"
date = 2025-12-07
[taxonomies]
tags = ["gnss", "hardware", "urc", "rover"]
+++

I'm the Autonomous lead of [the Sooner Rover Team](https://ou.edu/soonerrover/)! We create a miniature Mars rover to compete at [the University Rover Challenge](https://urc.marssociety.org) each year!

Unfortunately, our previous GPS/GNSS receiver, the [Swift Piksi Multi](https://www.swiftnav.com/sites/default/files/piksi_multi_product_summary.pdf), randomly died in the middle of the night before Autonomous at last year's competiton. So, to avoid another 0 score, we had to look for replacements to use at this year's competition...

In our search, a signficant number of great options surfaced, with us primarily considering the [Septentrio mosaic-X5](https://www.septentrio.com/en/products/gnss-receivers/gnss-receiver-modules/mosaic-x5) and the [Unicore UM980](https://en.unicore.com/products/surveying-grade-gnss-um980/). Since the DigiKey variant of the Septentrio has a more resilient casing, and our budget didn't allow for a more rugged option, we opted to purchase the [Septentrio mosaic-Go Heading](https://www.digikey.com/en/product-highlight/s/septentrio/mosaic-go-heading-gnss-module-evaluation-kit), an evaluation kit with a great mounting solution and easy setup.

## Setup

When I say "easy setup", I mean **easy**:

- power it using the pins specified in the manual
- insert a micro-SD card
- plug in the TNC connector (which kinda looks like a TV's coaxial cable) to both the antenna and receiver
- finally, hook the USB-C cable directly into your computer.

On your computer, you'll get a new local network connection with an IP address similar to `192.168.3.k`. Replace `k` with `1`, like [`192.168.3.1`](https://192.168.3.1), to connect to the mosaic-Go's configuration web interface. It offers a number of available options, but, by default, the receiver is already configured to connect to and obtain information from available satellites, including GNSS.

## Checking if It Works

You can see if it works by checking the lights: if it's green, it booted correctly, but has not successfully gotten a fix. You want a blue or purple LED, which indicates that it's gotten a position fix and is ready to go!

When that happens, you'll see something like this on the web interface, in the GNSS > Satellites and Signals tab:

{{ cache_image(alt="A screenshot of the Septentrio mosaic-Go's web interface on the GNSS / Satellites and Signals tab. A sky plot is visible showing various satellites, and a decent overall quality score results. The antenna's position is available at the top of the screen.", link="images/septentrio-mosaic-go-notes/web_interface_gnss_satellites_and_signals.png", filetype="avif") }}

## Final Thoughts

The Septentrio mosaic-Go seems to be a great device so far! We (meaning me, an Autonomous/software lead, and Sam, one of the Electrical leads) were very impressed with its ease of setup, though we haven't gotten to test it for Autonomous navigation just yet.

It has some documentation, both for its underlying chip, and the development board itself, online. The PX4 docs were also pretty helpful for us. See: <https://github.com/PX4/PX4-user_guide/blob/main/tr/gps_compass/septentrio_mosaic-go.md>

If you have any questions about the device, please reach out!
