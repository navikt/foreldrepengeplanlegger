import * as React from 'react';
import BEMHelper from 'common/util/bem';
import ForelderMeny from './parts/ForelderMeny';
import PeriodetypeMeny from './parts/PeriodetypeMeny';
import { changePeriodeType } from '../../../../utils/typeUtils';
import { PeriodelisteElementProps } from './types';
import GraderingMeny from './parts/GraderingMeny';
import { getPeriodetypeFarge } from '../../../../utils/styleutils';
import { Periodetype, Periode, isUlønnetPermisjon, UlønnetPermisjon } from '../../../../types';
import { Tidsperioden, isValidTidsperiode } from '../../../../utils/Tidsperioden';
import { Tidsperiode, Forelder } from 'common/types';
import PeriodelisteElement from './periodelisteElement/PeriodelisteElement';
import PeriodeBlokk from '../periodeBlokk/PeriodeBlokk';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, IntlShape } from 'react-intl';
import VarighetMeny from '../periodeskjema/varighet/VarighetMeny';
import { VarighetChangeEvent } from '../periodeskjema/varighet/VarighetSkjema';
import { kanBeggeForeldreVelgesForPeriodetype } from '../../../../utils/kontoUtils';
import UlønnetPermisjonMeny from './parts/UlønnetPermisjonMeny';
import { Periodene } from '../../../../utils/Periodene';
import { OmForeldre } from 'shared/types';

interface IntlProp {
    intl: IntlShape;
}

type Props = PeriodelisteElementProps & IntlProp;

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

class PeriodeElement extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleChangeVarighet = this.handleChangeVarighet.bind(this);
    }

    handleChangeVarighet(evt: VarighetChangeEvent) {
        const { periode } = this.props;
        const { tidsperiode } = periode;
        const { ingenVarighet, dager } = evt;

        if (periode.type === Periodetype.UttakFørTermin) {
            const oppdatertPeriode = {
                ...periode,
                tidsperiode: dager ? Tidsperioden(tidsperiode).setUttaksdager(dager) : tidsperiode,
                skalIkkeHaUttakFørTermin: ingenVarighet,
            };
            this.props.onUpdate(oppdatertPeriode as Periode);
        } else if (dager !== undefined) {
            this.props.onUpdate({
                ...periode,
                tidsperiode: Tidsperioden(tidsperiode || {}).setUttaksdager(dager) as Tidsperiode,
            });
        }
    }
    render() {
        const {
            typeErLåst,
            forelderErLåst,
            omForeldre,
            onUpdate,
            onRemove,
            uttaksdatoer,
            regelAvvik,
            perioder,
            kanSlettes = true,
            disabled,
            intl,
        } = this.props;

        const { uttaksinfo } = this.props.periode;
        const periode = this.props.periode;

        const avsluttendeUlønnedePermisjoner = Periodene(perioder).getAvsluttendeUlønnedePermisjoner();

        const { antallUttaksdagerBrukt, antallUttaksdager } = uttaksinfo || {
            antallUttaksdagerBrukt: 0,
            antallUttaksdager: 0,
        };
        const foreldernavn = getForelderNavn(periode.forelder, omForeldre);
        const { fom, tom } = periode.tidsperiode;

        return (
            <PeriodeBlokk farge={getPeriodetypeFarge(periode.type, periode.forelder)}>
                <PeriodelisteElement
                    menyer={[
                        {
                            id: `periodetype-${periode.id}`,
                            className: bem.element('periode'),
                            render: () => (
                                <PeriodetypeMeny
                                    type={periode.type}
                                    forelder={periode.forelder}
                                    foreldernavn={foreldernavn}
                                    disabled={typeErLåst || disabled}
                                    gradering={periode.gradering}
                                    brukteUttaksdager={antallUttaksdagerBrukt}
                                    uttaksdager={antallUttaksdager}
                                    kanVelgeUlønnetPermisjon={omForeldre.erDeltOmsorg === true}
                                    onChange={(periodetype: any) =>
                                        onUpdate(changePeriodeType(this.props.periode, periodetype))
                                    }
                                />
                            ),
                        },

                        {
                            id: `gradering-${periode.id}`,
                            className: bem.element('gradering'),
                            render: () => (
                                <GraderingMeny
                                    disabled={disabled}
                                    foreldernavn={omForeldre.erDeltOmsorg ? foreldernavn : getMessage(intl, 'du')}
                                    gradering={periode.gradering}
                                    onChange={(gradering: any) => onUpdate({ ...this.props.periode, gradering })}
                                    uttaksdagerBrukt={antallUttaksdagerBrukt}
                                />
                            ),
                            isVisibleCheck: () => periode.type === Periodetype.GradertUttak,
                        },
                        {
                            id: `forelder-${periode.id}`,
                            className: bem.element('foreldre'),
                            render: () => (
                                <ForelderMeny
                                    forelder={this.props.periode.forelder}
                                    mor={this.props.omForeldre.mor}
                                    farMedmor={this.props.omForeldre.farMedmor!}
                                    disabled={forelderErLåst || disabled}
                                    kanVelgeBeggeForeldre={kanBeggeForeldreVelgesForPeriodetype(periode.type)}
                                    onChange={(forelder: any, medforelder: any) =>
                                        onUpdate({
                                            ...this.props.periode,
                                            forelder,
                                        })
                                    }
                                />
                            ),
                            isVisibleCheck: () => omForeldre.erDeltOmsorg,
                        },
                        ...(isUlønnetPermisjon(periode)
                            ? [
                                  {
                                      id: `ulønnetPermisjon-${periode.id}`,
                                      className: bem.element('ulonnetPermisjon'),
                                      render: () => (
                                          <UlønnetPermisjonMeny
                                              forelder={periode.forelder}
                                              omForeldre={omForeldre}
                                              utsettelsesårsak={periode.utsettelsesårsak}
                                              dropdownStyle="filled"
                                              disabled={disabled}
                                              onChange={(utsettelsesårsak: any) => {
                                                  onUpdate({
                                                      ...(this.props.periode as UlønnetPermisjon),
                                                      utsettelsesårsak,
                                                  });
                                              }}
                                          />
                                      ),
                                      isVisibleCheck: () =>
                                          !avsluttendeUlønnedePermisjoner.some((p) => p.id === periode.id),
                                  },
                              ]
                            : []),

                        {
                            id: `varighet-${periode.id}`,
                            className: bem.element('varighet'),
                            render: () => (
                                <VarighetMeny
                                    disabled={disabled}
                                    skjemaProps={{
                                        perioder,
                                        erNyPeriode: false,
                                        periodetype: periode.type,
                                        gradering: periode.gradering,
                                        antallUttaksdager,
                                        antallUttaksdagerBrukt,
                                        minDato:
                                            periode.type === Periodetype.UttakFørTermin
                                                ? uttaksdatoer.førFødsel.førsteMuligeUttaksdag
                                                : uttaksdatoer.førsteUttaksdag,
                                        maksDato:
                                            periode.type === Periodetype.UttakFørTermin
                                                ? uttaksdatoer.førFødsel.sisteUttaksdagFørFødsel
                                                : uttaksdatoer.etterFødsel.sisteMuligeUttaksdag,
                                        tidsperiode: {
                                            fom,
                                            tom,
                                        },
                                        onTidsperiodeChange: (tidsperiode) =>
                                            isValidTidsperiode(tidsperiode)
                                                ? onUpdate({
                                                      ...this.props.periode,
                                                      tidsperiode,
                                                  })
                                                : null,
                                        onVarighetChange: this.handleChangeVarighet,
                                        ingenVarighet:
                                            periode.type === Periodetype.UttakFørTermin
                                                ? periode.skalIkkeHaUttakFørTermin
                                                : undefined,
                                    }}
                                    dropdownStyle="filled"
                                />
                            ),
                        },
                    ]}
                    slett={
                        kanSlettes
                            ? {
                                  ariaLabel: getMessage(intl, 'periodeliste.ariatekst.slettPeriode'),
                                  onRemove: () => onRemove(this.props.periode),
                              }
                            : undefined
                    }
                    info={
                        periode.type === Periodetype.Ferie && antallUttaksdagerBrukt > 0
                            ? [
                                  getMessage(intl, 'uttaksplan.ferie.inneholderHelligdager', {
                                      dager: antallUttaksdagerBrukt,
                                      navn: foreldernavn,
                                  }),
                              ]
                            : undefined
                    }
                    regelAvvik={regelAvvik}
                />
            </PeriodeBlokk>
        );
    }
}

export default injectIntl(PeriodeElement);
