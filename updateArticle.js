let articles = require('./articles.json');

module.exports.updateArticle = function updateArticle(req, res, payload, cb) {
    let ind = articles.findIndex(i => i.id == payload.id);
    if(ind != -1) {
        articles.splice(ind, 1, payload);
        cb(null, articles[ind]);
    }
}