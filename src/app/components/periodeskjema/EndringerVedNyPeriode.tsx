import * as React from 'react';
import moment from 'moment';
import { Periode, OmForeldre } from '../../types';
import { Periodene } from '../../utils/Periodene';
import Block from 'common/components/block/Block';
import AlertStripe from 'nav-frontend-alertstriper';
import Varighet from '../varighet/Varighet';
import { getForelderNavn } from '../../utils/common';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { InjectedIntl, injectIntl, InjectedIntlProps } from 'react-intl';
import { formaterDato } from 'common/utils/datoUtils';

interface Props {
    nyPeriode?: Partial<Periode>;
    perioder: Periode[];
    omForeldre: OmForeldre;
}

const PeriodeSomVilBliSplittet: React.StatelessComponent<{
    periode: Periode;
    antallUttaksdager: number;
    omForeldre: OmForeldre;
    intl: InjectedIntl;
}> = ({ periode, antallUttaksdager, omForeldre, intl }) => {
    const navn = getForelderNavn(periode.forelder, omForeldre);
    return (
        <Block margin="s">
            <AlertStripe type="info">
                {navn} sin periode ({Tidsperioden(periode.tidsperiode).formaterStringKort(intl)}), vil bli delt opp i to
                deler, og den nye perioden vil bli satt inn mellom de to delene. Påfølgende perioder vil bli forskjøvet
                med{' '}
                <strong>
                    <Varighet dager={antallUttaksdager} />
                </strong>
                .
            </AlertStripe>
        </Block>
    );
};

const PerioderSomVilBliFlyttetPå: React.StatelessComponent<{ perioder: Periode[]; antallUttaksdager: number }> = ({
    perioder,
    antallUttaksdager
}) => {
    return (
        <Block margin="s">
            <AlertStripe type="info">
                Perioder fra og med <strong>{formaterDato(perioder[0].tidsperiode.fom)}</strong> vil bli forskjøvet med{' '}
                <strong>
                    <Varighet dager={antallUttaksdager} />
                </strong>
                .
            </AlertStripe>
        </Block>
    );
};

const EndringerVedNyPeriode: React.StatelessComponent<Props & InjectedIntlProps> = ({
    nyPeriode,
    perioder,
    omForeldre,
    intl
}) => {
    if (
        !nyPeriode ||
        !perioder ||
        !nyPeriode.uttaksinfo ||
        !nyPeriode.uttaksinfo.antallUttaksdager ||
        !nyPeriode.tidsperiode ||
        !nyPeriode.tidsperiode.fom
    ) {
        return null;
    }
    const { antallUttaksdager } = nyPeriode.uttaksinfo;

    const berørtePerioder = Periodene(perioder).finnPerioderMedEllerEtterDato(nyPeriode.tidsperiode.fom);
    if (berørtePerioder === undefined) {
        return null;
    }

    const periodeSomStarterSammeDag = moment(berørtePerioder[0].tidsperiode.fom).isSame(
        nyPeriode.tidsperiode.fom,
        'day'
    );
    if (periodeSomStarterSammeDag) {
        return <PerioderSomVilBliFlyttetPå perioder={berørtePerioder} antallUttaksdager={antallUttaksdager} />;
    } else {
        return (
            <PeriodeSomVilBliSplittet
                periode={berørtePerioder[0]}
                antallUttaksdager={antallUttaksdager}
                omForeldre={omForeldre}
                intl={intl}
            />
        );
    }
};

export default injectIntl(EndringerVedNyPeriode);
