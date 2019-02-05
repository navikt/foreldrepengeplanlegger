import * as React from 'react';
import Block from 'common/components/block/Block';
import { Systemtittel } from 'nav-frontend-typografi';
import FordelingValg from '../fordelingValg/FordelingValg';
import { TilgjengeligeUker } from '../../types';
import SkjemaFordelingFellesperiode from '../fordelingValg/SkjemaFordelingFellesperiode';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
    tilgjengeligeUker: TilgjengeligeUker;
    navnMor: string;
    navnFarMedmor: string;
    onChange: (ukerMor: number) => void;
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
        const { tilgjengeligeUker, navnMor, navnFarMedmor, onChange } = this.props;

        const defaultUker = Math.round(tilgjengeligeUker.ukerFelles / 2);
        const ukerMor = this.state.ukerMor !== undefined ? this.state.ukerMor : defaultUker;
        const ukerFarMedmor = tilgjengeligeUker.ukerFelles - ukerMor;

        return (
            <section>
                <div className="periodelisteWrapper">
                    <Block margin="s">
                        <Systemtittel>Hvordan vil dere dele fellesperioden?</Systemtittel>
                        <FordelingValg
                            foreldrepengerFørTermin={tilgjengeligeUker.ukerFørTermin}
                            modrekvote={tilgjengeligeUker.ukerForbeholdtMor}
                            fedrekvote={tilgjengeligeUker.ukerForbeholdtFar}
                            fellesukerForelder1={ukerMor || defaultUker}
                            fellesukerForelder2={ukerFarMedmor || defaultUker}
                            navnForelder1={navnMor}
                            navnForelder2={navnFarMedmor}
                        />
                    </Block>
                    <Block margin="s">
                        <SkjemaFordelingFellesperiode
                            navnFarMedmor={navnFarMedmor}
                            navnMor={navnMor}
                            ukerTotalt={tilgjengeligeUker.ukerFelles}
                            ukerMor={ukerMor}
                            onChange={(uker) => this.setState({ ukerMor: uker })}
                        />
                    </Block>
                    <Knapperad>
                        <Hovedknapp onClick={() => onChange(ukerMor)}>Lag plan</Hovedknapp>
                    </Knapperad>
                </div>
            </section>
        );
    }
}
export default FordelingForeldrepenger;
