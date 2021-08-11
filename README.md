Riffy Blog
===

The next iteration of **Riffy Blog**

Core changes
---

- I opt-out from [Gatsby](https://gatsbyjs.com) to [Next](https:/nextjs.org) because old site is now considered to be too hard to maintain
- Reduce lots of JS workloads and focus on performance
- Design by using [Tailwind](https://tailwindcss.com)

Demo
---

[blog.rayriffy.com](https://blog.rayriffy.com)

To install
---

Create a workspace in [Contentful](https://contentful.com/) and import content model with [this](model/contentful.json) provided JSON files.

Then, create an API token and put those into your environment variables

```sh
$ export CONTENTFUL_SPACE_ID=<SPACE ID HERE>
$ export CONTENTFUL_ACCESS_TOKEN=<ACCESS TOKEN HERE>
```

If you want to use preview feature to show draft post, do following steps as well. First, add additional environment variables.

```sh
$ export CONTENTFUL_PREVIEW_ACCESS_TOKEN=<PREVIEW TOKEN HERE>
$ export CONTENTFUL_PREVIEW_SECRET=<YOUR SECRET PASSWORD TO ENABLE PREVIEW MODE>
```

and then add preview URL into Contentful by going to **Settings** > **Content Preview** and then create new content preview, checks for **Blog Post** type and add following URL into input by replace `<CONTENTFUL_PREVIEW_SECRET>` with your secret

```
http://localhost:3000/api/preview?secret=<CONTENTFUL_PREVIEW_SECRET>&slug={entry.fields.slug}
```

If you cannot find **BLog Post** to check, means you did not add Preview into sidebar yet. Doing this by click **Content Model** > **Blog Post** > **Sidebar** and click **Preview** in *Available items*

![](https://storage.rayriffy.com/files/image/421136F1-ADA0-4398-B4CA-1B2860727F56.jpeg)

If you do this correctly, you should be able to click preview and using this feature right away. But be warned, you can only use this with your localhost environment, if you trying to use this on production deployment it going to soft-lock you. Solve soft-lock by clearing your cookies.



To develop
---

```
pnpm dev
```

To build
---

```
pnpm build
```
