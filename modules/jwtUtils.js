const jwt = require('jsonwebtoken');
const {request} = require('gaxios');

module.exports.decodeJWT = function(token) {
    
    try {
        var decoded = jwt.decode(token, {complete: true});
    } catch (e) {
        console.error(e);
        res.status(500).send('Error decoding provided JWT.');
    }

    return decoded;
}

module.exports.keysObject = async function() {
    
    const keysObject = await request({
        url: 'https://www.googleapis.com/oauth2/v1/certs',
        headers: {},
        timeout: 5000,
    });
    return keysObject.data;
}