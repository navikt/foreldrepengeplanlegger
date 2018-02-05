import * as React from 'react';
import CustomSVG from 'shared/components/customSvg/CustomSVG';

const infoDame = require('app/assets/infoDame.svg');

const TerminIkon: React.StatelessComponent<{}> = () => <CustomSVG iconRef={infoDame.default} size={23} />;

export default TerminIkon;
