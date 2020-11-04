// keys.js - figure out what set of keys to return
if (process.env.NODE_ENV === 'production') {
    console.log('PRODUCTION KEYS IN USE')
    // In production - return prod set of keys
    module.exports = require('./prod');
    console.log('GOOGLE CLIENT ID: ', process.env.GOOGLE_CLIENT_ID);
} else {
    // In development - return dev set of keys
    module.exports = require('./dev');
}
