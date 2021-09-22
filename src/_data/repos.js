const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
  const url = 'https://api.github.com/users/marcusbillman/repos';
  try {
    const data = Cache(url, {
      duration: '1d',
      type: 'json',
    });
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};
