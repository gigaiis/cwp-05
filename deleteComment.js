let articles = require('./articles.json');

module.exports.deleteComment = function deleteComment(req, res, payload, cb) {
    let index = articles.findIndex(i => i.id == payload.articleId);
    let indexOfComment = articles[index].comments.findIndex(i => i.id == payload.id);
    if ((index != -1) && (indexOfComment != -1)) {
        articles[index].comments.splice(indexOfComment, 1);
        cb(null, articles);
    }
}