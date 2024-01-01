+++
title = "Testing Your Embedded Rust (feat. embedded-hal-mock and explosions)"
description = "Take your embedded Rust code to the next level (and minimize explosions) by modeling your IO!"
date = 2024-01-01
[taxonomies]
tags = ["rust", "embedded"]
+++

Let's say we have a device - it's a simple bounce-back machine. When you send a beep, it replies with a boop. This device is [the Beep-Boop Box](https://xkcd.com/325/)! 📦✨

In Rust, using `embedded-hal`, we've connected to this machine and written a generic driver for it. Here's how it might look:

```rust
pub struct BeepBoopMachine<Spi: SpiBus, /* ... */> {
    spi: Spi,
    /* ... */
}

impl</* ... */> BeepBoopMachine</* ... */> {
    pub fn new(spi: Spi) -> Self {
        Self { spi }
    }

    pub fn beep(&mut self) -> Result<[u8; 4], BBError> {
        let mut data = [u8; 4];
        self.spi.write(&[98, 101, 101, 112])?; // "beep"
        self.spi.write(&[98, 101, 101, 112])?; // oh oops this is some copy and paste oh dear!

        self.spi.read(&mut data)?; // uhhh... "boop"? 
        Ok(data)
    }
}
```

Oh no! It seems that we accidentally wrote to SPI twice. However, our device doesn't say what it'll do if that happens, nor does our program. There's no way for us to know!

Let's pretend we didn't catch the error, though. Maybe no one found this bug, setting many Beep-Boop Boxes on fire! That's scary.

## Mocking Our Device

However, we don't have to wait for customers' systems to set on fire! `embedded-hal` has a testing suite [lovingly known as `embedded-hal-mock`](https://github.com/dbrgn/embedded-hal-mock). It supports both 0.x and 1.x versions of `embedded-hal`, so practically everyone can use it!

Its README describes the crate's goal best:

> "The goal of the crate is to be able to test drivers in CI without having access to hardware."
> ~the `embedded-hal-mock` people

`embedded-hal-mock` does precisely that! By modeling each action you perform over SPI, I2C, etc., you can ensure that only the operations you expect to happen... happen. Each action is known as a `Transaction`. You can [read more in its documentation](https://docs.rs/embedded-hal-mock/latest/).

Thankfully, with this crate, we can express exactly what responses we expect to send and receive given some combination of IO. Let's take a look!

```rust
//! Tests module

use embedded_hal_mock::eh1::spi::{Mock as SpiMock, Transaction as SpiTransaction};

#[test]
fn beep_boop() -> anyhow::Result<()> {
    // this is what we 'expect' to happen
    let expectations = [
        SpiTransaction::write_vec(vec![98, 101, 101, 112]), // wrote "beep"
        SpiTransaction::read_vec(vec![98, 111, 111, 112]), // found "boop"
    ];

    // create a fake SPI connection
    let mut spi = SpiMock::new(&expectations);

    // create device struct, do IO stuff
    let bb = BeepBoopMachine::new(&mut spi);
    let resp = bb.beep()?;

    assert_eq!(resp, [98, 111, 111, 112]);
    spi.done();

    Ok(())
}
```

Writing this code "for real," I carefully ran the test...

```fish
running 1 test
thread 'tests::beep_boop' panicked at /Users/barrett/.cargo/registry/src/index.crates.io-6f17d22bba15001f/embedded-hal-mock-0.10.0-rc.4/src/eh1/spi.rs:230:9:
assertion `left == right` failed: spi::write unexpected mode
  left: Read
 right: Write
 [...]
```

As you can see, the test caught the issue! We only asked the `mock` to expect two operations: read and write. However, it found a second read instead. In the model we've created, that's always a no-no. 👋

Let's say we fixed the bug - how does our test feel now? 😳

```fish
running 1 test
test tests::beep_boop ... ok
```

We're golden! Our Beep-Boop customers are safe! I've used it in [my crates, too](https://github.com/onkoe/max6675-hal/blob/4cb3430cb91d399828691ee4a1ec56b6a1dbc24d/tests/max.rs), helping to ensure that nothing goes wrong without my CI (and thus, me) knowing!

This crate can supercharge your embedded Rust - notably when used alongside [something like `defmt-test`](https://crates.io/crates/defmt-test) for your binaries!

## Wrapping Up

As you can see, some of Rust's biggest strengths lie in its testing mechanics. Imagining how a device might work when writing a driver can be challenging. Luckily, with Rust, someone's always got your back. In this case, that's you!

If you haven't tried embedded Rust, I wholeheartedly recommend it. 🦀✨

{% conclusion() %}
What do you think about these tools? Have you used them in your projects, or am I missing something in the article? Please let me know <a href=https://github.com/onkoe/barretts-club/issues/new>with a GitHub issue</a> or <a href="mailto:contact@barretts.club">via email</a>!

Thanks for taking a look - good luck!
{% end %}
