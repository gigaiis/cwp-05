const log = require('./log');
const file = require('fs').createWriteStream('logfile.log');
let articles = require('./articles.json');

module.exports.read = function read(req, res, payload, cb) {
    let article = articles.find(i => i.id == payload.id);
    if (article != undefined) cb(null, article);
}