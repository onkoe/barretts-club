+++
title = "A Review of Rust in 2024: What Next?"
description = "Reviewing Rust's improvements this year and talking about the future!"
date = 2024-12-21
[taxonomies]
tags = ["rust", "programming", "programming languages"]
+++

Rust is a programming language with a highly active community. Contributors are constantly adding new features and working toward new goals. This article summarizes my favorite features added in 2024, and also addresses my hopes for the future!

If you're here to see me complain about what we don't have yet, please head to the [Wishlist for 2025](#wishlist) section.

## Review of 2024

The Rust project has made countless improvements to the language this year. Let's review and see what might come next!

### [`&raw` Pointer Syntax](https://blog.rust-lang.org/2024/10/17/Rust-1.82.0.html#native-syntax-for-creating-a-raw-pointer)

We now support creating `&raw const` and `&raw mut` pointers as distinct types. These let you safely refer to fields without a well-defined alignment, much like the long-time workarounds (the `addr_of!` and `addr_of_mut!` macros) did:

```rust
/// These fields will be "packed", so there won't be extra padding.
///
/// This can reduce memory usage, but screws with everything else. It's
/// sometimes used in low-level contexts.
///
/// See: https://doc.rust-lang.org/nomicon/other-reprs.html#reprpacked
#[repr(packed)]
struct MyPackedStruct {
    field_a: i32,
    field_b: i8,
    field_c: u16,
}

let mps: MyPackedStruct = MyPackedStruct {
    field_a: 582,
    field_b: -4,
    field_c: 989,
};

// scary: this will probably cause undefined behavior (UB)!
//
// the compiler now gives you an error here.
let bad: *const i32 = &mps.field_a as *const i32;

// happy: no problems here.
let good: *const i32 = &raw const mps.field_a;

// we'll want to read the value out using this method.
//
// note: it's only unsafe because `read_unaligned` doesn't care if the
// type is `Copy`. so you can do some nonsense with it
// ...kinda like `core::mem::replace`
let value: i32 = unsafe { good.read_unaligned() }; // this is how you'd read the value
```

Again, though... avoid `Packed` representations if you can. They're a bit of a footgun. But... `&raw` is great to avoid creating a reference, skipping straight to the pointer.

### [Floating-Point Types in `const`](https://github.com/rust-lang/rust/pull/128596)

Now, you can use floats in `const fn`. That means you can often do those computations at compile-time instead of at runtime!

This change is based on [RFC 3514: Float Semantics](https://github.com/rust-lang/rfcs/blob/master/text/3514-float-semantics.md), which specifies how FP numbers should work in the language.

```rust
struct Maybe {
    pub float: f32,
}

/// As you can see, we're allowed to do floating-point operations in `const`!
const fn float_in_const(call_me: &Maybe) -> (bool, f32) {
    let f: f32 = call_me.float; // also in your data structures :)

    let new = f / 1.1;
    (new.is_finite(), new)
}
```

Note that most methods on the `f32`/`f64` primitives don't yet use this. For example, `f32::powf` and `f32::powi` aren't yet `const`. Using [`#![feature(const_float_methods)]`](https://github.com/rust-lang/rust/issues/130843) on Nightly can get you some of the way there, though these power functions don't seem to be included..?

### [`#[expect(lint)]`](https://blog.rust-lang.org/2024/09/05/Rust-1.81.0.html#expectlint)

These attributes are just like `#[allow(lint)]`, but they also give an error when the "expectation" isn't satisfied.

For example, if you put `#[allow(unused)]` onto a function, but later start calling it somewhere, you typically wouldn't notice the change. You may forget the function is used in your API. The `#[expect]` attribute doesn't let this happen - it'll show an error if you violate its expectation.

```rust
// you can just replace `#[allow(lint)]` with `#[expect(lint)]`
//
// #[allow(unused)]
#[expect(unused)]
type SomeUnusedItem = i32;
```

This has already fixed some bugs in my code, so I wholeheartedly suggest giving it a try!

### [`core::error::Error` Trait Stabilization (`error` in `core`)](https://doc.rust-lang.org/stable/core/error/trait.Error.html)

If you've been in the embedded trenches before 1.81, you've seen [Issue #103765: Tracking Issue for `Error` in `core`](https://github.com/rust-lang/rust/issues/103765).

Everyone and their mother was using the (now defunct) `#![feature(error_in_core)]` attribute on their crate - and they all had to use Nightly to boot.

This is no longer a problem! [`anyhow`](https://github.com/dtolnay/anyhow?tab=readme-ov-file#no-std-support), [`thiserror`](https://github.com/dtolnay/thiserror/issues/318), and my rip-off crate, [`pisserror`](https://github.com/onkoe/pisserror) all support embedded usage of `Error` now, at least through `no_std`! Note that `anyhow` still requires some form of allocator.

Anyways... I feel like framing this link on my wall. <https://doc.rust-lang.org/stable/core/error/index.html>

### [`LazyCell`](https://doc.rust-lang.org/core/cell/struct.LazyCell.html) and [`LazyLock`](https://doc.rust-lang.org/std/sync/struct.LazyLock.html)

These two types are upstreamed from the well-known [`once_cell` crate](https://crates.io/crates/once_cell), but the standard library is finally catching up!

[`LazyCell`](https://doc.rust-lang.org/core/cell/struct.LazyCell.html) is the upstreamed version of the `once_cell::unsync::Lazy` type. It can't be used across threads or in statics, but it's made for something else: initializing a variable only when it's needed! It's useful for all kinds of things, often related to caching and avoiding large computations.

```rust
/// A huge type that we need for our app!
struct BigType {
    creation_time: Instant,
    // lots of other fields...
}

impl BigType {
    /// pretend this takes forever. we'll use `sleep` to get the point across :)
    fn new(creation_time: Instant) -> Self {
        std::thread::sleep(Duration::from_millis(500));
        Self { creation_time }
    }
}

/// A type that needs to provide a cached value to callers.
struct SomethingWithCache {
    cache: OnceCell<BigType>,
}

impl SomethingWithCache {
    fn big_type(&self) -> &BigType {
        // if we don't have it already, initialize it.
        //
        // otherwise, we'll make it and then cache it for later!
        self.cache.get_or_init(|| BigType::new(Instant::now()))
    }
}
```

On the other hand, [`LazyLock`](https://doc.rust-lang.org/std/sync/struct.LazyLock.html) (`once_cell::sync::Lazy`) is often used on servers and in other high-performance scenarios. They work with concurrency and threading, and you'll also tend to find them inside `static` variables. These are a bit slower than `LazyCell`, but offer greater flexibility.

```rust
/// Here's a static, which is accessible throughout the program.
///
/// Let's pretend that creating it takes a looooong time...
static BIG_SCARY_VARIABLE: LazyLock<BigType> = LazyLock::new(|| BigType::new(Instant::now()));

struct BigType {
    creation_time: Instant,
}

impl BigType {
    fn new(creation_time: Instant) -> Self { /* ... */ }
}
```

Anyways, these types have always been around in one way or another. But now, you don't need to use an external crate!

### The `#[diagnostic::on_unimplemented]` Attribute

This simple attribute is extremely influential - it lets you create your own compile errors for the user to see, all without a proc macro! Here's how it works:

```rust
#[diagnostic::on_unimplemented(
    message = "tell the user what's going on",
    label = "oh hey im pointing at the failed code",
    note = "You may wish to add `#[derive(Cool)] on the affected item.",
    note = "If that's not an option, consider using `PartialCool` instead." // in my bevy era
)]
trait MyCoolTrait<'a> {
    fn buf(&self) -> &'a [u8];
}

struct CoolType<'data>(&'data [u8]);

impl<'data> MyCoolTrait<'data> for CoolType<'data> {
    fn buf(&self) -> &'data [u8] {
        self.0
    }
}

struct UncoolType;

fn func_with_cool_bounds<'data, Cool: MyCoolTrait<'data>>(cool_type: Cool) {
    println!("dang look at all this data: {:#?}", cool_type.buf())
}

fn main() {
    let cool_type: CoolType = CoolType(&[1, 2, 3]);
    let uncool_type: UncoolType = UncoolType;

    func_with_cool_bounds(cool_type); // all good. compiler is happy
    func_with_cool_bounds(uncool_type); // uh oh! but hey, a custom err message...
}
```

That last line there gives you the following error:

```rust
Compiling rs_2024_article_codeblocks v0.1.0 (/Users/barrett/Downloads/rs_2024_article_codeblocks)
error[E0277]: tell the user what's going on
  --> src/diagnostics_on_unimpl.rs:30:27
   |
30 |     func_with_cool_bounds(uncool_type); // uh oh! but hey, a custom err message...
   |     --------------------- ^^^^^^^^^^^ oh hey im pointing at the failed code
   |     |
   |     required by a bound introduced by this call
   |
   = help: the trait `MyCoolTrait<'_>` is not implemented for `UncoolType`
   = note: You may wish to add `#[derive(Cool)] on the affected item.
   = note: If that's not an option, consider using `PartialCool` instead.
   = help: the trait `MyCoolTrait<'data>` is implemented for `CoolType<'data>`
```

This attribute is **vital** for making certain types of derive macros. Please give it a try if you maintain a crate relying heavily on traits, as this technique can seriously help to inform your users!

### [ABI Documentation](https://doc.rust-lang.org/core/primitive.fn.html#abi-compatibility)

It's in a weird module, but under the primitive `fn` (function pointer, NOT `Fn` trait) module documentation, there is now [a section on ABI compatibility](https://doc.rust-lang.org/core/primitive.fn.html#abi-compatibility)!

These can help a lot when relying on `#[repr(Rust)]` types. These docs seem most useful when writing alternative compilers (like [`mrustc`](https://github.com/thepowersgang/mrustc), [`gccrs`](https://rust-gcc.github.io/), or [Dozer](https://notgull.net/announcing-dozer/)), helping folks to start on the advanced intricacies of `rustc` instead of getting stuck on small ABI differences.

(as a note, please support those projects I listed. alternative compilers are essential to the Rust ecosystem's continued development!)

## [`Option::inspect`](https://doc.rust-lang.org/stable/std/option/enum.Option.html#method.inspect), [`Result::inspect`](https://doc.rust-lang.org/stable/std/result/enum.Result.html#method.inspect), and [`Result::inspect_err`](https://doc.rust-lang.org/stable/std/result/enum.Result.html#method.inspect_err)

I'm in love with these methods. The two `inspect` methods are great for logging parsing progression, and `Result::inspect_err` feels almost vital at this point for logging on errors:

```rust
let json: String = serde_json::to_string_pretty(report).inspect_err(|e| {
    tracing::warn!("Failed to make report into a pretty JSON string. (err: {e})")
})?;
```

I enjoy these so much that, in a few projects, I bumped up my MSRV just to use them. They make your code so nice to read...

### [`core::ptr::from_ref::<T>` and `core::ptr::from_mut::<T>`](https://doc.rust-lang.org/stable/core/ptr/fn.from_ref.html)

These types, tracked in [Issue #106116](https://github.com/rust-lang/rust/issues/106116), are a great way to create raw pointers in the general case. They protect from the usual annoyances of `as` casting, where you can slightly bend the type system if not careful.

If you use these types, please consider linting for an accidental swap of shared (`&`) and exclusive (`&mut`) references. See [`clippy::as_ptr_cast_mut`](https://rust-lang.github.io/rust-clippy/master/index.html#as_ptr_cast_mut) for more info.

### [Return-Position `impl Trait`... in Traits (`RPITIT`)](https://github.com/rust-lang/rust/pull/115822/)

It feels like those acronyms get longer each time I look. In any case, with Rust 1.75, traits can now use [`RPIT`](https://github.com/rust-lang/rfcs/blob/master/text/1522-conservative-impl-trait.md) like any other function/method item.

These work just like you'd expect, so please see [the announcement blog post](https://blog.rust-lang.org/2023/12/21/async-fn-rpit-in-traits.html) for additional information.

### [Async Functions in Traits (`AFIT`)](https://github.com/rust-lang/rust/pull/115822/)

The last PR also added async functions to traits, though they're a little knee-capped. Here's what that can look like:

```rust
pub trait Fart {
    async fn fart(&self) {
        tokio::time::sleep(std::time::Duration::from_millis(self.get_fart_time().await)).await;
        println!("<fart>");
    }

    async fn get_fart_time(&self) -> u64;
}

struct Bob;

impl Bob {
    const FART_TIME_MS: u64 = 300_u64;
}

impl Fart for Bob {
    async fn get_fart_time(&self) -> u64 {
        Self::FART_TIME_MS
    }
}

struct Sam;

impl Sam {
    const FART_TIME_MS: u64 = 600_u64; // much longer
}

impl Fart for Sam {
    async fn get_fart_time(&self) -> u64 {
        Self::FART_TIME_MS
    }
}

async fn main() {
    let bob = Bob;
    let sam = Sam;

    tokio::join! {
        bob.fart(),
        sam.fart()
    };
}

```

Note that these aren't yet fully functional, as traits that use it are no longer `dyn` compatible (new term for "object safe").

```rust
fn take_farter(farter: &dyn Fart) {}
```

leads to this error:

```rust
error[E0038]: the trait `afit::Fart` cannot be made into an object
  --> src/afit.rs:45:25
   |
45 | fn take_farter(farter: &dyn Fart) {}
   |                         ^^^^^^^^ `afit::Fart` cannot be made into an object
   |
note: for a trait to be "dyn-compatible" it needs to allow building a vtable to allow the call to be resolvable dynamically; for more information visit <https://doc.rust-lang.org/reference/items/traits.html#object-safety>
  --> src/afit.rs:4:14
   |
3  | pub trait Fart {
   |           ---- this trait cannot be made into an object...
4  |     async fn fart(&self) {
   |              ^^^^ ...because method `fart` is `async`
...
9  |     async fn get_fart_time(&self) -> u64;
   |              ^^^^^^^^^^^^^ ...because method `get_fart_time` is `async`
   = help: consider moving `fart` to another trait
   = help: consider moving `get_fart_time` to another trait
   = help: the following types implement the trait, consider defining an enum where each variant holds one of these types, implementing `afit::Fart` for this new enum and using it instead:
             afit::Bob
             afit::Sam
```

So, if you need to use trait objects (`dyn Farts` syntax), you'll want to add [a helper crate: `async_trait`](https://docs.rs/async-trait/latest/async_trait)!

```rust
use async_trait::async_trait;

#[async_trait]
pub trait Fart { /* ... */ }

#[async_trait]
impl Fart for Bob { /* ... */ }

#[async_trait]
impl Fart for Sam { /* ... */ }
```

Now, `take_farter` compiles just fine! :D

Behind the scenes, though, this proc macro is doing a lot of work:

```rust
impl Fart for Bob {
    fn get_fart_time<'life0, 'async_trait>(
        &'life0 self,
    ) -> Pin<Box<dyn Future<Output = u64> + Send + 'async_trait>>
    where
        'life0: 'async_trait,
        Self: 'async_trait,
    {
        Box::pin(async move {
            if let Some(__ret) = None::<u64> {
                #[allow(unreachable_code)]
                return __ret;
            }
            let __self = self;
            let __ret: u64 = { Self::FART_TIME_MS };
            #[allow(unreachable_code)]
            __ret
        })
    }
}
    // ...
```

See that `Box` right there? That's a peek into the embedded trenches...

Nonetheless, this option is useful for binaries, but be careful when doing this stuff in your libraries. Additional changes are needed [for semantic versioning](https://blog.rust-lang.org/2023/12/21/async-fn-rpit-in-traits.html#is-it-okay-to-use---impl-trait-in-traits) to be consistent here.

### [`const` Blocks](https://github.com/rust-lang/rust/pull/104087/)

When you need these, you *need* them. `const` evaluation has historically been a little difficult to control, governed by the internal (opaque) rules of the compiler [as it pursues `const` promotion](https://github.com/rust-lang/const-eval/blob/master/promotion.md). In libraries operating in low-level spaces, `const` eval can significantly impact performance, so many folks pursue it aggressively: if a maintainer has any doubt, they'll const-ify any parameter into a `const PARAM` just to encourage the compiler.

With `const` blocks, you can directly tell the compiler that it should simplify the given expression at compile-time.

Here's a short example of how this looks:

```rust
// probably not realistic but shhh pretend we're talking to an allocator
let m = allocate(const { 1024 * 8 });
```

If there was any doubt whether that would be evaluated by the compiler, it's gone now. Our troubles were dealt with at compile-time.

### Some Extras

Here are some other things I liked:

- [zero memory (`core::mem::zeroed::<T>()`) is now `const`!](https://doc.rust-lang.org/stable/core/mem/fn.zeroed.html)
    - skirts the transmute
- [`core::slice::chunk_by`](https://doc.rust-lang.org/stable/core/primitive.slice.html#method.chunk_by) and friends
    - these methods are a godsend for parsing
- [`use<'a>` bounds (capture syntax)](https://blog.rust-lang.org/2024/10/17/Rust-1.82.0.html#precise-capturing-use-syntax)
    - these let you better specify your lifetimes when using `impl Trait` syntax
    - I still don't recommend this syntax in libraries due to difficulties with semantic versioning compatibility. however, it feels great in your binaries!
- [`const` blocks](https://github.com/rust-lang/rust/pull/104087/)
- [`c"my c string"` syntax to define c string literals](https://github.com/rust-lang/rust/pull/117472/)
    - automatic `nul` termination
    - very useful in certain contexts.
- [IP address stuff in `core`](https://doc.rust-lang.org/stable/core/net/index.html)
    - this is another thing that was just... gone on embedded
- `rustdoc` improvements
    - [Documentation now mentions `dyn` compatibility on items](https://github.com/rust-lang/rust/pull/113241/)
    - [`/` to search](https://github.com/rust-lang/rust/pull/123355/)
    - [Items aren't duplicated in searches](https://github.com/rust-lang/rust/pull/119912/)
        - makes preludes feel less disgusting
    - [You can hide bars when they're in the way](https://github.com/rust-lang/rust/pull/115660/)
        - top 1 change of 2024 for ADHD
    - [Search for traits' associated types](https://github.com/rust-lang/rust/pull/116085/)
        - helps you avoid clicking that "source" button... so alluring... 🤤

## Wishlist for 2025 {#wishlist}

Ok, 2024 was great for Rust! But, there are still some things that are missing. Let's discuss my wishlist for Rust in 2025:

### [Compile-Time Reflection](https://soasis.org/posts/a-mirror-for-rust-a-plan-for-generic-compile-time-introspection-in-rust)

Compile-time reflection is a construct to analyze source code at compile time. In short, it replaces small code generation tasks (think `serde`, `thiserror`, and [`bevy_reflect`](https://crates.io/crates/bevy_reflect)) with normal Rust source code.

In my view, this is one of the few large-scale optimizations on compile time we've got left (you know... ignoring the whole batch compiler thing). It would vastly reduce compile times for the largest Rust binaries, especially for large applications like web servers.

Reflection would lessen the amount of `syn` we'd see slowly compiling alone, allowing Rust developers to iteratively make changes as if we hand-rolled all our `serde::De/Serialize` implementations, without giving up on our high-level constructs. It is my #1 prospect for the language - after this, everyone could go home until 2026. I would still be happy. (please don't though!)

### [Modern `Allocator` Trait](https://doc.rust-lang.org/nightly/std/alloc/trait.Allocator.html)

Let's take a look at my favorite thing ever - the new `Allocator` trait's `allocate()` method:

```rust
pub unsafe trait Allocator {
    fn allocate(&self, layout: Layout) -> Result<NonNull<[u8]>, AllocError>;

    // ...
}
```

Ok... do you see that? The `Result` in its return type?

This new allocator interface lets you fallibly manage your memory without checking for null pointers at every stage! Or, in other words, sane human beings can manage the memory in their applications without immediately resorting to unsafe. `Drop` is Rust's comfy `free`, but **`allocate` is finally giving Rust a comfy `malloc`**.

This new allocator will be very impactful! I'll list a few benefits here:

- The Linux kernel can use Rusty memory management (i.e. unite [`kernel::alloc`](https://rust.docs.kernel.org/kernel/alloc/) with... everyone else)
- Embedded developers won't have to fight demons to manage their allocators
- Crates using custom allocators for performance won't have to use global state
- Stuff will get faster in general :)

Unfortunately, it's not done yet. If you have any ideas or needs that seem unfulfilled, please reach out to [the Allocators WG (working group) on Zulip](https://rust-lang.zulipchat.com/#narrow/stream/197181-t-libs.2Fwg-allocators)!

### [Enum Variant Types](https://github.com/rust-lang/lang-team/issues/122)

When you write an enum, you sometimes want to pass around a variant for various reasons. Maybe it avoids [dozens of newtypes](https://github.com/onkoe/ghr/blob/0dd9e8f0d624ed40c692fb2619571c0a4ae55767/libghr/src/report/components/mod.rs#L172), powers your state machine, or helps in reducing boilerplate.

Unfortunately, Rust's `enum`s are not currently capable of these, as variants are not types. The workaround isn't pretty. I linked it above, but often, you'll end up using the [newtype pattern](https://doc.rust-lang.org/rust-by-example/generics/new_types.html) on all of your enum variants:

```rust
pub enum ComponentDescription {
    CpuDescription(CpuDescription),
    RamDescription(RamDescription),
    // ...
```

That's because, without it, you can't share each variant as a type. For example, if I know that this component has a `RamDescription`, then there's no use in pattern matching it out. A lot of Rust code would become significantly easier to read with variant types.

### Stabilization of `#[feature(let_chains)]`

I really love `let_chains`! With these, you can combine verbose instances of pattern matching into just a few lines.

```rust
let my_result: Result<u32, MyError> = Result::Ok(2025_u32);

if let Ok(res) = my_result
    && res > 2024_u32
{
    println!("ayo it's 2025!");
}
```

They're not currently stable, but I use them in all my Nightly projects! :)

### [ABI](https://github.com/rust-lang/rust/issues/111423)

I hope that `#[repr(Rust)]` **never** becomes stable. Read these for more info:

- [To Save C, We Must Save ABI](https://thephd.dev/to-save-c-we-must-save-abi-fixing-c-function-abi) by JeanHeyd Meneide ([phantomderp](https://github.com/ThePhD))
- [C Isn't A Programming Language Anymore](https://faultlore.com/blah/c-isnt-a-language/) by Aria Desires ([gankra](https://github.com/Gankra/))
- [Pair Your Compilers at the ABI Café](https://faultlore.com/blah/abi-puns/) by Aria Desires
- [The `glibc` `s390` ABI Break](https://lwn.net/Articles/605607/) by Jonathan Corbet on LWN.net

Oh... you came back! I didn't expect that!

So anyways, Rust is considering its own stable ABI called `crabi`, with its own `repr` tag: `#[repr(crabi)]`. In short, this means you'd be able to write languages that "spoke" Rust. I think we'd start seeing more high-level systems languages (similar to [the now-defunct, and wonderful, June Language](https://www.sophiajt.com/search-for-easier-safe-systems-programming/) or Go) based on the `crabi` ABI model.

Python would likely gain support for `crabi`, so I can imagine a world where the two languages have a large overlap in ecosystems.

### [`adt_const_params` feature - Use Custom Types in Your `const` Generics](https://doc.rust-lang.org/beta/unstable-book/language-features/adt-const-params.html)

This one is nice. In essence, you can now share important info at compile-time without using `const` functions and parameters. These can encourage the compiler to evaluate related expressions at compile-time and avoid passing parameters around. Instead, it's engrained into the type system!

### `Option::inspect_none`

This one sounds kinda funny, but I want a way to log when there's no value.

Like so:

```rust
let username: Option<String> = account
    .username()
    .inspect_none(|| tracing::error!("User does not have a username!"));
```

Currently, we have to use `if account.username().is_none()`, which is a bit verbose for a logging construct.

## Closing Thoughts

These are some of my favorite changes from 2024, and my hopes for 2025!

Rust is doing its Annual Community Survey until December 23rd, 2024, so [please fill out the form](https://www.surveyhero.com/c/rust-annual-survey-2024) if you want to share your thoughts! (but blog posts work too)
