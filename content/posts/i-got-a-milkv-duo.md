+++
title = "I Got a Milk-V Duo (and It’s Running Rust)"
description = "This is a scary new hobby... 🤤️"
date = 2023-11-06
updated = 2023-11-10
[taxonomies]
tags = ["rust", "linux", "risc-v", "milk-v", "duo", "embedded"]
+++

I've always been interested in computer engineering, but previously, I had yet to learn how to get into it all. Luckily for me, Milk-V recently went off, creating [several new RISC-V products](https://milkv.io/)!

These boards are perfect for me! They:

- aren't too expensive,
- use new and freaky technology, and
- can serve valuable purposes for me!

Since I was already looking for some development boards, these came at a perfect time! I went to [their (only) distributor](https://arace.tech/products/milk-v-duo) that ships to the United States and picked up a Milk-V Duo!

Well, I didn't pick it up - they shipped it! Remember that while the boards are $5, the shipping is $12! If you plan to pick one up, grab many! They're cheap enough not to be a worry there, but if one breaks, you won't have to agonize over more shipping!

I'd also grab some of these [headers](https://amzn.to/3Mw5tMW) (affiliate link btw). I haven't had any trouble with them, and you get enough for any future boards you pick up!

## Backstory

Anyway, it arrived after just over a week, arriving in one of the tiniest boxes I've ever received... or held!

{{ cache_image(alt="a text convo with my friend, Leo. i sent him a photo of the tiny box and said 'ITS SO CUTE!' he replied with 'BRO' followed by a couple of stonehenge emojis.", link="/images/i-got-a-milkv-duo/tiny.webp", filetype="webp") }}

As [Milk-V's site](https://milkv.io/duo) says, the Duo is packing down there! It has two [C906 cores](https://www.cnx-software.com/2020/11/09/xuantie-c906-based-allwinner-risc-v-processor-to-power-12-linux-sbcs/) (one for Linux and another for FreeRTOS). The board also has a balmy 64MB of memory and includes a CVITEK TPU - marketed as an "AI acceleration engine... *shudders*. I'm not sure if Google would appreciate their name either, but because it can run [YOLO](https://milkv.io/docs/duo/application-development/tpu/tpu-yolov5) and even a limited [OpenCV](https://milkv.io/docs/duo/resources/opencv-mobile), I'm not particularly concerned!

Regarding its capabilities, we can use the Raspberry Pi as a mediator. Here, the Duo takes a comfy seat between the Pi Pico and Zero. Like the Pico, this board eschews desktop integration for a better development experience, relying on a USB-C connection for communication. As it turns out, you can plug and play on Linux, though Windows and macOS [require some setup](https://milkv.io/docs/duo/getting-started/setup), as usual.

You'll also need to stick their Linux Buildroot image [on a microSD card](https://milkv.io/docs/duo/getting-started/boot), which takes just a few minutes.

After it's all working, though, you can easily talk to it with an SSH command: `ssh root@192.168.42.1`.

After that, you'll have a nice `ash` shell at your disposal! Naturally, I immediately imagined how I could use the thing.

At my university, I work on some engineering competition teams, including a Formula SAE team and a URC robotics team.

Both utilize microcontrollers lavishly, and we've traditionally programmed them in either C or Python. However, everyone's been looking at other options, and Rust is something I've been interested in! So I bought one!

However, I had a lot of (very minor) difficulties. First, the microSD card didn't automatically expand, so I wrote [an article](@/posts/milkv-duo-expand-fs.md) about it! The default Buildroot image also reserves about HALF of the board's memory for the official Milk-V Camera, even if you don't have it. So... you need to remove the restriction by recompiling the Buildroot with different memory parameters. A [nice forum post](https://community.milkv.io/t/memory-size/223) explains how in about two lines. (thanks!)

Even after those things, though, the biggest challenge is the C toolchain: Milk-V currently uses `musl` over `gnu` for their `libc`. That's important for one reason - Rust gives `riscv64gc-unknown-linux-gnu` a [tier 2 status (with host tools)](https://doc.rust-lang.org/rustc/platform-support.html#tier-2-with-host-tools) but leaves `riscv64gc-unknown-linux-musl` in [tier 3](https://doc.rust-lang.org/rustc/platform-support.html#tier-3)!

That means that `gnu` targets can scoot by without compiling the kernel - they only need to run: `rustup +nightly target add riscv64gc-unknown-linux-gnu`. They still have some configuration to do, but it's a little easier than what we need to do! Let's go over it!

## Setup

There are a few stages to setting up cross-compilation for our little Duo. Before we can even touch Rust, though, we'll need a `gcc` toolchain that works with `riscv64gc-unknown-linux-musl` platforms.

Let's start with that!

### The Toolchain

Depending on your machine, this step is either incredibly easy or mind-numbingly tedious.

I'll start with the [Golden Girls](https://en.wikipedia.org/wiki/The_Golden_Girls) of this blog post - if you have an x86_64 Linux machine, you can download [this `musl` archive](https://toolchains.bootlin.com/releases_riscv64-lp64d.html) and extract it to `/opt/riscv-musl` (or some other location). Lucky!

Otherwise, you'll need to compile it yourself! I was on an Asahi Linux MacBook for this project, so I compiled everything for `aarch64`. I could use my desktop, but it's nice to have everything nearby! Let's go on a journey...

First of all, there's a project on GitHub called the [RISC-V GNU Compiler Toolchain](https://github.com/riscv-collab/riscv-gnu-toolchain). These folks created a cross-compiler for RISC-V targets.

The official Milk-V repo uses them, but we're beyond that. Another community member [created a Buildroot](https://github.com/kinsamanka/milkv-buildroot) you can run on your board and as a cross-compiler.

#### Compiling the Toolchain

Before you do anything, make sure to install all dependencies on your computer:

- Fedora: `sudo dnf install autoconf automake bc bison bzip2 cpio file flex gcc gcc-c++ openssl-devel ncurses-devel patchutils perl-core rsync tar unzip wget which -y`
- Ubuntu/Debian: `sudo apt update && sudo apt install bc bison build-essential flex libssl-dev unzip`

Now, you can grab the `git` repo using `git clone https://github.com/kinsamanka/milkv-buildroot.git`.

After it's done cloning, you can run:

```console
barrett@canopy ~/D/milkv-buildroot (master)> bash -c "make O=$(pwd)/build milkv_duo_defconfig"
barrett@canopy ~/D/milkv-buildroot (master)> cd sdk
barrett@canopy ~/D/milkv-buildroot (master)> make sdk
...
```

Grab a cup of tea - this will take a while! On my MacBook Pro, compiling the buildroot and toolchain took around 40 minutes of HEAT! After it finishes compiling, though, we can start the Rust stuff!

Before we do anything else, please make sure your machine has the Nightly toolchain: `rustup toolchain install nightly --allow-downgrade -c rustfmt clippy`

I did sneak in Clippy. How could I not do that? It's so helpful! [*ahem*](https://users.rust-lang.org/t/how-to-use-clippy-in-vs-code-with-rust-analyzer/41881)

### Cargo

Let's create a sample project to test our progress!

```console
barrett@canopy ~/Downloads> cargo new farts-testing-farts
     Created binary (application) `farts-testing-farts` package
barrett@canopy ~/Downloads> 
```

We'll also add some complex dependencies to make sure all is well:

```console
barrett@canopy ~/D/farts-testing-farts (main)> cargo add anyhow tokio tracing tracing-subscriber --features=tokio/rt,tokio/macros,tracing/async-await
```

Great, now we can make a small sample `main.rs` file:

```rust
#[tokio::main(flavor = "current_thread")]
#[tracing::instrument]
async fn main() -> anyhow::Result<()> {
    let subscriber = tracing_subscriber::FmtSubscriber::new();
    tracing::subscriber::set_global_default(subscriber)?;

    println!("Hello, world!");

    tracing::info!("yo is this a different color or whhhhaaat");

    Ok(())
}
```

If we try to compile now, we'll end up with a LOT of errors. Give it a try if you want - this command will fix the "I don't have the `std` library" errors: `cargo +nightly build --target riscv64gc-unknown-linux-musl -Zbuild-std=core,std,panic_abort -Zbuild-std-features=panic_immediate_abort`

Anyway, the reason the command isn't working yet is that Cargo still needs to learn how to use our shiny new toolchain! Let's teach it by writing a new configuration for Cargo. Make a new file at `~/.cargo/config.toml`! That's right - "config!"

Inside the file, add the following:

```toml
[target.riscv64gc-unknown-linux-musl]
linker = "/home/barrett/Downloads/milkv-buildroot/sdk/host/bin/riscv64-buildroot-linux-musl-gcc.br_real"
rustflags = [
    "-C", "target-feature=-crt-static",
    "-C", "link-arg=--sysroot=/home/barrett/Downloads/milkv-buildroot/sdk/host/riscv64-buildroot-linux-musl/sysroot",
    # "-C", "target-feature=+crt-static", # Uncomment me to force static compilation
    # "-C", "panic=abort", # Uncomment me to avoid compiling in panics
]
```
Of course, replace `/home/barrett/Downloads` with wherever you cloned and compiled the SDK! Also, it's worth keeping in mind that we're using dynamic libraries here.

or this, if you used the musl archive and extracted it in /opt/riscv-musl:

```toml
[target.riscv64gc-unknown-linux-musl]
linker = "/opt/riscv-musl/bin/riscv64-buildroot-linux-musl-gcc.br_real"
rustflags = [
    "-C", "target-feature=-crt-static",
    "-C", "link-arg=--sysroot=/opt/riscv-musl/riscv64-buildroot-linux-musl/sysroot",
    # "-C", "target-feature=+crt-static", # Uncomment me to force static compilation
    # "-C", "panic=abort", # Uncomment me to avoid compiling in panics
]
]
```

Let's run our build command. First, though, run a `cargo clean` to make sure all the old build artifacts are gone. Sometimes, failed artifacts won't work with new, working ones!

```console
barrett@canopy ~/D/farts-testing-farts (main)> cargo +nightly clean
     Removed 1104 files, 694.1MiB total
barrett@canopy ~/D/farts-testing-farts (main)> cargo +nightly build --target riscv64gc-unknown-linux-musl -Zbuild-std --release
   Compiling compiler_builtins v0.1.101
   Compiling core v0.0.0 (/home/barrett/.rustup/toolchains/nightly-aarch64-unknown-linux-gnu/lib/rustlib/src/rust/library/core)
   Compiling libc v0.2.149
   (snip! there's a lot of stuff here...)
   Compiling tracing v0.1.40
   Compiling tokio v1.33.0
   Compiling tracing-subscriber v0.3.17
   Compiling farts-testing-farts v0.1.0 (/home/barrett/Downloads/farts-testing-farts)
    Finished release [optimized] target(s) in 12.54s
barrett@canopy ~/D/farts-testing-farts (main)> 
```

Great, that means our toolchain is working! Let's test it on the Milk-V Duo!

## Testing

To move things to your Duo, you need a specific `scp` command:

```console
barrett@canopy ~/D/farts-testing-farts (main)> scp -O target/riscv64gc-unknown-linux-musl/release/farts-testing-farts root@192.168.42.1:/root/bin/farts-testing-farts
root@192.168.42.1's password: 
farts-testing-farts                              100%  367KB   4.0MB/s   00:00    
barrett@canopy ~/D/farts-testing-farts (main)> 
```

You use `-O` as the Duo doesn't come bundled with FTP, which modern `scp` uses as a backend.

Now for the moment of truth:

```console
[root@milkv-duo]~/bin# ./farts
Hello, world!
1970-01-01T00:31:46.516325Z  INFO farts: yo is this a different color or whhhhaaat
[root@milkv-duo]~/bin# 
```

Ayooooo! It's working! However, you might get an error at first, so let's take a look at what that's all about...

### Pitstop: Potential Weird Error

If you end up getting a weird error that kinda looks like:

```console
[root@milkv-duo]~/bin# ./binary 
-sh: binary: not found
```

...the computer is lying! No worries - it's not your fault, either! That said, we'll need to clean it up.

The message says there's "no file," but really, it just can't load the dynamic libraries! You'll need to look at the binary on your desktop computer and see where to make a symbolic link.

On your desktop computer, you can do as follows:

```console
barrett@canopy ~/D/f/t/r/release (main)> readelf -l binary 

Elf file type is DYN (Position-Independent Executable file) Entry point 0xa634 There are 10 program headers, starting at offset 64 

Program Headers: (snip! a lot of bs here) 
[Requesting program interpreter: /lib/ld-musl-riscv64.so.1]
(snip)

barrett@canopy ~/D/f/t/r/release (main)> 
```

You're looking for that "requesting program interpreter" line! Let's grab the Duo and make its "real" version of that file pretend to be this ideal one. We'll find the real one and then use a symbolic link:

```console
[root@milkv-duo]/tmp/bin# find /lib -name "**ld-musl**"
/lib/ld-musl-riscv64v0p7_xthead.so.1
[root@milkv-duo]/tmp/bin# 

[root@milkv-duo]/tmp/bin# ln -sf /lib/ld-musl-riscv64v0p7_xthead.so.1 /lib/ld-musl-riscv64.so.1
```

Great! Now, our weirdly named library will work just fine for our program!

```console
[root@milkv-duo]~/bin# ./binary
Hello, world!
```

{% conclusion() %}

It's possible to make some incredible things with boards like these! Since we have everything ready, I can't wait to see what comes next!

Thanks for your attention! Did you spot something wrong with the article? Please <a href="mailto:contact@barretts.club">email me</a> or [make an issue](https://github.com/onkoe/barretts-club/issues/new?title=problem%3A%20I%20Got%20a%20Milk-V%20Duo%20%28and%20It%E2%80%99s%20Running%20Rust%29%20&body=I%20found%20a%20problem%20in%20I%20Got%20a%20Milk-V%20Duo%20%28and%20It%E2%80%99s%20Running%20Rust%29%21%20Let%20me%20explain) on GitHub! It helps a lot! :)

{% end %}
