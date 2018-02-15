require('dotenv').config();
const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

const requestDecorator = () =>
	axios({
		method: 'get',
		url: `${
			process.env.APPRES_CMS_URL
		}/common-html/v4/navno?header=true&styles=true&scripts=true&footer=true`,
		validateStatus: (status) => status >= 200 || status === 302
	});

const getDecorator = (noDecorator) =>
	requestDecorator(noDecorator).then(
		(decoratorResponse) => {
			const html = decoratorResponse.data;
			const { document } = new JSDOM(html).window;
			return {
				NAV_SCRIPTS: document.getElementById('scripts').innerHTML,
				NAV_STYLES: document.getElementById('styles').innerHTML,
				NAV_HEADING: document.getElementById('header').innerHTML,
				NAV_FOOTER: document.getElementById('footer').innerHTML
			};
		},
		() => {
			console.warn('Decorator failed, running clean mode');
			return {
				NAV_SCRIPTS: '',
				NAV_STYLES: '',
				NAV_HEADING: '',
				NAV_FOOTER: ''
			};
		}
	);

module.exports = getDecorator;
