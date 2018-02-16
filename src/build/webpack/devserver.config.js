require('dotenv').config();
const mustacheExpress = require('mustache-express');

const configureDevServer = (decoratorFragments) => ({
	before: (app) => {
		app.engine('html', mustacheExpress());
		app.set('views', `${__dirname}/../../../dist/dev`);
		app.set('view engine', 'mustache');
		app.get(
			[
				'/',
				'/foreldrepengeplanlegger/?',
				/^\/foreldrepengeplanlegger\/(?!.*dist).*$/
			],
			(req, res) => {
				res.render('index.html', Object.assign({}, decoratorFragments));
			}
		);
	},
	watchContentBase: true,
	quiet: false,
	noInfo: false,
	stats: 'minimal',
	publicPath: '/foreldrepengeplanlegger/dist'
});

module.exports = configureDevServer;
