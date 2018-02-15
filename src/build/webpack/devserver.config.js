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
				'/permisjonsplanlegger/?',
				/^\/permisjonsplanlegger\/(?!.*dist).*$/
			],
			(req, res) => {
				res.render(
					'index.html',
					Object.assign(
						{
							REST_API_URL: process.env.PERMISJONSPLANLEGGER_API_URL
						},
						decoratorFragments
					)
				);
			}
		);
	},
	watchContentBase: true,
	quiet: false,
	noInfo: false,
	stats: 'minimal',
	publicPath: '/permisjonsplanlegger/dist'
});

module.exports = configureDevServer;
