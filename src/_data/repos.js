const axios = require('axios');

module.exports = async () => {
  axios
    .get('https://api.github.com/users/marcusbillman/repos')
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
