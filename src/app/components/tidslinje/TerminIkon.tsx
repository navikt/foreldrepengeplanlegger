import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const hjerte = require('./assets/hjerte.svg');

const TerminIkon: React.StatelessComponent<{}> = () => <CustomSVG iconRef={hjerte.default} size={14} />;

export default TerminIkon;
