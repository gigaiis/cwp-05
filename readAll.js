let articles = require('./articles.json');

module.exports.readAll = function readAll(req, res, payload, cb) {
    cb(null, articles);
}