let articles = require('./articles.json');
const ErrObj = { code: 400, message: 'Invalid request' };

module.exports.createComment = function createComment(req, res, payload, cb) {
    let ind = articles.findIndex(i => i.id == payload.articleId);
    if (ind != -1) {
        payload.id = Date.now();
        articles[ind].comments.push(payload);
        cb(null, articles);
    }
    else cb(ErrObj);
}