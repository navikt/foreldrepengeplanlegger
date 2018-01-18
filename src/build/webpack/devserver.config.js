require('dotenv').config();

module.exports = {
	contentBase: 'dist',
	watchContentBase: true,
	historyApiFallback: true,
	stats: 'minimal',
	proxy: {
		'/rest': process.env.FORELDREPENGESOKNAD_API_URL,
		changeOrigin: true
	}
};
