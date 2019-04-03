import * as React from 'react';
import moment from 'moment';
import { Periode, OmForeldre } from '../../types';
import { Periodene } from '../../utils/Periodene';
import Block from 'common/components/block/Block';
import AlertStripe from 'nav-frontend-alertstriper';
import { getForelderNavn, getNavnGenitivEierform } from '../../utils/common';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { InjectedIntl, injectIntl, InjectedIntlProps, FormattedHTMLMessage } from 'react-intl';
import { formaterDato } from 'common/utils/datoUtils';
import { getVarighetString } from 'common/utils/intlUtils';

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
        <Block margin="m">
            <AlertStripe type="info">
                <FormattedHTMLMessage
                    id="periodeskjema.melding.oppdeltPeriode"
                    values={{
                        navnEierform: getNavnGenitivEierform(navn || ''),
                        varighet: getVarighetString(antallUttaksdager, intl),
                        tidsperiode: Tidsperioden(periode.tidsperiode).formaterStringKort(intl)
                    }}
                />
            </AlertStripe>
        </Block>
    );
};

const PerioderSomVilBliFlyttetPå: React.StatelessComponent<{
    perioder: Periode[];
    antallUttaksdager: number;
    intl: InjectedIntl;
}> = ({ perioder, antallUttaksdager, intl }) => {
    return (
        <Block margin="m">
            <AlertStripe type="info">
                <FormattedHTMLMessage
                    id="periodeskjema.melding.perioderFlyttes"
                    values={{
                        dato: formaterDato(perioder[0].tidsperiode.fom),
                        varighet: getVarighetString(antallUttaksdager, intl)
                    }}
                />
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
    if (berørtePerioder === undefined || berørtePerioder.length === 0) {
        return null;
    }

    const periodeSomStarterSammeDag = moment(berørtePerioder[0].tidsperiode.fom).isSame(
        nyPeriode.tidsperiode.fom,
        'day'
    );
    if (periodeSomStarterSammeDag) {
        return (
            <PerioderSomVilBliFlyttetPå perioder={berørtePerioder} antallUttaksdager={antallUttaksdager} intl={intl} />
        );
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
