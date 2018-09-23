const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const articles = require('./articles.json');
const readAll = require('./readAll.js');
const read = require('./read.js')
const createArticle = require('./createArticle.js');
const updateArticle = require('./updateArticle.js');
const deleteArticle = require('./deleteArticle.js');
const createComment = require('./createComment.js');
const deleteComment = require('./deleteComment.js');

const handlers = {
	'/api/articles/readall': readAll,
	'/api/articles/read' : read,
	'/api/articles/create' : createArticle,
	'/api/articles/update' : updateArticle,
	'/api/articles/delete' : deleteArticle,
	'/api/comments/create' : createComment,
	'/api/comments/delete' : deleteComment
};

const server = http.createServer((req, res) => {
	parseBodyJson(req, (err, payload) => {
		const handler = getHandler(req.url);
		handler(req, res, payload, (err, result) => {
			if (err) {
				res.statusCode = err.code;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(err));
				return;
			}
			fs.createWriteStream('articles.json').write(JSON.stringify(articles));
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result));
		});
	});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
	return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
	cb({ code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		let params = JSON.parse(body);
		cb(null, params);
	});
}