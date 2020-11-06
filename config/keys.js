// keys.js - figure out what set of keys to return
if (process.env.NODE_ENV === 'production') {
    // In production - return prod set of keys
    module.exports = require('./prod');
} else {
    // In development - return dev set of keys
    module.exports = require('./dev');
}
