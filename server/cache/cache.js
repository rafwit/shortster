const { promisify } = require('util');

const redis = require('redis');
const client = redis.createClient();

const rGet = promisify(client.get).bind(client);
const rSetex = promisify(client.setex).bind(client);

function cache(key, ttl, query) {
  return async function cachedFn(...props) {
    const chachedResponse = await rGet(key);
    if (chachedResponse !== null) {
      return chachedResponse;
    }

    const result = await query;
    await rSetex(key, ttl, JSON.stringify(result));
    return result;
  };
}

module.exports = { cache };
