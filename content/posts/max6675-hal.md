+++
title = "What I Learned Making an embedded-hal Driver in Rust (for the MAX6675 Thermocouple Digitizer)"
description = "I wrote a driver for this digital thermocouple converter - what did I learn?"
date = 2023-12-19
[taxonomies]
tags = ["rust", "embedded", "robotics"]
+++

At my university, I work on some engineering competition teams. There are all kinds of unique folks working on a plethora of projects! However, as a student in computer science, I naturally gravitate toward technical projects.

That's how I got introduced to embedded systems. It wasn't long ago, either - only the beginning of last year! Almost two years later, and as this one comes to a close, I finally made one of my first contributions to the embedded Rust community!

That said, I had some trouble getting to this point. Let's start with a story...

## The Reason

Before I tried Rust for embedded, we used lots of Arduino on our Formula [SAE](https://www.fsaeonline.com/) team. Unfortunately for my eyeballs, that also meant we were writing lots of C.

Since it was our first year, though, and most students on the team hadn't used C, **I** wrote lots of C! While the Arduino C is simplified and cozy, we were getting tons of errors that went unreported. In other words, I was tearing my hair out while getting these 'sketches' to work correctly!

I had heard of Rust's embedded, but when I gave it a quick shot, I had no idea what I was doing. We were having trouble getting any of it to work as expected. I also knew that the MAX6675 returned no search results on Crates.io, and that was scary!

Instead of continuing through my suffering, I decided to shelve the idea and focus on learning Rust. I don't mean learning for the first time but thoroughly studying the various [Rusty learning materials](https://www.rust-lang.org/learn).

A year later, I know enough Rust to teach others how to write an `embedded-hal` driver. I'm not talking about you, either - I can explain it to the other members of the FSAE team!

### What is the MAX6675???

The idea of a "thermocouple digitizer" (wtf) can initially be confusing! However, it reads the state of a connected thermocouple. That's a thermometer made of two metal wires.

The MAX6675 is one such thermocouple digitizer, transforming the raw voltage from the thermocouple into something useful - like computer data!

These boards can help measure extreme temperatures where other tools wouldn't make it, though they lack precision. When you can get [a few for ten bucks](https://amzn.to/475Jwfh), though, it stops mattering quickly! (partner link btw)

## The Driver

Anyway, let's get into the driver itself! When I set out to make this work, I knew that I should start by doing two things:

1. Find a similar driver and use it as a starting point, and
2. Use some template to work off of. Because how do you even write an embedded driver in the first place?

Unfortunately, I focused on the first part more intently. First, I found a similar thermocouple digitizer. I decided to use the [MAX31855](https://www.analog.com/media/en/technical-documentation/data-sheets/max31855.pdf) for this, as it already had [a `HAL` driver in Rust](https://github.com/cs2dsb/max31855.rs)! It's also very similar to the [MAX6675](https://www.analog.com/media/en/technical-documentation/data-sheets/max6675.pdf), mainly because it's the MAX6675's replacement. It even says so on [the Amazon page](https://amzn.to/482o6kz)! (heads up: affiliate link 😳✨)

While the `MAX31855.rs` library helped me get started, I kept finding it weird that I was creating a trait instead of 'making' a data structure. It's still strange - here's a snippet of how my sprouting library looked! [(full commit here)](https://github.com/onkoe/max6675-hal/commit/160bf5e696210d6b403559a94a5e4542b8bdccae)

```rust
// (snip! error handling stuff up here)

fn transfer<CS, SPI, SpiE, CsE>(
    spi: &mut SPI,
    chip_select: &mut CS,
    buffer: &mut [u8],
) -> Result<(), HalError<SpiE, CsE>>
where
    CS: OutputPin<Error = CsE>,
    SPI: Transfer<u8, Error = SpiE>,
{
    set_cs(chip_select, Low)?;

    spi.transfer(buffer).map_err(|e| HalError::SpiError(e))?;

    set_cs(chip_select, High)?;

    Ok(())
}

pub trait Max6675<SpiE, CsE, CS> {
    fn read_raw(&mut self, chip_select: &mut CS) -> Result<[u8; 2], HalError<SpiE, CsE>>;
    fn read_celsius(&mut self, chip_select: &mut CS) -> Result<f32, HalError<SpiE, CsE>>;
}

impl<CS, SPI, SpiE, CsE> Max6675<SpiE, CsE, CS> for SPI
where
    CS: OutputPin<Error = CsE>,
    SPI: Transfer<u8, Error = SpiE>,
{
    /// Reads the thermocouple temperature and leave it as a buffer of two bytes.
    fn read_raw(&mut self, chip_select: &mut CS) -> Result<[u8; 2], HalError<SpiE, CsE>> {
        let mut data = [0_u8; 2];

        transfer(self, chip_select, &mut data)?;

        Ok(data)
    }

    /// Reads the thermocouple temperature and converts it into Celsius.
    fn read_celsius(&mut self, chip_select: &mut CS) -> Result<f32, HalError<SpiE, CsE>> {
        let raw = u16::from_be_bytes(self.read_raw(chip_select)?);

        // check for Bit D2 being high, indicating that the thermocouple input is open
        // (see MAX6675 datasheet, p. 5)
        if raw & 0x04 != 0 {
            return Err(HalError::OpenCircuitError);
        }

        // ripped from the Arduino library (see: https://github.com/RobTillaart/MAX6675)
        let temp = ((raw >> 3) & 0x1FFF) as f32 * 0.25_f32;
        Ok(temp)
    }
}
```

This code isn't necessarily bad, but it looks slightly off. Using it felt similar, but for a different reason: there was nothing 'explicit' about your actions!

Think about it: this library would force a user to import a trait and then *not* use it directly. Instead, your SPI types would get new methods, like `read_celsius()` and `read_raw()`, though you'd have to pass them your chip select output pin each time.

```rust
use max6675_hal::Max6675 as _;

let (spi, cs) = Spi::new( ... );

let temp = spi.read_celsius(cs)?; // `spi` just magically has this..?
```

Something about this feels 'un-Rusty', though it's hard to pinpoint why. I think there are a few reasons:

1. It's not easy - a user has to look for a tutorial before use!
1. Importing a trait for no reason is just weird.
1. You can't tell which SPI types are compatible unless you try calling the method on them.
1. There's no encapsulation - you can't use the `MAX6675` around your program. It's just a concept housed wherever the SPI and CS variables live.

Moreover, if the user wanted to put their 'MAX6675' inside of a `struct`, they'd be left worrying about all of the generic types and would likely scrap the idea! 😱

I had trouble wrapping my implementation to work with a `struct`. It felt like the generics were against me, especially since I didn't have [dynamic dispatch](https://www.youtube.com/watch?v=xcygqF5LVmM&t=2876s)! (you can't `Box` if you can't allocate 😖)

In my mind, I was already giving up on this project. What's the point of writing something that's no easier than just doing it yourself? And those generics? Yeesh! They're not easy to look at.

However, when preparing to write another `embedded-hal` driver, I looked up that long-forgotten question of "how to write an embedded-hal driver," blessing my eyes with [this GitHub issue](https://github.com/rust-embedded/book/issues/246). It contained a link to Ryan Kurte's [template for embedded drivers](https://github.com/ryankurte/rust-embedded-driver). Finally, it was clear - I knew what to do!

The code from earlier eventually turned into this:

```rust
// (snip!)

/// A representation of the MAX6675 digital thermocouple converter.
/// Maintains an SPI connection to the device.
#[derive(Copy, Clone, Debug, PartialEq)]
pub struct Max6675<Cs, CsError, Spi, SpiError> // (👈 woah! that's a struct!)
where
    Spi: spi::Transfer<u8, Error = SpiError> + spi::Write<u8, Error = SpiError>,
    Cs: OutputPin<Error = CsError>,
{
    /// SPI connection
    spi: Spi,

    /// Chip select pin
    chip_select: Cs,

    // we're using the generic spi error, but not here!
    _spi_err: PhantomData<SpiError>,
    _cs_err: PhantomData<CsError>,
}

impl<Cs, CsError, Spi, SpiError> Max6675<Cs, CsError, Spi, SpiError>
where
    Spi: spi::Transfer<u8, Error = SpiError> + spi::Write<u8, Error = SpiError>,
    Cs: OutputPin<Error = CsError>,
{
    /// Creates a new Max6675 representation.
    pub fn new(spi: Spi, mut chip_select: Cs) -> Result<Self, Max6675Error<SpiError, CsError>> {
        chip_select
            .set_high()
            .map_err(|e| Max6675Error::CsError(e))?;

        Ok(Self {
            spi,
            chip_select,
            _spi_err: PhantomData,
            _cs_err: PhantomData,
        })
    }

    /// Destructs the `MAX6675` into its bare components, as recommended by the
    /// [HAL Design Patterns](https://doc.rust-lang.org/beta/embedded-book/design-patterns/hal/interoperability.html).
    pub fn free(self) -> (Spi, Cs) {
        (self.spi, self.chip_select)
    }

    /// Tries to read thermocouple temperature, leaving it as a raw ADC count.
    pub fn read_raw(&mut self) -> Result<[u8; 2], Max6675Error<SpiError, CsError>> {
        let mut buf: [u8; 2] = [0_u8; 2];

        self.chip_select
            .set_low()
            .map_err(|e| Max6675Error::CsError(e))?;

        self.spi.transfer(&mut buf)?;

        self.chip_select
            .set_high()
            .map_err(|e| Max6675Error::CsError(e))?;

        Ok(buf)
    }

    /// Internal function to convert a `read_raw()` into a parsable `u16`.
    fn process_raw(&mut self) -> Result<u16, Max6675Error<SpiError, CsError>> {
        Ok(u16::from_be_bytes(self.read_raw()?))
    }

    /// Tries to read the thermocouple's temperature in Celsius.
    pub fn read_celsius(&mut self) -> Result<Temperature, Max6675Error<SpiError, CsError>> {
        let raw = self.process_raw()?;

        if raw & 0x04 != 0 {
            return Err(Max6675Error::OpenCircuitError);
        }

        let temp = ((raw >> 3) & 0x1FFF) as f32 * 0.25_f32;
        Ok(Temperature::Celsius(temp))
    }

    // (snip! other temperature units)
}
```

I don't know about you, but I LOVE how it turned out! This version of the library encapsulates all of the generic badness into a few lines. Now, users can stick their MAX6675s wherever they'd like! As such, the code ends up looking like this:

```rust
use max6675_hal::Max6675;

let (spi, cs) = Spi::new( ... );
let max = Max::new(spi, cs)?;

let temp = max.read_celsius()?;
```

It's ridiculous how little of a difference that looks, but the experience is entirely different! None of the 'un-Rusty' elements are here anymore! Woohoo!

## Conclusion

The story of my MAX6675 thermocouple digitizer library was an emotional rollercoaster - highs, lows, and everything in between! It's also a coming-of-age story - never give up on your dreams! (they're always one web search away)

Given that there are so many of these little boards in the world, it's not hard to find one that hasn't been implemented in Rust yet. If you're interested, why not give it a try?

If you want to use the library, feel free to visit [its GitHub repo](https://github.com/onkoe/max6675-hal), grab it on [Crates.io](https://crates.io/crates/max6675-hal), or read its docs on [Docs.rs](https://docs.rs/max6675-hal)!

If you have any suggestions for or problems with this article, please [send a GitHub issue](https://github.com/onkoe/barretts-club/issues/new?title=%7Bproblem%20OR%20suggestion%7D%3A%20MAX6675%20Thermocouple%20Driver%20in%20Rust&body=I%20noticed%20something%20in%20this%20article...%20%28etc.%29
) so I can take a look! Alternatively, you can always [contact me by email](mailto:contact@barretts.club) for any concerns or ideas for this article or others! Thanks for sticking around! 😄
