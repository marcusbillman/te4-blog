const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/scss');
  eleventyConfig.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: 'src',
    },
    passthroughFileCopy: true,
  };
};
