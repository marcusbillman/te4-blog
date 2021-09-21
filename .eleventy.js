const Image = require('@11ty/eleventy-img');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [400, 600],
    formats: ['webp', 'jpeg'],
    outputDir: './_site/img/',
  });

  let imageAttributes = {
    alt,
    sizes: sizes || '100%',
    loading: 'lazy',
    decoding: 'async',
  };

  // Throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline',
  });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/scss');
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter('formattedDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  return {
    dir: {
      input: 'src',
    },
    passthroughFileCopy: true,
  };
};
