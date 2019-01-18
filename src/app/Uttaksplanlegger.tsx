import * as React from 'react';
import Uttaksplan from './components/uttaksplan/Uttaksplan';
import { Periode, Periodetype } from './types/periodetyper';
import { UttaksplanBuilder } from './utils/Builder';
import { Forelder } from './types';
import { getUttaksinfoFromPeriode } from './utils/periodeinfo';
import 'common/styles/index.less';
import BEMHelper from 'common/utils/bem';
import Sidebanner from './components/sidebanner/Sidebanner';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/utils/i18nUtils';
import Brødsmula from './components/BrødStmula/Brødsmula';

const periode1: Periode = {
    forelder: Forelder.forelder1,
    id: '89658209-22972-6250-27502-00358020458507',
    tidsperiode: {
        fom: new Date('Mon Jan 14 2019 00:00:00 GMT+0100'),
        tom: new Date('Fri Feb 08 2019 00:00:00 GMT+0100')
    },
    type: Periodetype.Uttak
};
const periode2: Periode = {
    forelder: Forelder.forelder1,
    id: '77701867-4877-12517-0900-7334518603539',
    tidsperiode: {
        fom: new Date('Mon Feb 11 2019 00:00:00 GMT+0100'),
        tom: new Date('Fri Feb 15 2019 00:00:00 GMT+0100')
    },
    type: Periodetype.Ferie
};
const periode3: Periode = {
    forelder: Forelder.forelder2,
    id: '56204685-2952-7449-7913-90900854017945',
    tidsperiode: {
        fom: new Date('Mon Feb 18 2019 00:00:00 GMT+0100'),
        tom: new Date('Fri Mar 15 2019 00:00:00 GMT+0100')
    },
    type: Periodetype.Uttak
};

const mockPerioder: Periode[] = [periode1, periode2, periode3].map((periode: Periode): Periode => ({
    ...periode,
    uttaksinfo: getUttaksinfoFromPeriode(periode)
}));

const cls = BEMHelper('planlegger');

interface State {
    perioder: Periode[];
}

interface Props {
    familiehendelsesdato: Date;
}

type MyProps = InjectedIntlProps & Props;

class Uttaksplanlegger extends React.Component<MyProps, State> {
    constructor(props: MyProps) {
        super(props);

        this.onAddPeriode = this.onAddPeriode.bind(this);
        this.onUpdatePeriode = this.onUpdatePeriode.bind(this);
        this.onDeletePeriode = this.onDeletePeriode.bind(this);
        this.onMove = this.onMove.bind(this);

        this.state = {
            perioder: mockPerioder
        };
    }

    onAddPeriode(periode: Periode) {
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .leggTilPeriode(periode)
            .build().perioder;
        this.setState({ perioder: nyePerioder });
    }

    onDeletePeriode(periode: Periode) {
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .fjernPeriode(periode)
            .build().perioder;
        this.setState({ perioder: nyePerioder });
    }

    onUpdatePeriode(periode: Periode) {
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .oppdaterPeriode(periode)
            .build().perioder;
        this.setState({ perioder: nyePerioder });
    }

    onMove(periode: Periode, toIndex: number) {
        const nyePerioder = UttaksplanBuilder(this.state.perioder, this.props.familiehendelsesdato)
            .flyttPeriode(periode, toIndex)
            .build().perioder;
        this.setState({ perioder: nyePerioder });
    }

    render() {
        return (
            <div className={cls.block}>
                <Sidebanner text={getMessage(this.props.intl, 'common.sidebanner')} />
                <div className={cls.element('container')}>
                    <div className={cls.element('wrapper')}>
                        <Brødsmula sti={"/foreldrepengeplanlegger"} />
                            <Uttaksplan
                                perioder={this.state.perioder}
                                onAdd={this.onAddPeriode}
                                onDelete={this.onDeletePeriode}
                                onUpdate={this.onUpdatePeriode}
                                onMove={this.onMove}
                            />
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(Uttaksplanlegger);
