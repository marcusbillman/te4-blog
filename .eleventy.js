const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('src/scss');
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter('formattedDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  return {
    dir: {
      input: 'src',
    },
    passthroughFileCopy: true,
  };
};
