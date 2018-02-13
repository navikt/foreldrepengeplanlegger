import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const lukkInfo = require('app/assets/lukkInfo.svg');

const LukkInfoIkon: React.StatelessComponent<{}> = () => (
	<CustomSVG iconRef={lukkInfo.default} size={12} />
);

export default LukkInfoIkon;
