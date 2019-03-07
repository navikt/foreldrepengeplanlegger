import * as React from 'react';
import Block from 'common/components/block/Block';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';
import SkjemaFordelingFellesperiode from '../ukefordeling/SkjemaFordelingFellesperiode';
import { TilgjengeligeDager } from '../../types';
import { dagerTilUker } from '../../utils/common';
import Skjemablokk from '../skjemablokk/Skjemablokk';

interface Props {
    tilgjengeligeDager: TilgjengeligeDager;
    navnMor: string;
    navnFarMedmor: string;
    onChange: (ukerMor: number) => void;
    onSkipPlan: () => void;
}

interface State {
    ukerMor?: number;
}

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
        const { tilgjengeligeDager, navnMor, navnFarMedmor, onChange } = this.props;

        const defaultUker = Math.round(dagerTilUker(tilgjengeligeDager.dagerFelles) / 2);
        const ukerMor = this.state.ukerMor !== undefined ? this.state.ukerMor : defaultUker;
        const ukerFelles = dagerTilUker(tilgjengeligeDager.dagerFelles);

        return (
            <Skjemablokk
                tittel="Hvordan vil dere dele fellesperioden?"
                beskrivelse="Fordelingen kan endres etterpå i planen.">
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
                    <Hovedknapp onClick={() => onChange(ukerMor)}>Lag forslag til plan</Hovedknapp>
                </Knapperad>
            </Skjemablokk>
        );
    }
}
export default FordelingForeldrepenger;
