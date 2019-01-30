import * as React from 'react';
import { FlexibleSvg } from 'common/components/customSvg/CustomSVG';
import { ForeldreparForelder } from 'app/types';

interface Props {
    forelder: ForeldreparForelder;
}

const ForelderIkon: React.StatelessComponent<Props> = ({ forelder }) => {
    const svg = require(`./assets/${forelder}.svg`).default;
    return <FlexibleSvg className="forelderIkon" iconRef={svg} width={31} height={45} />;
};
export default ForelderIkon;
