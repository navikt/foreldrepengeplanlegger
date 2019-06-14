import * as React from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import { DispatchProps } from '../../redux/types';
import { SituasjonSkjemadata, Uttaksdatoer } from '../../types';
import {
    setDekningsgrad,
    setØnsketFordeling,
    navigerTilSide,
    lagForslagTilPlan
} from '../../redux/actions/common/commonActionCreators';
import { AppState } from '../../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import { Dekningsgrad } from 'common/types';
import { getStønadskontoer } from '../../redux/actions/api/apiActionCreators';
import LoadContainer from 'common/components/loadContainer/LoadContainer';
import DekningsgradValg from './components/dekningsgradValg/DekningsgradValg';
import Skjemablokk from '../../components/skjemablokk/Skjemablokk';
import { ØnsketFordelingForeldrepenger } from '../../redux/reducers/commonReducer';
import FordelingForeldrepenger from './components/fordelingForeldrepenger/FordelingForeldrepenger';
import { Side } from '../../routes';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Hovedknapp } from 'nav-frontend-knapper';
import DekningsgradInfo from './components/dekningsgradInfo/DekningsgradInfo';
import Oppsummering from '../felles/oppsummering/Oppsummering';
import FocusChildOnMountContainer from 'common/components/focusContainer/FocusChildOnMountContainer';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { TilgjengeligeDager, OmForeldre } from 'shared/types';

interface StateProps {
    dekningsgrad?: Dekningsgrad;
    familiehendelsesdato: Date;
    tilgjengeligeDager?: TilgjengeligeDager;
    stønadskontoerLastet: boolean;
    henterStønadskontoer: boolean;
    dager100: number;
    dager80: number;
    skjemadata: SituasjonSkjemadata;
    omForeldre?: OmForeldre;
    ønsketFordeling: ØnsketFordelingForeldrepenger;
    uttaksdatoer: Uttaksdatoer;
}

type Props = StateProps & DispatchProps & RouteComponentProps & InjectedIntlProps;

class UttaksplanSide extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        if (this.props.stønadskontoerLastet === false && this.props.henterStønadskontoer === false) {
            this.props.dispatch(getStønadskontoer());
        }
    }
    render() {
        const {
            dekningsgrad,
            tilgjengeligeDager,
            henterStønadskontoer,
            familiehendelsesdato,
            dager100,
            dager80,
            skjemadata,
            omForeldre,
            history,
            intl,
            dispatch
        } = this.props;

        if ((skjemadata === undefined && henterStønadskontoer === false) || omForeldre === undefined) {
            return <Redirect to="/" />;
        }
        return (
            <>
                <LoadContainer loading={henterStønadskontoer}>
                    <Block>
                        <Oppsummering
                            situasjonProps={{
                                familiehendelsesdato,
                                antallBarn: skjemadata.antallBarn,
                                omForeldre,
                                situasjon: skjemadata.situasjon,
                                onRequestChange: () => dispatch(navigerTilSide(Side.START, history))
                            }}
                        />
                    </Block>
                    <FocusChildOnMountContainer active={true}>
                        <Skjemablokk
                            tittel={getMessage(intl, 'dekningsgradSide.dekningsgrad.spørsmål', {
                                hvem: omForeldre.erDeltOmsorg ? getMessage(intl, 'dere') : getMessage(intl, 'du')
                            })}
                            focusable={true}
                            beskrivelse={`${
                                omForeldre.erDeltOmsorg
                                    ? getMessage(intl, 'dekningsgradSide.dekningsgrad.beskrivelsePart1.deltOmsorg')
                                    : ''
                            } ${getMessage(intl, 'dekningsgradSide.dekningsgrad.beskrivelsePart2')}`}>
                            <DekningsgradValg
                                dekningsgrad={dekningsgrad}
                                onChange={(dg) => dispatch(setDekningsgrad(dg as Dekningsgrad))}
                                dager100={dager100}
                                dager80={dager80}
                            />
                        </Skjemablokk>
                    </FocusChildOnMountContainer>

                    {tilgjengeligeDager && dekningsgrad !== undefined && (
                        <>
                            <Block>
                                <DekningsgradInfo
                                    situasjon={skjemadata.situasjon}
                                    dekningsgrad={dekningsgrad}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                    omForeldre={omForeldre}
                                    flerbarnsdager={tilgjengeligeDager.flerbarnsdager}
                                />
                            </Block>
                            {omForeldre.erDeltOmsorg === false && (
                                <Knapperad align="center">
                                    <Hovedknapp
                                        onClick={() => {
                                            dispatch(lagForslagTilPlan());
                                            dispatch(navigerTilSide(Side.UTTAKSPLAN, this.props.history));
                                        }}>
                                        Lag forslag til plan
                                    </Hovedknapp>
                                </Knapperad>
                            )}
                            {omForeldre.erDeltOmsorg && omForeldre.farMedmor && (
                                <FordelingForeldrepenger
                                    navnMor={omForeldre.mor.navn}
                                    navnFarMedmor={omForeldre.farMedmor.navn}
                                    tilgjengeligeDager={tilgjengeligeDager}
                                    onChange={(uker) => {
                                        dispatch(setØnsketFordeling(uker));
                                        dispatch(navigerTilSide(Side.UTTAKSPLAN, this.props.history));
                                    }}
                                />
                            )}
                        </>
                    )}
                </LoadContainer>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const { stønadskontoer } = state.api;
    const common = state.common.present;
    return {
        dekningsgrad: common.dekningsgrad,
        familiehendelsesdato: common.familiehendelsesdato,
        tilgjengeligeDager: common.tilgjengeligeDager,
        stønadskontoerLastet: stønadskontoer.loaded === true,
        henterStønadskontoer: state.api.stønadskontoer.pending === true,
        dager100: common.stønadskontoer100.dager,
        dager80: common.stønadskontoer80.dager,
        skjemadata: common.skjemadata!,
        omForeldre: common.omForeldre,
        ønsketFordeling: common.ønsketFordeling,
        uttaksdatoer: common.uttaksdatoer
    };
};

export default connect(mapStateToProps)(withRouter(injectIntl(UttaksplanSide)));
