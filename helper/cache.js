const _NodeCache = require('node-cache');
const cache = new _NodeCache();

const Cache = {

    // Seta Cache com tempo definido
    set: (key, value) => {
        return cache.set(key, value, 60 * process.env.CACHE_TIME);
    },

    // Litura do cache pelo key
    get: (key) => {
        return cache.get(key);
    }

}

module.exports = Cache;