require('dotenv').config();
const jsdom = require('jsdom');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const axios = require('axios');

const { JSDOM } = jsdom;

const getDecorator = (decoratorUrl) =>
	axios({
		method: 'get',
		url: decoratorUrl,
		validateStatus: (status) => status >= 200 || status === 302
	});

const reconfigureBuildWithDecorator = (decoratorResponse, config) => {
	const html = decoratorResponse.data;
	const { document } = new JSDOM(html).window;
	try {
		const header = document.getElementById('header').innerHTML;
		const footer = document.getElementById('footer').innerHTML;
		const scripts = document.getElementById('scripts').innerHTML;
		const styles = document.getElementById('styles').innerHTML;
		config.plugins.push(
			new HtmlWebpackPlugin({
				template: './src/app/index.html',
				inject: 'body',
				NAVHeading: header,
				NAVFooter: footer,
				NAVScripts: scripts,
				NAVStyles: styles
			})
		);
	} catch (e) {
		console.error('Dekoratør feilet; starter uten dekoratør.');
		console.error(e);
		config.plugins.push(
			new HtmlWebpackPlugin({
				template: './src/app/index.html',
				inject: 'body',
				NAVHeading: '',
				NAVFooter: '',
				NAVScripts: '',
				NAVStyles: ''
			})
		);
	}

	return config;
};

const prodDecorator =
	'http://appres.nav.no/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true';
const testDecorator =
	'http://appres-t1.nav.no/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true';

const configDecorator = (config, external) =>
	getDecorator(external ? prodDecorator : testDecorator).then((response) =>
		reconfigureBuildWithDecorator(response, config)
	);

module.exports = configDecorator;
