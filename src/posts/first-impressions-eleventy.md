---
title: My first impressions with Eleventy
subtitle: The good and bad after a few days' use.
date: 2021-09-14
---

This is a short post summarizing my first impressions with using Eleventy to build this blog. Note that I've only used these tools for a few days, so this is based on my very limited knowledge.

## Good experiences

- It's very easy to create pages and have Markdown files automatically be served as HTML pages.
- Because Eleventy uses Markdown files in the site's repository, you don't need a CMS and you get version control through the existing Git repo, but editors can still use non-developer tools to write content.
- Configuration is minimal, and the development server and build tools work out of the box.
- Eleventy seems to have a rather beginner-friendly system for adding plugins and filters using the `.eleventy.js` config file.
- Specifying front matter values like title and date inside Markdown files feels intuitive.
- Liquid templates and support for multiple templating languages makes Eleventy flexible, both when picking your tools and during development.

## Bad experiences

- The interplay between Markdown, Nunjucks and Liquid templates confuses me. I'm not fully understanding where I can use what syntax, so as a result I've gotten many strange errors.
- Formatting dates was more complicated than I wanted and the official docs did not help me sufficiently. Formatted date should be a built-in filter.

Overall, Eleventy seems pretty nice except for a few annoyances. Though I'm still learning, so that could change. Also, I enjoy working with Vue and its components, so I might look into a Vue + Eleventy starter example to see if I like that structure and workflow better than using Nunjucks includes.
