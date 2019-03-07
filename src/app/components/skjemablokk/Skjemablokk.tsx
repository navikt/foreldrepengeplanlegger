import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';
import Block, { BlockPadding } from 'common/components/block/Block';
import Sirkelknapp from 'common/components/sirkelknapp/Sirkelknapp';
import { guid } from 'nav-frontend-js-utils';
import LukkInfoIkon from 'common/components/ikoner/LukkInfoIkon';
import InfoIkon from 'common/components/ikoner/InfoIkon';

import './skjemablokk.less';

interface Props {
    tittel: string;
    beskrivelse?: React.ReactNode;
    feil?: Feil;
    children: React.ReactNode;
    margin?: BlockPadding;
    visible?: boolean;
    animated?: boolean;
    info?: {
        title: string;
        content: React.ReactNode;
    };
}

interface State {
    åpen: boolean;
}

class Skjemablokk extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            åpen: false
        };
    }
    render() {
        const { tittel, feil, info, children, visible, beskrivelse, animated = false, margin = 'l' } = this.props;
        const infoId = guid();
        return (
            <div className="skjemablokkWrapper">
                <Block margin={margin} visible={visible} animated={animated}>
                    <SkjemaGruppe feil={feil}>
                        <fieldset className="skjema__fieldset skjemablokk">
                            <legend className="skjema__legend">
                                <span className="skjemablokk__tittel">{tittel}</span>
                                {info && (
                                    <span className="skjemablokk__infoToggler">
                                        <Sirkelknapp
                                            ikon={this.state.åpen ? <LukkInfoIkon /> : <InfoIkon />}
                                            stil="info"
                                            toggle={{ pressed: this.state.åpen || false }}
                                            ariaLabel="f"
                                            onClick={() => this.setState({ åpen: !this.state.åpen })}
                                            aria-describedby={infoId}
                                        />
                                    </span>
                                )}
                            </legend>
                            {beskrivelse && <div className="skjemablokk__beskrivelse">{beskrivelse}</div>}
                            {info && (
                                <div className="skjemablokk__info">
                                    <Block visible={this.state.åpen} style="info" margin="s">
                                        {info.content}
                                    </Block>
                                </div>
                            )}
                            {children}
                        </fieldset>
                    </SkjemaGruppe>
                </Block>
            </div>
        );
    }
}
export default Skjemablokk;
