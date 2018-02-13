import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const info = require('app/assets/info.svg');

const InfoIkon: React.StatelessComponent<{}> = () => (
	<CustomSVG iconRef={info.default} size={16} />
);

export default InfoIkon;
