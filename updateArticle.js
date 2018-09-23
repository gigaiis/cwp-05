const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');

module.exports.updateArticle = function updateArticle(req, res, payload, cb) {
    let ind = articles.findIndex(i => i.id == payload.id);
    if (ind != -1) {
    	log(file, '/api/articles/update', payload);
        articles.splice(ind, 1, payload);
        cb(null, articles[ind]);
    } else cb({ code: 404, message: 'Not found' });
}