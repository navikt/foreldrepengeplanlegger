import * as React from 'react';
import SituasjonOppsummering, { SituasjonsoppsummeringProps } from './SituasjonOppsummering';
import DekningOppsummering, { DekningOppsummeringProps } from './DekningOppsummering';
import Block from 'common/components/block/Block';
import AriaText from 'common/components/aria/AriaText';
import { FormattedMessage } from 'react-intl';

import './oppsummering.less';

interface Props {
    situasjonProps?: SituasjonsoppsummeringProps;
    dekningProps?: DekningOppsummeringProps;
}

const Oppsummering: React.FunctionComponent<Props> = ({ situasjonProps, dekningProps }) => {
    return (
        <div className="grayBlock">
            <AriaText tag="h2">
                <FormattedMessage id="oppsummering.ariaTittel" />
            </AriaText>
            {situasjonProps && <SituasjonOppsummering {...situasjonProps} />}
            {dekningProps && (
                <Block marginTop="l">
                    <DekningOppsummering {...dekningProps} />
                </Block>
            )}
        </div>
    );
};

export default Oppsummering;
