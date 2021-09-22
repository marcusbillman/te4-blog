---
title: Getting started with Eleventy
subtitle: Creating a simple blog using Eleventy, Nunjucks and Sass.
date: 2021-09-08
---

{% raw %}

[Eleventy](https://www.11ty.dev/) is a Static Site Generator (SSG). On a statically generated website, all pages are generated on a server before anyone visits it. All heavy lifting is done beforehand, so when someone does visit your site, the server can simply serve them with the final HTML and CSS documents. This way, the visitor doesn't need to wait for the server to render each web page. An SSG is perfect for websites with content that is consumed as-is, such as wikis or blogs.

In this tutorial, we'll be creating a simple blog using Eleventy, Nunjucks and Sass.

## Install the tools

With Node and npm installed, create a Git repository in any way you'd like, open it up in your editor, and initialize the repo with a `package.json` file.

```bash
npm init -y
```

Now let's install Eleventy and Sass. In order to run both Eleventy's dev server and Sass' watcher using a single npm script, we're also installing `npm-run-all`.

```bash
npm install @11ty/eleventy npm-run-all sass
```

Let's set up `watch` and `build` scripts for both Eleventy and Sass. Add these scripts to `package.json`:

```json
"scripts": {
  "watch:sass": "sass --no-source-map --watch src/scss:_site/css",
  "watch:eleventy": "eleventy --serve",
  "build:sass": "sass --no-source-map src/scss:_site/css",
  "build:eleventy": "eleventy",
  "start": "npm-run-all --parallel watch:*",
  "build": "npm-run-all --parallel build:*"
}
```

Create an `index.md` file with some dummy content to test that Eleventy's dev server is working. Now start said server using one of the scripts we just added:

```bash
npm run start
```

The contents of the Markdown file should be visible in the browser at `localhost:8080/`.

## Configure Eleventy

In the project root, create a file called `.eleventy.js` with these contents:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/scss');
  return {
    dir: {
      input: 'src',
    },
    passthroughFileCopy: true,
  };
};
```

The above settings tell Eleventy to use the `src` directory for source code and content, and enables the Sass compiler to watch the `src/scss` directory that we'll create later. By default, the site's static output will be placed in the `_site` directory. `passthroughFileCopy: true` ensures that the compiled CSS files get copied to the output directory so that the stylesheets can be found by the visitor's browser.

Move `index.md` inside the `src` directory and check that it still loads in the browser at `localhost:8080/`. You might need to restart Eleventy's dev server using `Ctrl+C` and `npm run start` in the terminal.

Now let's add the site's title, your name and your email as metadata that can be used throughout those pages and posts without having to retype it all. Create a directory inside `src` called `_data`. Inside that directory, create `meta.json` and add your details. All values inside the `_data` directory will be accessible in all templates and pages.

```json
{
  "title": "My awesome blog",
  "author.name": "Marcus Billman",
  "author.email": "hello@marcusbillman.com"
}
```

## Base layout, navbar and footer

Create the directory `src/_includes` and inside, create `base.njk`. This will be our base layout that all other pages extend from. We'll add this basic markup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ meta.title }}</title>
    <link rel="stylesheet" href="/css/main.css" />
  </head>
  <body>
    {% include "components/navigation.njk" %}
    <main class="container">{{ content | safe }}</main>
    {% include "components/footer.njk" %}
  </body>
</html>
```

`meta.title` comes from the `meta.json` file we just created. `{{ content | safe }}` will be replaced with the contents of any file that extends from this base layout. We'll worry about the stylesheet later on. As you can see, `base.njk` also includes two reusable components: a navbar at `src/_includes/components/navigation.njk` and a footer at `src/_includes/components/footer.njk`. We'll need to create both of those files.

We'll start with the navbar. In order to keep a single source of truth, let's create a file called `navigation.json` inside `src/_data`. This file will hold our list of pages that the navbar can pull from:

```json
{
  "items": [
    {
      "text": "Home",
      "url": "/"
    },
    {
      "text": "Blog",
      "url": "/blog"
    }
  ]
}
```

Now let's create the navbar component in the file `src/_includes/components/navigation.njk`:

```html
{% if navigation.items %}
<nav>
  <ul>
    {% for item in navigation.items %}
    <li>
      <a href="{{ item.url }}">{{ item.text }}</a>
    </li>
    {% endfor %}
  </ul>
</nav>
{% endif %}
```

The for loop inside the `ul` element will create one `li` element for each navigation link in the `navigation.json` file.

For the footer, we'll write this markup inside `src/_includes/components/footer.njk` and populate it with some metadata:

```html
<footer class="container">
  <p>
    This page is created by
    <a href="mailto:{{meta.author.email}}">{{meta.author.name}}</a>.
  </p>
  <p>All text and content &copy; {{meta.author.name}}.</p>
  <p>
    This is version {{ pkg.version }} of this site and the source is available
    on <a href="{{ pkg.homepage }}">GitHub</a>.
  </p>
</footer>
```

As you can see, there are other globally accessible variables that Eleventy can use, such as `pkg` that we're using to get values from `package.json`.

## Home page

So far, we've got a base layout that uses a navbar and footer component, but if you check your browser again, we're still just seeing that dummy content from `index.md`. Let's change that by actually using our base layout on the home page. Open up `index.md` and enter the following:

```plaintext
---
layout: base.njk
title: Home
---

# Welcome to my home page!

This page will blow your mind.
```

The lines in between the triple dashes make up the so-called front matter. This tells our home page to use the `base.njk` layout. Any contents after the front matter will be rendered instead of `{{ content | safe }}` on the base layout.

## Blog page

Okay, now we have a home page, but this is supposed to be a blog, so let's create a `blog.md` file inside the `src` directory. This file (or rather, an HTML document based on this file) will be served at `localhost:8080/blog`. We'll put this inside the `blog.md` file:

```plaintext
---
title: Blog
layout: blog.njk
---

## All posts
```

The blog page will use its own layout from the file `src/_includes/blog.njk`. Put the following inside that file:

```plaintext
---
layout: "base.njk"
title: "All posts"
---

{{ content | safe }}
{% include "components/post-list.njk" %}
```

The blog page will contain a list of all blog posts. I'm choosing to break this list out into its own component file called `src/_includes/components/post-list.njk`. Let's populate that file:

```html
<ul>
  {% for post in collections.post %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    {% if post.data.excerpt %}
    <p>{{ post.data.excerpt }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
```

Once again we're using a for loop, this time iterating over `collections.post`, which is an array containing all items that have the "post" tag. We'll be adding that tag to all blog posts soon.

The blog page now works, but there are no posts yet.

## Blog posts

Create a directory inside `src` called `blog`. Any directory inside `src` that doesn't start with an underscore will automatically be turned into a route that the visitor can accessed through their web browser. Inside the `blog` directory, create a file called `blog.json` with the following contents:

```json
{
  "layout": "base.njk",
  "tags": "post"
}
```

This will make it so that all pages in the `blog` directory will automatically get these specified values for `layout` and `tags` added to their front matter.

Now we're finally ready to add our first actual blog post. I'll create a `hello-world.md` file inside `blog` and write a little Markdown post in there.

```plaintext
---
title: Hello world!
---

This is my first blog post! Cool, huh?
```

The front matter of this file will be added in addition to the front matter inherited from `blog.json`. Now if we take a look in the web browser, we'll se our "Hello world!" post in the list at `localhost:8080/blog/` and the actual post is located at `localhost:8080/blog/hello-world`

## Styles

While default HTML has its character, we can spice it up using a Sass stylesheet. Create the directory `src/scss` and inside it, create a file called `main.scss`. Put any styles you want in here or do like me and just import a bunch of Sass partials:

```scss
@import 'reset';
@import 'type';
@import 'utilities/container';
@import 'components/navigation';
```

Make sure that your partial files have names beginning with an underscore and that you place them in the `scss` directory, either directly or in sub-directories.

## Deploying to Netlify

I hope you've been making commits with appropriate commit message throughout this tutorial, because now it's time to push those commits and head to [Netlify](www.netlify.com) to publish the site.

Sign in or create an account (you can skip the questions about your team if you'd like) and click the green "New site from Git" button. Authenticate with your GitHub account and choose the correct repository. For the build script, enter `npm run build`, make sure the publish directory is `_site`, and leave the rest as default. Click "Publish" and wait for Netlify's bots to do their magic. Voila! Your blog is live.

## Conclusion

And there we have it! New blog posts can be added as Markdown files in the `src/blog/` directory and will automatically be accessible through their URL, in addition to being displayed in the post list on the blog page. On every push to the production branch, Netlify will automatically build your blog and afterwards serve it to visitors statically for optimal performance.

{% endraw %}
