let articles = require('./articles.json');

module.exports.deleteArticle = function deleteArticle(req, res, payload, cb) {
    let ind = articles.findIndex(i => i.id == payload.id);
    if (ind != -1) {
        articles.splice(ind, 1);
        cb(null, 'ok');
    }
}