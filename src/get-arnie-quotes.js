const { httpGet } = require('./mock-http-interface');

const HTTP = {
  "STATUS_OK": 200
}

Object.freeze(HTTP);

const Message = (type, body) => {
  return {
    [type]: JSON.parse(body).message
  }
}

/**
 * @param {Array} URLS to call
 * @returns {Promise} promise resolves to results array.
 */
const getArnieQuotes = async (urls = []) => {
  const resolvers = urls.map(async (url) => {
    try {
      const { status, body } = await httpGet(url);
      if (status === HTTP.STATUS_OK) {
        return Message('Arnie Quote', body)
      }
      return Message('FAILURE', body)
    } catch (error) {
      return Message('FAILURE', error);
    }
  });

  return Promise.all(resolvers);
};

module.exports = {
  getArnieQuotes,
};
