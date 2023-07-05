# Riffy Blog

The next iteration of **Riffy Blog**

**DEPRECATED: This site should still be able to study as a tempalte. But it will no longer be maintained anymore since I merged blog into my [frontpage](https://github.com/rayriffy/rayriffy.com) repository**

## Core changes

- Near **0kB** of JavaScript thanks to [Astro](https://astro.build/)
- Design by using [Tailwind](https://tailwindcss.com)

## Demo

[blog.rayriffy.com](https://blog.rayriffy.com)

## To install

Create a workspace in [Contentful](https://contentful.com/) and import content model with [this](model/contentful.json) provided JSON files.

Then, provide Contentful API keys by copying `.env.example` to `.env`. During developnent, scripts are going to use token `CONTENTFUL_PREVIEW_ACCESS_TOKEN` to obtain contents from CMS. Which means you will be able to see drafts or unpublished articles in local development, but not in production CI.

With that cleared, you can generate `*.md` Markdown contents by running generator scripts.

```
$ pnpm data build
```

If there're any encounter isuues related to the local contents, scripts can be use to delete all `*.md` as well.

```
$ pnpm data clean
```

## To develop

Start local server with following command.

```
$ pnpm dev
```

## To build

```
pnpm build
```

As a result, you will get `dist/` directory which contains all static contents to be deployed.
