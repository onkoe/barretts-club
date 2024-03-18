+++
title = "Go's Errors: How I Learned to Love Rust"
description = "Go doesn't quite handle errors the way Rust does. Let's talk about how I learned to love Rust's error-handling."
date = 2024-03-18
[taxonomies]
tags = ["go", "rust", "python"]
+++

Coming from the harsh world of Visual Basic (yes, seriously), I first saw Go and thought it was perfect for me. The easy syntax and obvious error handling made it a fun switch!

I never built and released anything in Go, mostly because I abandoned it fairly quickly. Let's talk about why!

## Errors

Most languages suck at error handling. The vast majority use exceptions for error handling. That's fine in specific situations, but the ecosystem surrounding exceptions is pretty annoying.

They're challenging to keep track of, require a ton of `try`/`catch`, and generally treat errors as... exceptional. They're very much not exceptional, though - errors are super common, and things don't always go as planned.

Python is a great example of how things can get confusing quickly. Let's open a file and handle the issues we may encounter!

```python
try:
    file = open("hello.txt")
except IOError as err:
    print(f"got an error: {err}")
    print("uh oh")
```

While we caught the `IOError`, there could be other reasons the `open()` failed. `OSError` and other specific exceptions can be difficult to know about due to lax documentation and IDE features. Many Python scripts will resort to using blanket `except`s:

```python
try:
    something_dangerous()
except:
    print("uh oh")
```

These can really mess up your day when they explode, particularly when you think it's safe to recover, but isn't!

Go does things differently here. When you try to do something that can fail, such as opening a file, you get two return values. Here's a quick glance:

```go
file, err := os.Open("hello.txt") // create the file and error variables

// let's see if we have an error 
if err != nil {
    log.Fatal(err)
    panic("uh oh")
} else {
    // use the file
    data := make([]byte, 100)
    count, err := file.Read(data)
    // ...
}
```

This is much easier to parse! A simple `if` statement helps us check if we have an error. Then, we can use the 'okay' result, right?

## A Problem

Not quite. What happens if we use the file without doing any error checks?

```go
file, err := os.Open("hello.txt")

data := make([]byte, 100)
count, err := file.Read(data)
```

Oh... it just works. Nothing is stopping us from using the invalid data. In reality, Go would panic in this scenario, but that'll still keep me awake at night. Other scenarios can cause subtle bugs that are difficult to scope out, especially when a 'default' value is returned without documentation in larger systems libraries.

Overall, Go developers are encouraged to always check for errors. This can lead to seemingly needless verbosity, though - `if error != nil` is one of the most common phrases in the language, and I can't blame anyone for getting sick of it.

Personally, this issue turned me away from Go, just as it kept me from enjoying Python, Java, and countless other languages.

## A Solution

In 2020, I discovered Rust. I didn't try to learn it fully until 2022, but once I did, Go quickly felt less necessary.

Rust's error handling is slightly more complex. Here are two things to know:

1. Rust has types that can be ['one of' many things](https://doc.rust-lang.org/rust-by-example/custom_types/enum.html). These are called `enums`.
2. Errors aren't Strings, but they can provide messages.

With these ideas in mind, let's take a brief look at Rust's error handling!

```rust
let mut file_result = File::open("hello.txt");

match file_result {
    Ok(mut file) => {
        // use the file
        let mut data = String::new();
        let _ = file.read_to_string(&mut data);
    }
    Err(e) => {
        println!("error when reading file: {e:}");
        panic!("uh oh");
    }
}
```

Because Rust uses [pattern matching](https://doc.rust-lang.org/book/ch18-03-pattern-syntax.html) for differentiating different `enum` variants, you literally cannot use the file without handling the error. It's within another branch entirely.

In other words: if you get an error, you don't get a file handle. The `file_result` is either:

- `Ok(T)`, where the `T` is just some data, **or**
- `Err(E)`, and `E` is any error.

That's the definition of Rust's [actual error type, `Result<T, E>`](https://doc.rust-lang.org/std/result/enum.Result.html), which becomes worth a lot around midnight. A lot less goes wrong when the compiler has your back!

### Rust's Question Mark

Unlike with exceptions, Rust won't send you to the nearest `try/catch` block. Instead, Rust, allows you to return errors easily with the `?` ("question mark") operator.

If there's an error, your function will automatically return `Err(E)`. Otherwise, it'll continue executing.

Here's how `?` is used:

1. Make your function return a `Result`.
2. Put the `?` operator on fallible operations.

```rust
use anyhow::Result; // a flexible Result implementation that works with _all_ errors

fn main() -> Result<String> {
    let file = File::open("hello.txt")?; // return if there's an error (?); otherwise keep on truckin

    let mut data = String::new();
    let _ = file.read_to_string(&mut data)?;

    Ok(data)
}
```

### If Let

Go's 'looser' implementation of error-handling does have one helpful feature: it looks super simple!

However, Rust has a similar syntax in the reverse style - when you don't care too much about the error in question.

For example, in a loop, you may want to stop performing actions without returning to the caller. For this situation, the question mark operator isn't as helpful.

```rust
fn some_loop() {
    for x in 0..10 { 
        let mut file_result = File::open("hello{x}.txt");

        if let Ok(file) = file_result {
            // we just created a temp. variable called `file`!
            // (do stuff with `file` here)
        }
    }
}
```

## Wrapping Up

Overall, Rust's error-handling model helps users see errors as everyday parts of problem-solving.

For me, it acts as a convenient way to focus on whatever project I'm completing at the time. You think less about your errors, unlocking additional time and resources when pursuing project goals.

If you haven't already tried it, give Rust a shot!

{% conclusion() %}

Thanks for reading to the end! I'll be working on a more complete video to describe the whole Rust error-handling ecosystem.

If you have any questions, suggestions, or concerns, please let me know by <a href="mailto:contact@barretts.club">email</a>! You can also [make an issue](https://github.com/onkoe/barretts-club/issues/new) on GitHub.

Thank you!!

{% end %}
