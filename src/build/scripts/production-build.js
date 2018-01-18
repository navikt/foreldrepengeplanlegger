const webpack = require('webpack');
const webpackConfig = require('../webpack/webpack.config.production');
const configDecorator = require('./decorator');

const cb = (err) => {
	if (err) {
		console.log('Build failed');
		console.log('Error: ', err);
	} else {
		console.log('Build success');
	}
};

configDecorator(webpackConfig).then((config) => {
	const compiler = webpack(config);
	compiler.run(cb);
});
