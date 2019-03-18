import * as React from 'react';
import Block from 'common/components/block/Block';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';
import SkjemaFordelingFellesperiode from '../ukefordeling/SkjemaFordelingFellesperiode';
import { TilgjengeligeDager } from '../../types';
import { dagerTilUker } from '../../utils/common';
import Skjemablokk from '../skjemablokk/Skjemablokk';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    navnMor: string;
    navnFarMedmor: string;
    onChange: (ukerMor: number) => void;
}

interface State {
    ukerMor?: number;
}

type Props = OwnProps & InjectedIntlProps;

class FordelingForeldrepenger extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.updateØnsketFordeling = this.updateØnsketFordeling.bind(this);
        this.state = {};
    }

    updateØnsketFordeling(ukerMor: number) {
        this.setState({
            ukerMor
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
                        onChange={(uker) => this.setState({ ukerMor: uker })}
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
