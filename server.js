require('dotenv').config();

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const getDecorator = require('./src/build/scripts/decorator');

const server = express();

server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = (decoratorFragments) =>
	new Promise((resolve, reject) => {
		server.render(
			'index.html',
			Object.assign({}, decoratorFragments),
			(err, html) => {
				if (err) {
					reject(err);
				} else {
					resolve(html);
				}
			}
		);
	});

const startServer = (html) => {
	server.use(
		'/foreldrepengeplanlegger/dist/js',
		express.static(path.resolve(__dirname, 'dist/js'))
	);
	server.use(
		'/foreldrepengeplanlegger/dist/css',
		express.static(path.resolve(__dirname, 'dist/css'))
	);

	server.get(
		[
			'/',
			'/foreldrepengeplanlegger/?',
			/^\/foreldrepengeplanlegger\/(?!.*dist).*$/
		],
		(req, res) => {
			res.send(html);
		}
	);

	server.get('/foreldrepengeplanlegger/internal/isAlive', (req, res) => res.sendStatus(200));
	server.get('/foreldrepengeplanlegger/internal/isReady', (req, res) => res.sendStatus(200));

	const port = process.env.PORT || 8080;
	server.listen(port, () => {
		console.log(`App listening on port: ${port}`);
	});
};

const logError = (errorMessage, details) => console.log(errorMessage, details);

getDecorator()
	.then(renderApp, (error) => logError('Failed to get decorator', error))
	.then(startServer, (error) => logError('Failed to render app', error));
