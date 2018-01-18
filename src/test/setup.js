const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const exposedProperties = ['window', 'document'];

const dom = new JSDOM('');

global.document = dom.window.document;
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
	if (typeof global[property] === 'undefined') {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});

global.HTMLElement = dom.window.HTMLElement;
