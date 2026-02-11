// Adds a little permalink/anchor icon next to each heading.
//
// This simplifies copying links to specific parts of an article.

document.addEventListener("DOMContentLoaded", () => {
    // grab the whole `Element` from the doc.
    //
    // then, check if it's `null`
    var post = document.querySelector(".post");
    if (!post) {
        return;
    }

    // grab all headings
    var headings = post.querySelectorAll(
        "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]",
    );

    // make an "anchor" (permalink) for each one
    for (const heading of headings) {
        // create the anchor
        const anchor = document.createElement("a");
        anchor.className = "heading-anchor";

        // set the link to the heading
        anchor.href = `#${heading.id}`;

        // add accessibility/hover text
        anchor.setAttribute(
            "aria-label",
            `Permalink to ${heading.textContent.trim()}`,
        );

        // use fa icon
        const icon = document.createElement("i");
        icon.className = "fas fa-link";
        anchor.appendChild(icon);

        // put it after the heading
        heading.appendChild(anchor);
    }
});
