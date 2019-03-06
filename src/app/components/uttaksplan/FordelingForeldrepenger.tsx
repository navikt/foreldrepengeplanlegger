import * as React from 'react';
import Block from 'common/components/block/Block';
import { Undertittel, Systemtittel } from 'nav-frontend-typografi';
import Ukefordeling from '../ukefordeling/Ukefordeling';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import SkjemaFordelingFellesperiode from '../ukefordeling/SkjemaFordelingFellesperiode';
import Varighet from '../varighet/Varighet';
import { TilgjengeligeDager } from '../../types';
import { dagerTilUker } from '../../utils/common';

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
        const { tilgjengeligeDager, navnMor, navnFarMedmor, onChange, onSkipPlan } = this.props;

        const defaultUker = Math.round(dagerTilUker(tilgjengeligeDager.dagerFelles) / 2);
        const ukerMor = this.state.ukerMor !== undefined ? this.state.ukerMor : defaultUker;
        const ukerFarMedmor = dagerTilUker(tilgjengeligeDager.dagerFelles) - ukerMor;

        const ukerFelles = dagerTilUker(tilgjengeligeDager.dagerFelles);
        const ukerFørTermin = dagerTilUker(tilgjengeligeDager.dagerForeldrepengerFørFødsel);
        const ukerForbeholdtMor = dagerTilUker(tilgjengeligeDager.dagerMor);
        const ukerForbeholdtFar = dagerTilUker(tilgjengeligeDager.dagerFar);

        return (
            <section>
                <div className="periodelisteWrapper">
                    <Systemtittel>Få forslag til deres plan</Systemtittel>
                    <Block marginTop="s" margin="l">
                        Dere har{' '}
                        <strong>
                            <Varighet dager={tilgjengeligeDager.dagerFelles} />
                        </strong>{' '}
                        som dere kan fordele mellom dere. Velg fordeling under og få et forslag til planen, eller velg å
                        gå videre uten forslag. Fordelingen kan endres etterpå.
                    </Block>
                    <Block>
                        <Block margin="xs">
                            <Undertittel>Hvordan ønsker dere å dele fellesperioden?</Undertittel>
                        </Block>
                        <SkjemaFordelingFellesperiode
                            navnFarMedmor={navnFarMedmor}
                            navnMor={navnMor}
                            ukerTotalt={ukerFelles}
                            ukerMor={ukerMor}
                            onChange={(uker) => this.setState({ ukerMor: uker })}
                        />
                    </Block>
                    <Block visible={false}>
                        <Ukefordeling
                            foreldrepengerFørTermin={ukerFørTermin}
                            modrekvote={ukerForbeholdtMor - ukerFørTermin}
                            fedrekvote={ukerForbeholdtFar}
                            fellesukerMor={ukerMor}
                            fellesukerFarMedmor={ukerFarMedmor}
                            navnMor={`Uker totalt for ${navnMor}`}
                            navnFarMedmor={`Uker totalt for ${navnFarMedmor}`}
                        />
                    </Block>
                    <Knapperad>
                        <Hovedknapp onClick={() => onChange(ukerMor)}>Lag forslag til plan</Hovedknapp>
                        <Knapp onClick={() => onSkipPlan()}>Vis plan uten forslag</Knapp>
                    </Knapperad>
                </div>
            </section>
        );
    }
}
export default FordelingForeldrepenger;
