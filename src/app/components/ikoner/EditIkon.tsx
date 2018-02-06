import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const pencil = require('app/assets/pencil.svg');

const TerminIkon: React.StatelessComponent<{}> = () => <CustomSVG iconRef={pencil.default} size={14} />;

export default TerminIkon;
