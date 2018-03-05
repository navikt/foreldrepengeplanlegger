import { scroller, animateScroll } from 'react-scroll';

const defaultOptions = {
	duration: 1000,
	delay: 50,
	smooth: true
};

export function scrollToElement(id: string) {
	scroller.scrollTo(id, {
		...defaultOptions,
		offset: 0
	});
}

export function scrollToTop() {
	animateScroll.scrollToTop(defaultOptions);
}
