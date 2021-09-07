---
title: Getting started with Eleventy
---

Today I tried [eleventy](https://www.11ty.dev/) for the first time. It describes itself as "a simpler static site generator" and I have to say that it felt rather smooth to get up and running and gives you a lot of control. I'm using it to create this blog right now.

## Get started

With Node and npm installed, create a Git repository and create a `package.json` file using `npm init -y`.

Install eleventy

```bash
npm install @11ty/eleventy
```

Edit the start script in `package.json`.

```json
"scripts": {
  "start": "eleventy --serve"
}
```

Create an `index.md` file to test that eleventy's server is working. Now start said server using the script we just added:

```bash
npm run start
```

The contents of the Markdown file should be served at `localhost:8080/`.
