import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const veileder = require('app/assets/veileder.svg');

const VeilederIkon: React.StatelessComponent<{ size?: number }> = ({
	size = 28
}) => <CustomSVG iconRef={veileder.default} size={size} />;

export default VeilederIkon;
