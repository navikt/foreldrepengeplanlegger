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
			const prop = 'innerHTML';

			return {
				NAV_SCRIPTS: document.getElementById('scripts')[prop],
				NAV_STYLES: document.getElementById('styles')[prop],
				NAV_HEADING: document.getElementById('header')[prop],
				NAV_FOOTER: document.getElementById('footer')[prop]
			};
		},
		() => ({
			NAV_SCRIPTS: '',
			NAV_STYLES: '',
			NAV_HEADING: '',
			NAV_FOOTER: ''
		})
	);

module.exports = getDecorator;
