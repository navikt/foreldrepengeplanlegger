import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import ForelderMeny from './parts/ForelderMeny';
import PeriodetypeMeny from './parts/PeriodetypeMeny';
import { changePeriodeType } from '../../utils/typeUtils';
import VarighetMeny, { VarighetChangeEvent } from './parts/VarighetMeny';
import { PeriodelisteElementProps } from './types';
import GraderingMeny from './parts/GraderingMeny';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import { OmForeldre, Forelder, Periodetype, Periode } from '../../types';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import PeriodelisteElement from './periodelisteElement/PeriodelisteElement';
import PeriodeBlokk from '../periodeBlokk/PeriodeBlokk';

type Props = PeriodelisteElementProps;

const bem = BEMHelper('periodeElement');

const getForelderNavn = (forelder: Forelder | undefined, omForeldre: OmForeldre): string | undefined => {
    if (forelder === undefined || omForeldre === undefined) {
        return;
    }
    if (forelder === Forelder.mor) {
        return omForeldre.mor.navn;
    } else {
        return omForeldre.farMedmor ? omForeldre.farMedmor.navn : undefined;
    }
};

class PeriodeElement extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleChangeVarighet = this.handleChangeVarighet.bind(this);
    }

    handleChangeVarighet(evt: VarighetChangeEvent) {
        const { periode } = this.props;
        const { tidsperiode } = periode;
        const { ukerOgDager, ingenVarighet } = evt;
        if (periode.type === Periodetype.UttakFørTermin) {
            const oppdatertPeriode = {
                ...periode,
                tidsperiode: Tidsperioden(tidsperiode || {}).setUkerOgDagerFlyttStartdato(
                    ukerOgDager.uker,
                    ukerOgDager.dager
                ),
                skalIkkeHaUttakFørTermin: ingenVarighet
            };
            this.props.onUpdate(oppdatertPeriode as Periode);
        } else {
            this.props.onUpdate({
                ...periode,
                tidsperiode: Tidsperioden(tidsperiode || {}).setUkerOgDager(
                    ukerOgDager.uker,
                    ukerOgDager.dager
                ) as Tidsperiode
            });
        }
    }

    render() {
        const {
            typeErLåst,
            forelderErLåst,
            startdatoErLåst,
            sluttdatoErLåst,
            slettErLåst,
            omForeldre,
            onRemove,
            onUpdate,
            uttaksdatoer
        } = this.props;

        const { uttaksinfo } = this.props.periode;
        const periode = this.props.periode;

        if (uttaksinfo === undefined) {
            return <div>Ingen periodeinfo</div>;
        }

        const { uker, dager } = uttaksinfo.ukerOgDager;
        const foreldernavn = getForelderNavn(periode.forelder, omForeldre);
        const harFlereForeldre = omForeldre.antallForeldre > 1;
        const { fom, tom } = this.props.periode.tidsperiode;
        return (
            <PeriodeBlokk farge={getPeriodetypeFarge(this.props.periode.type, this.props.periode.forelder)}>
                <PeriodelisteElement
                    menyer={[
                        {
                            id: 'periodetype',
                            className: bem.element('periode'),
                            render: () => (
                                <PeriodetypeMeny
                                    type={this.props.periode.type}
                                    forelder={this.props.periode.forelder}
                                    flereForeldre={harFlereForeldre}
                                    tidsperiode={this.props.periode.tidsperiode}
                                    foreldernavn={foreldernavn}
                                    erLåst={typeErLåst}
                                    onChange={(periodetype) =>
                                        onUpdate(changePeriodeType(this.props.periode, periodetype))
                                    }
                                />
                            )
                        },
                        {
                            id: 'gradering',
                            className: bem.element('gradering'),
                            render: () => (
                                <GraderingMeny
                                    foreldernavn={omForeldre.antallForeldre === 2 ? foreldernavn : 'du'}
                                    gradering={this.props.periode.gradering}
                                    onChange={(gradering) => onUpdate({ ...this.props.periode, gradering })}
                                />
                            ),
                            isVisibleCheck: () => periode.type === Periodetype.GradertUttak
                        },
                        {
                            id: 'forelder',
                            className: bem.element('foreldre'),
                            render: () => (
                                <ForelderMeny
                                    forelder={this.props.periode.forelder}
                                    mor={this.props.omForeldre.mor}
                                    farMedmor={this.props.omForeldre.farMedmor!}
                                    erLåst={forelderErLåst}
                                    onChange={(forelder) =>
                                        onUpdate({
                                            ...this.props.periode,
                                            forelder
                                        })
                                    }
                                />
                            ),
                            isVisibleCheck: () => harFlereForeldre
                        },
                        {
                            id: 'varighet',
                            className: bem.element('varighet'),
                            render: () => (
                                <VarighetMeny
                                    førsteUttaksdag={uttaksdatoer.førsteUttaksdag}
                                    sisteUttaksdag={uttaksdatoer.etterFødsel.sisteMuligeUttaksdag}
                                    startdatoErLåst={startdatoErLåst}
                                    sluttdatoErLåst={sluttdatoErLåst}
                                    fom={fom}
                                    tom={tom}
                                    uker={uker}
                                    dager={dager}
                                    minDager={periode.type === Periodetype.UttakFørTermin ? 0 : 1}
                                    onTidsperiodeChange={(tidsperiode) => {
                                        onUpdate({
                                            ...this.props.periode,
                                            tidsperiode
                                        });
                                    }}
                                    onVarighetChange={this.handleChangeVarighet}
                                    ingenVarighet={
                                        this.props.periode.type === Periodetype.UttakFørTermin
                                            ? this.props.periode.skalIkkeHaUttakFørTermin
                                            : undefined
                                    }
                                />
                            )
                        }
                    ]}
                    slett={
                        slettErLåst !== true
                            ? {
                                  ariaLabel: 'Slett periode',
                                  onRemove: () => onRemove(this.props.periode)
                              }
                            : undefined
                    }
                />
            </PeriodeBlokk>
        );
    }
}

export default PeriodeElement;
