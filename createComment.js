const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');

module.exports.createComment = function createComment(req, res, payload, cb) {
    let ind = articles.findIndex(i => i.id == payload.articleId);
    if (ind != -1) {
    	log(file, '/api/comments/create', payload);
        payload.id = Date.now();
        articles[ind].comments.push(payload);
        cb(null, articles);
    }
    else cb({ code: 400, message: 'Invalid request' });
}