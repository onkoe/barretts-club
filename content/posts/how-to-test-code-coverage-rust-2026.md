+++
title = "How to Check Code Coverage in Rust"
description = "Codecov can be useful! Here's how to check..."
date = 2026-03-12
updated = 2026-03-22
[taxonomies]
tags = ["rust", "programming", "testing"]
+++

The [`rustc`-approved way to check code coverage](https://doc.rust-lang.org/nightly/rustc/instrument-coverage.html) in Rust is long and arduous. In my view, it's just too technical for most users to be comfy using it.

## A simpler way

Here's an easier way to check codecov in your Rust workspace:

1. Install [`cargo-binstall`](https://github.com/cargo-bins/cargo-binstall)
1. Use that to [get `cargo-tarpaulin`](https://github.com/xd009642/tarpaulin#usage)
1. Run it to check code coverage in your project

```bash
# install cargo-binstall
$ curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash

# get cargo-tarpaulin
$ cargo binstall cargo-tarpaulin

# cd to your project
$ cd my_project

# run cargo-tarpaulin.
#
# note: you can remove `--out Html` if you just want some percentages
~/my_project $ cargo tarpaulin --engine llvm --out Html
```

That'll generate a file called `tarpaulin-report.html` in the root of your workspace. You can open it using a web browser to take a look:

{{ cache_image(alt="A screenshot of the cargo-tarpaulin output HTML from my project, raves-metadata.", link="images/how-to-test-code-coverage-rust-2026/tarpaulin-report.avif", filetype="avif") }}

You can click on the crates/files to view more information about the exact coverage.
