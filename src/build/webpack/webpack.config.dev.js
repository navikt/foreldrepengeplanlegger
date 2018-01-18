const webpackConfig = require('./webpack.config.global.js');
const devServerConfig = require('./devserver.config');

webpackConfig.entry = webpackConfig.entry.concat([
	'webpack-dev-server/client?http://localhost:8080'
]);

module.exports = Object.assign(webpackConfig, {
	devtool: 'inline-source-map',
	devServer: devServerConfig
});
