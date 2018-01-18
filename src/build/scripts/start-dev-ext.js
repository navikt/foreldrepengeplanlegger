const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const devServerConfig = require('../webpack/devserver.config');
const configDecorator = require('./decorator');

configDecorator(webpackConfig, true).then((config) => {
	const compiler = webpack(config);
	const server = new WebpackDevServer(compiler, devServerConfig);
	server.listen(8080, '0.0.0.0', () =>
		console.log('Started server on http://localhost:8080')
	);
});
