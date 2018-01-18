const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const devServerConfig = require('../webpack/devserver.config');
const configDecorator = require('./decorator');

configDecorator(webpackConfig).then((config) => {
	const compiler = webpack(config);
	const server = new WebpackDevServer(compiler, devServerConfig);
	server.listen(8080, '127.0.0.1', () =>
		console.log('Started server on http://localhost:8080')
	);
});
