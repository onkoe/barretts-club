+++
title = "A Rusty Response: \"Why I think C++ is still a desirable coding platform compared to Rust\""
description = "My response to a well-thought out article on Rust and C++!"
date = 2023-11-23
page_template = "reaction-post.html"
[taxonomies]
tags = ["rust", "c++"]
+++

If you can't tell, I love Rust! It's a fantastic programming language with a vibrant, welcoming community and fresh technical content to discover!

However, some traditional users feel slightly out of their depth for the same reasons! The interconnected community can feel fast-paced, leaving old projects to rot in [Editions past][1] and creating new, improved libraries with each passing moment.

As large ecosystems slowly crumble, new ones rise from the ashes. The weirdest part of this situation comes from abandoned projects. They're still perfectly usable in all of your projects, even when it's on a different Edition. You will, however, horrify some contributors...

From the static, solemn realm of C - or the slow, stable consensus of C++ and its committees - Rust appears to move at lightspeed!

![the classic Simpsons NERD GIF](https://media.tenor.com/vEiJW6jqR5MAAAAC/nerd-homer-simpson.gif)

Okay, okay..! Let's start with the actual content!

[Henrique Bucher][2] wrote [a blog post][3] titled *Why I think C++ is still a desirable coding platform compared to Rust*. Let's take a look at this article and see what we can learn! I'll respond to the paper as-is when writing, so visit [this archived version][4] for a 'perfect' match in context.

Also, please remember that I will only show part of the page. You'll need to read it for full context - and it's a decent article!

Let's begin!

## The Front Cover

The title of this article is perfect. It isn't inflammatory or inaccurate language - it just wants to say that C++ has some good points.

## The "Unsafe" Excuse

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

Upon reading this, some pundits will throw the recurring excuse “oh but Rust has unsafe mode where you can do yada yada", ...

{% end %}

Unsafe Rust has a [minimal set of helpful superpowers][5]. It's far from an optimization strategy on its own, but it helps make the language work for writing code that the compiler can't check!

For example, you can't write to some pin on a microcontroller and have the compiler know it will work. That's a 'you' problem! 🥹

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

...so let me preface this article with this analogy.

Calling “unsafe" as an escape for Rust's rigid system is the same as saying that C++ can do inline assembly so you can copy/paste infinite optimizations done outside the compiler infrastructure. That defeats the purpose. We are analyzing what the language can do in normal operation is, not the backdoors that it allows to open when it gives in to operational pressure.

{% end %}

I don't know if this analogy works correctly. Inline assembly is rather unportable, but unsafe Rust always works when you check manually and seal it behind an internal implementation. It's your job to avoid invariance, but portability is generally acceptable after you're all done!

However, Rust indeed starts to lose value when you need to skirt unsafe rules often. In that case, languages like C or C++ are easier to deal with for these operations in particular, though I'd choose to push through! 😄

## The Similarities

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

In principle, both Rust and C++ are compiled languages that use 95% of the LLVM compiler infrastructure. Rust and C++ are translated into IR, where most (arguably, all) optimizations are made.

Below, I took a picture [from an article on ResearchGate](https://www.researchgate.net/publication/351511545_Customized_Monte_Carlo_Tree_Search_for_LLVMPolly's_Composable_Loop_Optimization_Transformations) about loop optimization. Notice that in the first “Clang" box no optimization is being done, only preprocessing (macros, etc.) and desugaring (e.g., lambdas). All optimizations are done in the second box, where C++ no longer exists as a language.

[...]

The same logic applies to languages like Julia, Scala, and Rust. Rust adds three extra "IR" layers (HLIR, THIR, MIR) in successive lowering steps. Still, these extra layers are related to type checking and safety mechanisms (e.g., the well-known Rust's borrow checker).

A parenthesis here. Rust claims that there are "Rust-specific optimizations" done at MIR level that will, in the future, impact performance significantly. I have found [a list of such transformations](https://github.com/rust-lang/rust/tree/master/compiler/rustc_mir_transform/src), but I could not assess nor prove that the performance impact is real or just rhetorical. My [post on Reddit](https://www.reddit.com/r/rust/comments/180l7in/rustspecific_mir_optimizations/) asking for comments on the subject has also not produced any conclusive proof either way, so even the experts are on the fence on this one. I feel it was more wishful thinking on the part of the documentation writer at the time.

{% end %}

I can only talk about some of this - I still need to familiarize myself with how C++ does its compilation. I do know about Rust's MIR, though!

As the Project's [introductory blog post][6] noted, [Rust's MIR][7] layer generally intends to aid in compilation times and precision type-checking. That post mentioned theoretical runtime performance improvements waiting for tangible changes, including [non-zeroing drops][8] and [`Try` (`?`) optimizations][9].

You can find some good threads to follow using the [Rust issue tracker][10]!

## Reasons for C++

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

I need to recall that this publication is about low latency trading and as such our tradeoffs when deciding if something is worth it will always lean towards the item that leads to performance increases. If we were a company that produced web servers or web browsers, then the conclusions below would probably be of a different nature.

Performance is not only instruction by instruction execution time-stamping. Before one gets to the actual instructions, an entire pipeline of human and machine interactions comes into play. Some of these factors will be discussed below...

{% end %}

Sure, I understand the need for high-performance applications in economic fields! However, when writing `std` C++, you tend to avoid getting that. The fantastic Amos (from [fasterthanlime][11]) made [a nuanced video][12] on this subject, though with a broader scope than this article.

Amazon's incredible AWS also [spoke on Rust's time and energy efficiency][13] before using it across all their systems!

Many developers enjoy knowing that the compiler checks their assumptions. The unwieldy, awkward `unsafe` functions don't ruin the language - especially when writing mission-critical systems!

Still, some folks like having that low-level feel from C and, sometimes, C++.

### The Safety Toll

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

[...]

Rust tends to be more strict than C++ - it is its raison d'etre - and that means more real-time checks. Although integer underflows and overflows are only checked in debug mode, memory accesses in arrays are constantly checked for bounds unless you're in unsafe mode, which defeats the purpose. Those checks alone take a significant toll. They slow down the process compared to the respective, naturally unchecked, C++ code.

But is that an apples-to-apples comparison? Well, yes, if you are going to list the "safety" of Rust compared to C++ as a pro, then it's just fair to list the performance hit of such safety in regards to execution speed.

{% end %}

Yes, Rust is more strict than C++ when compiled with default options.

Pro-tip: when writing good C++ code, grab some compiler flags! If I must write C++, I tend to use these flags with Clang: `-U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=2 -fstack-protector -Wall -Wextra -pedantic -fsanitize=undefined -Og -lstdc++ -ffsanitize=address,undefined`

Anyways, back to the topic at hand...

With its runtime checks, Rust prevents buffer overflow attacks entirely! However, if you need to get your hands dirty, you can [remove them without using unsafe blocks][14]. The Rusty optimizations shown in that link are hugging the hardware - it feels like C, but without the headache. Best of all, there's no need to use lengthy, annoying workarounds - you're just implementing basic logic.

If you need absolute performance, you can also disable panics and [ask your program to abort instead][15].

### Undefined Behavior

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

C++ relies extensively on undefined behavior as an optimization enabler. UB can make a brutal difference in many cases. Rust, on the other hand, does not and cannot leave knots untied, because its focus on security.

...[please see [the original article](https://lucisqr.substack.com/i/139049291/undefined-behavior) for an example]...

However, when you consider the edge cases, things are not so clear. What happens if you multiply 2^30 by two and divide by two? 2^30 times two is 0x80000000 or -2147483648, a negative integer. Divided by two, it is -1073741824 and not 1073741824. That’s a big difference!

So why C++ ignored that possible edge case? Because signed overflow in C++ is undefined behavior and as far as the compiler is concerned, it will never happen. With the edge case reasoned away by the language, the compiler is free to implement that optimization.

If you compile a similar function in Rust, you will see that Rust will be unable to optimize that expression away because both signed and unsigned overflows in Rust are well defined in the language as a two’s complement. This results in the assembly below where in the first line (leal) the result of the multiplication by two is computed (in fact it computes value+value instead of value times two) and then the result is halved by shifting it right (sar).

{% end %}

I appreciate your points on undefined behavior! However, Rust now performs this operation [as expected][16]!

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

Again, pundits will state that you could have called one of the arithmetic wrapping functions, which will force the compiler to do this optimization. Well you can do many things but here we are measuring the effect of the compiler over two similar blocks of code.

{% end %}

The wrapping functions you're talking about can be annoying. However, if you have your own types, you can use [operator overloading][17] like C++! It's [surprisingly flexible][18].

### Compiler Choice

Sorry, but I *don't know* enough about this to speak about it. It's an interesting point, though!

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

[...]

We analized this [in a previous article](https://lucisqr.substack.com/p/shared-lto-plt-friends-or-foes).

{% end %}

gross! 😄

### Resources Available

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

Although the scenario is changing rapidly, the pool of engineers with C++ background is much larger than the pool of Rust developers. Also, the quantity of teaching material and resources available to learn the language is currently overwhelmingly more abundant on the C++ side.

So if I want to bet safe in the development of a new system, I have to go with C++.

{% end %}

I understand your ideas here! Rust is still a growing language - it has yet to take over the world.

However, it's worth remembering that writing C and C++ differs from writing **exceptional** C and C++. These languages are deeply complex - top engineers at Google found a [significant decrease in memory safety vulnerabilities][19] after adopting Rust for mission-critical components! Microsoft found [similar results][20] with their internal teams.

Still, your point about talent is a good one. That's why helping new folks learn the language is so important!

### The Dubious Benefits of Safety

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

When Rust is brought up in a meeting, the first pro factor is language safety. But safety against what?

In many years of coding C++, very rarely I experienced a stack overflow or segmentation fault. It is literally not an issue in every codebase I have worked with.

Are we talking about safety against hackers? The large majority of C++ applications are non-public facing. So much that most datacenter machines run with mitigations turned off since there is absolutely no possibility of contact of those machines with bad actors. So hacker safety is not a concern that I, in particular, would care unless I’m coding a web server.

{% end %}

I understand your point about having systems that are 'good enough.' However, Rust's memory safety is as much about comfort as it is protection.

When your code passes the Rust compiler, you know that any remaining mistakes are logical errors. With [Rust's testing support][21], you can trivially test your logic, too! (note: [Jon Gjengset's book][22] *Rust for Rustaceans* has a glorious chapter on writing good tests!)

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

Or are we talking about protection against crashes? Well don’t get me started on this one. First, crashes can happen in any language, with the same frequency.

I often point to [this article](https://www.codeproject.com/Articles/21253/If-Only-We-d-Used-ANTS-Profiler-Earlier) about Princeton’s unmanned vehicle team competing in the 2007’s DARPA challenge as an example of how even a heavily protected, garbage collected language as C# can crash and burn, leaving your process unusable.

{% end %}

The article you linked is pretty exciting! However, it talks about memory leaks. These are generally caught by Clippy or `rustc` itself! [Miri can step in][23] and finish everything for good when they don't.

{% quote(link="https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive", text="Why I think C++ is still a desirable coding platform compared to Rust", author="Henrique Bucher") %}

Exceptions can throw a Java process back to main and helpless on how to proceed, the process will puke an undecipherable excuse and bail out. Oh but C++’s segmentation fault is much worse! say the haters.

However [segfaults can be caught](https://feepingcreature.github.io/handling.html) with a signal trap and handled cleanly like any Java/C# exceptions.

{% end %}

Exceptions are never handled cleanly - in any language. [Rust has `catch_unwind`][24], but developers tend to use it so worker threads don't blow up the main thread and cause weird handling.

In other languages, exceptions tend to act like good old `GOTO` statements. Instead of being **exceptional**, they happen *everywhere -* [another fasterthanlime article][25] details API design and how errors can make interfaces feel... dreadful.

Still, your point is taken! C can use signal traps to perform some operations 'safely,' though the solution is platform-dependent and a bit janky. I'd be using something else for economic/systems programming purposes.

## Conclusion

While these points are worth considering, I'm unsure how general they are.

I still can't imagine using a language like C++ for programming systems used for economics. It's still desirable sometimes, especially when you already have so much put into it.

There's a special place in my heart for C and C++, but in mission-critical applications, their half-century of technical debt becomes a barrier to innovation and maintenance.

Rust is a complex language with many unique features to familiarize yourself with. However, its advantages are profoundly beneficial in most applications. Developers gain a deeper trust in their applications, have more insight into their code, and get modern comfort features that sometimes outshine languages like Python and Go!

Rust is ready for production use. While everyone should consider a project's bounds and requirements, Rust is often an excellent choice - no matter the situation!

{% conclusion() %}
Thank you for taking a look at my article!

Check out [Henrique Bucher's article and blog][26] if you haven't already - they're great reads!

Please let me know if you have any corrections, comments, or ideas for this post or others. You can <a href="https://github.com/onkoe/barretts-club/issues/new?title=%22problem%3A%20A%20Rusty%20Response%3A%20%22Why%20I%20think%20C%2b%2b%20is%20still%20a%20desirable%20coding%20platform%20compared%20to%20Rust%22&body=I%20found%20a%20problem%20in%20your%20article%20A%20Rusty%20Response%3A%20%27Why%20I%20think%20C%2b%2b%20is%20still%20a%20desirable%20coding%20platform%20compared%20to%20Rust%21%27%22%20Let%20me%20explain...%22">create a GitHub issue</a>, <a href="mailto:contact@barretts.club">email me</a>, or even respond to this article! Thanks again! 😄

{% end %}

[1]: https://doc.rust-lang.org/edition-guide/editions/
[2]: https://substack.com/@hbucher
[3]: https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive
[4]: https://archive.is/tsUFH
[5]: https://doc.rust-lang.org/nomicon/what-unsafe-does.html
[6]: https://blog.rust-lang.org/2016/04/19/MIR.html
[7]: https://rustc-dev-guide.rust-lang.org/mir/index.html
[8]: https://github.com/rust-lang/rust/issues/5016
[9]: https://github.com/rust-lang/rust/pull/66282
[10]: https://github.com/rust-lang/rust/issues?q=label%3AA-mir+label%3AI-slow+
[11]: https://fasterthanli.me/
[12]: https://www.youtube.com/watch?v=VMpSYJ_7aYM
[13]: https://aws.amazon.com/blogs/opensource/sustainability-with-rust/#Energy%20Efficient%20Program%20Lanugages
[14]: https://shnatsel.medium.com/how-to-avoid-bounds-checks-in-rust-without-unsafe-f65e618b4c1e
[15]: https://doc.rust-lang.org/rust-by-example/error/abort_unwind.html
[16]: https://godbolt.org/z/oM53rfsdE
[17]: https://doc.rust-lang.org/rust-by-example/trait/ops.html
[18]: https://wisha.page/posts/fun-rust-operators/
[19]: https://security.googleblog.com/2022/12/memory-safe-languages-in-android-13.html
[20]: https://msrc.microsoft.com/blog/2019/07/why-rust-for-safe-systems-programming/
[21]: https://doc.rust-lang.org/rust-by-example/testing.html
[22]: https://rust-for-rustaceans.com/
[23]: https://github.com/rust-lang/miri
[24]: https://doc.rust-lang.org/std/panic/fn.catch_unwind.html
[25]: https://fasterthanli.me/articles/abstracting-away-correctness
[26]: https://lucisqr.substack.com/p/why-i-think-c-is-still-a-very-attractive
