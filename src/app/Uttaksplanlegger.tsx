import * as React from 'react';
// import Uttaksplan from './components/uttaksplan/Uttaksplan';
import { Periode } from './types';
// import SituasjonSkjemaWrapper from './components/situasjonSkjema/SituasjonSkjemaWrapper';
import Block from 'common/components/block/Block';
import 'common/styles/index.less';
import BEMHelper from 'common/utils/bem';
import Sidebanner from './components/sidebanner/Sidebanner';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';
import Brødsmula from './components/BrødStmula/Brødsmula';

const cls = BEMHelper('planlegger');

interface State {
    perioder: Periode[];
}

interface Props {}

type MyProps = InjectedIntlProps & Props;

class Uttaksplanlegger extends React.Component<MyProps, State> {
    constructor(props: MyProps) {
        super(props);

        this.onAddPeriode = this.onAddPeriode.bind(this);
        this.onUpdatePeriode = this.onUpdatePeriode.bind(this);
        this.onDeletePeriode = this.onDeletePeriode.bind(this);

        this.state = {
            perioder: []
        };
    }

    onAddPeriode(periode: Periode) {
        const nyePerioder = [...this.state.perioder, periode];
        this.setState({ perioder: nyePerioder });
    }

    onDeletePeriode(periode: Periode) {
        const nyePerioder = this.state.perioder.filter((p) => p.id !== periode.id);
        this.setState({ perioder: nyePerioder });
    }

    onUpdatePeriode(periode: Periode) {
        const nyePerioder = [...this.state.perioder, periode];
        this.setState({ perioder: nyePerioder });
    }


    render() {
        return (
            <div className={cls.className}>
                <Sidebanner text={getMessage(this.props.intl, 'common.sidebanner')} />
                <div className={cls.element('container')}>
                    <div className={cls.element('wrapper')}>
                        <Brødsmula sti={"/foreldrepengeplanlegger"} />
                        <Block>
                            {/*  <SituasjonSkjemaWrapper /> */ }
                        </Block>
                        <div>INSERT CONTENT HERE</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(Uttaksplanlegger);
