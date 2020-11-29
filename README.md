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
$ export CONTENTFUL_ACCESS_TOKEN=<PREVIEW TOKEN HERE>
```


To develop
---

```
yarn dev
```

To build
---

```
yarn build
```
