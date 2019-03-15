import * as React from 'react';
import SituasjonOppsummering, { SituasjonsoppsummeringProps } from './SituasjonOppsummering';
import DekningOppsummering, { DekningOppsummeringProps } from './DekningOppsummering';
import Block from 'common/components/block/Block';

import './oppsummering.less';
import AriaText from 'common/components/aria/AriaText';

interface Props {
    situasjonProps?: SituasjonsoppsummeringProps;
    dekningProps?: DekningOppsummeringProps;
}

const Oppsummering: React.StatelessComponent<Props> = ({ situasjonProps, dekningProps }) => {
    const kompakt = true;
    return (
        <div className="grayBlock">
            <AriaText tag="h2">Oppsummering</AriaText>
            {situasjonProps && <SituasjonOppsummering {...situasjonProps} kompakt={kompakt} />}
            {dekningProps && (
                <Block marginTop="l">
                    <DekningOppsummering {...dekningProps} kompakt={kompakt} />
                </Block>
            )}
        </div>
    );
};

export default Oppsummering;
