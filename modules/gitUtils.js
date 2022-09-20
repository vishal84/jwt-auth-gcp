const {request} = require('gaxios');

// vp token = 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
// 'repo', 'read:org', 'workflow'
const pat = ""
// token2 = 
const client_id = "";
const client_secret = "";

module.exports.getGitAuthToken = async function() {
    const gitToken = await request({
        url: 'https://www.google.com',
        headers: {},
        timeout: 5000,
    }); 
    return gitToken;
}
