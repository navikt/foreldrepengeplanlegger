import * as React from 'react';
import CustomSVG, { SVGSize } from 'shared/components/customSvg/CustomSVG';

const svg = {
	intro: require('./assets/veileder-intro.svg').default,
	info: require('./assets/veileder-info.svg').default
};

export interface Props {
	type: 'info' | 'intro';
	size?: SVGSize;
	svgClassName?: string;
}

const Veileder: React.StatelessComponent<Props> = ({
	type,
	size,
	svgClassName
}) => {
	return <CustomSVG iconRef={svg[type]} size={size} className={svgClassName} />;
};

export default Veileder;
