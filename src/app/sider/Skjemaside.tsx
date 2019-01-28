import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Situasjonsskjema from '../components/situasjonsskjema/Situasjonsskjema';
import { AppState } from '../redux/reducers/rootReducer';
import { connect } from 'react-redux';
import { DispatchProps } from '../redux/types';
import { SituasjonSkjemadata } from '../types';
import { submitSkjemadata } from '../redux/actions/common/commonActionCreators';
import LoadContainer from 'common/components/loadContainer/LoadContainer';
import IntroSirkelSvg from '../components/illustrasjoner/IntroSirkelSvg';
import Introduksjon from '../components/introduksjon/Introduksjon';
import { Ingress } from 'nav-frontend-typografi';
import UtvidetInformasjon from 'common/components/utvidetInformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';

interface StateProps {
    henterStønadskontoer?: boolean;
    skjemadata?: SituasjonSkjemadata;
}

type Props = StateProps & DispatchProps & RouteComponentProps<any>;

class Skjemaside extends React.Component<Props, {}> {
    render() {
        const { henterStønadskontoer, dispatch } = this.props;
        return (
            <LoadContainer loading={henterStønadskontoer} overlay={true}>
                <Block margin="l">
                    <Introduksjon ikon={<IntroSirkelSvg />} tittel="Planlegg dine foreldrepenger">
                        <Block margin="xxs">
                            <Ingress>
                                Her kan dere planlegge hvor mange uker dere kan ta ut foreldrepenger, og hvordan dere
                                kan utsette perioder med foreldrepenger.
                            </Ingress>
                        </Block>
                        <UtvidetInformasjon
                            apneLabel="Les om begrensninger i planleggeren"
                            lukkLabel="Lukk informasjon">
                            sdfølsdf
                        </UtvidetInformasjon>
                    </Introduksjon>
                </Block>
                <Situasjonsskjema onSubmit={(data) => dispatch(submitSkjemadata(data, this.props.history))} />
            </LoadContainer>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        skjemadata: state.common.skjemadata,
        henterStønadskontoer: state.api.stønadskontoer.pending
    };
};

export default connect(mapStateToProps)(withRouter(Skjemaside));
