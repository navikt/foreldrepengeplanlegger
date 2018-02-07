const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.config.dev');
const devServerConfig = require('../webpack/devserver.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

webpackConfig.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/app/index.html',
		inject: 'body',
		NAVHeading: '',
		NAVFooter: '',
		NAVScripts: '',
		NAVStyles: ''
	})
);

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerConfig);
server.listen(8080, '0.0.0.0', () =>
	console.log('Started server on http://localhost:8080')
);
