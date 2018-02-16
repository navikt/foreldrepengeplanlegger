const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const configureDevServer = require('../webpack/devserver.config');

const decoratorData = {
	NAV_SCRIPTS: '<title>Foreldrepengeplanlegger</title>',
	NAV_STYLES: '',
	NAV_HEADING: '',
	NAV_FOOTER: ''
};

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(
	compiler,
	configureDevServer(decoratorData)
);

server.listen(8080, '127.0.0.1', () =>
	console.log('Started server on http://localhost:8080')
);
