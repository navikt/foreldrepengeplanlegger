import * as React from 'react';
import Block from 'common/components/block/Block';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';
import Ukefordeling from '../ukefordeling/Ukefordeling';
import { TilgjengeligeUker } from '../../types';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';
import SkjemaFordelingFellesperiode from '../ukefordeling/SkjemaFordelingFellesperiode';

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
                    </Block>
                    <Block>
                        <SkjemaFordelingFellesperiode
                            navnFarMedmor={navnFarMedmor}
                            navnMor={navnMor}
                            ukerTotalt={tilgjengeligeUker.ukerFelles}
                            ukerMor={ukerMor}
                            onChange={(uker) => this.setState({ ukerMor: uker })}
                        />
                    </Block>
                    <Block>
                        <Block margin="xs">
                            <Undertittel>Deres totale fordeling</Undertittel>
                        </Block>
                        <Ukefordeling
                            foreldrepengerFørTermin={tilgjengeligeUker.ukerFørTermin}
                            modrekvote={tilgjengeligeUker.ukerForbeholdtMor}
                            fedrekvote={tilgjengeligeUker.ukerForbeholdtFar}
                            fellesukerMor={ukerMor}
                            fellesukerFarMedmor={ukerFarMedmor}
                            navnMor={navnMor}
                            navnFarMedmor={navnFarMedmor}
                        />
                    </Block>
                    <Knapperad>
                        <Hovedknapp onClick={() => onChange(ukerMor)}>Vis plan</Hovedknapp>
                    </Knapperad>
                </div>
            </section>
        );
    }
}
export default FordelingForeldrepenger;
