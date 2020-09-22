import * as React from 'react';
import Block from 'common/components/block/Block';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';
import SkjemaFordelingFellesperiode from './FordelingFellesperiodeSpørsmål';
import { dagerTilUker } from '../../../../utils/common';
import Skjemablokk from '../../../../components/skjemablokk/Skjemablokk';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { TilgjengeligeDager } from 'shared/types';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    navnMor: string;
    navnFarMedmor: string;
    onChange: (ukerMor: number) => void;
}

interface State {
    ukerMor?: number;
}

interface IntlProp {
    intl: IntlShape;
}

type Props = OwnProps & IntlProp;

class FordelingForeldrepenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.updateØnsketFordeling = this.updateØnsketFordeling.bind(this);
        this.state = {};
    }

    updateØnsketFordeling(ukerMor: number) {
        this.setState({
            ukerMor,
        });
    }

    render() {
        const { tilgjengeligeDager, navnMor, navnFarMedmor, onChange, intl } = this.props;

        const defaultUker = Math.round(dagerTilUker(tilgjengeligeDager.dagerFelles) / 2);
        const ukerMor = this.state.ukerMor !== undefined ? this.state.ukerMor : defaultUker;
        const ukerFelles = dagerTilUker(tilgjengeligeDager.dagerFelles);

        return (
            <Skjemablokk
                tittel={getMessage(intl, 'fordeling.spørsmål')}
                beskrivelse={getMessage(intl, 'fordeling.tekst')}>
                <Block>
                    <SkjemaFordelingFellesperiode
                        navnFarMedmor={navnFarMedmor}
                        navnMor={navnMor}
                        ukerTotalt={ukerFelles}
                        ukerMor={ukerMor}
                        onChange={(uker: number) => this.setState({ ukerMor: uker })}
                    />
                </Block>
                <Knapperad>
                    <Hovedknapp onClick={() => onChange(ukerMor)}>
                        <FormattedMessage id="fordeling.lagPlan" />
                    </Hovedknapp>
                </Knapperad>
            </Skjemablokk>
        );
    }
}
export default injectIntl(FordelingForeldrepenger);
