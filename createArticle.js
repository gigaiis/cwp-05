let articles = require('./articles.json');

module.exports.createArticle = function createArticle(req, res, payload, cb) {
    payload.id = Date.now();
    articles.push(payload);
    cb(null, payload);
}