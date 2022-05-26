const _NodeCache = require('node-cache');
const cache = new _NodeCache();

Cache = {

    set: (key, value) => {
        return cache.set(key, value, 60 * process.env.CACHE_TIME);
    },

    get: (key) => {
        return cache.get(key);
    }

}

module.exports = Cache;