+++
title ="They're Stringish... ish"
description = "Evolving our functions with the magic of AsRef"
date = "2023-10-07"
[taxonomies]
tags = ["rust"]
+++

This article isn't anything special, but I want to show you something cool I found when writing a library!

I won't take all that long - we'll write a small function and pimp it out over time.

## Strings

Rust has several "string-ish" types. This situation is great for the ecosystem, as developers always have a choice of allocation or borrowing.

Unfortunately, we find a problem if we take any string type into a function. Let's say we search a list of cities for some input. We'll barely do anything new - we can call `list_of_cities.contains()`. It does all the [hard work for us](https://doc.rust-lang.org/src/core/slice/mod.rs.html#2511-2516)! ([Well, not really...](https://stdrs.dev/nightly/x86_64-unknown-linux-gnu/src/core/slice/cmp.rs.html#210))

So, we'll probably want to take a search key and a list. Then, we can return either true or false so callers know if we found their city!

```rust
pub fn city_search(list: Vec<&str>, search_key: &str) -> bool {
    if list.contains(&search_key) {
        return true;
    } else {
        return false;
    }
}
```

This solution technically works, but our old pal Clippy reminds us that our function can become a one-liner. ([seriously, add Clippy to your IDE!](https://code.visualstudio.com/docs/languages/rust#_linting))

Anyways, let's apply its suggestions:

```rust
pub fn city_search(list: Vec<&str>, search_key: &str) -> bool {
    list.contains(&search_key)
}
```

I think that looks good! Let's write a test to make sure it works.

```rust
    #[test]
    fn test() {
        let list = vec!["Tulsa", "Oklahoma City", "Tokio"];

        let x = city_search(list, "fake city");

        // COMPILER ERROR: expected &str, found String 👇️👇️👇️
        let y = city_search(list, String::from("Tokio"));
    }
```

Well, it works when we pass in an `&str`, but Strings are off-limits. The compiler appropriately suggests a fix on the caller side of things.

```rust
    help: consider borrowing here
    |
65  |         let y = city_search(list, &String::from("Tokio"));
    |                                   +
```

That said, what if we could fix the problem inside our function?

Do you think we need to? In the current example, the whole String situation looks pretty dumb. However, what if we set aside our favorite city? Maybe the city keeps changing? For many general functions, callers could do any number of things!

In these situations, many high-level libraries tend to use `AsRef` over their favorite string type. We'll discuss that more later. For now, let's look at how we can use it in our program.

```rust
//       ...psst. the changes are here!        👇️  👇️  👇️  👇️
pub fn city_search(list: Vec<&str>, search_key: impl AsRef<str>) -> bool {
    let search_key: &str = search_key.as_ref(); // create a reference, if necessary

    list.contains(&search_key)
}
```

As you can see, our new and improved function now takes an `impl AsRef<str>`. On the compiler side of things, this means that your function is now technically generic. Though... maybe it's a "[simple generic](https://github.com/jonhoo/rust-imap/pull/235#discussion_r923057270)."

If you're a nerd, you can write it like this:

```rust
pub fn city_search<T: AsRef<str>>(list: Vec<&str>, search_key: T) -> bool {
    let search_key: &str = search_key.as_ref();

    list.contains(&search_key)
}
```

The Rust compiler is just as pleased to accept this goofy function!

To wrap our groundbreaking function up, let's write some tests to show that we can use various string types. These include: `&str`, `String`, `Box<str>`, `Cow<'_, str>`, `Box<str>`, `Rc<str>`/`Arc<str>`, and any others you may come across!

```rust
mod tests {
    #[test]
    fn try_strings() {
        let list = vec!["Tulsa", "Oklahoma City", "Tokio", "..."];

        let str_result = city_search(list, "loser city");
        let string_result = city_search(list, String::from("Tulsa"));
        let cow_result = city_search(list, std::borrow::Cow::from("i'm false!"));
        // and so on...
    }
}
```

## Being Friendly

Even though taking an `AsRef` can make it easier and cleaner to call your functions, it's crucial to consider what your `AsRef` is doing. In general, it won't allocate any memory. However, if you're working in a low-level library or codebase, ask yourself:

- Could this do something unexpected?
- Am I telling callers what's going on here?
- Is it worth it? Am I meant to be here? Why was I born?

These questions are appropriate across most decisions you make when programming. Still, they help out a lot when using idioms like `AsRef`. Make sure to give it a little thought first!

## Wrapping Up

For most, using `AsRef` on string, path, or other types can help users focus on their code. With generics, your functions become reusable across many unique types and situations. Unsurprisingly, "[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)" tokens like `AsRef` are in the same boat.

Use them to your advantage. It's the little things that matter most!
