const {request} = require('gaxios');

// vp token = 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
// 'repo', 'read:org', 'workflow'
const pat = "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"
// token2 = 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
const client_id = "9618ec662e91703b6b17";
const client_secret = "ff0097ab8604cdb34264e72e51c32810a540721a";

module.exports.getGitAuthToken = async function() {
    const gitToken = await request({
        url: 'https://www.google.com',
        headers: {},
        timeout: 5000,
    }); 
    return gitToken;
}