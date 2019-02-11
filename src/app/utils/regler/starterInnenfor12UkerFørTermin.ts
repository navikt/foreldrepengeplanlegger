import moment from 'moment';
import { Regelgrunnlag, RegelTest, RegelTestResultat, RegelAlvorlighet, Periode, Regel } from '../../types';

const starterInnenfor12UkerFørTermin: RegelTest = (grunnlag: Regelgrunnlag): RegelTestResultat => {
    const { periodeFørTermin, perioder, uttaksdatoer } = grunnlag;
    const { førsteMuligeUttaksdag } = uttaksdatoer.førFødsel;

    const perioderForSjekk: Periode[] = [
        ...(perioder ? perioder : []),
        ...(periodeFørTermin ? [periodeFørTermin] : [])
    ];

    const periode = perioderForSjekk.find((p) => moment(p.tidsperiode.fom).isSameOrAfter(førsteMuligeUttaksdag, 'day'));
    if (periode) {
        return {
            passerer: false,
            feil: {
                periode,
                alvorlighet: RegelAlvorlighet.ULOVLIG,
                feilmelding: {
                    intlKey: 'regel.feiler.starterInnenfor12UkerFørTermin'
                }
            }
        };
    }
    return { passerer: true };
};

const starterInnenfor12UkerFørTerminRegel: Regel = {
    key: 'starterInnenfor12UkerFørTerminRegel',
    test: starterInnenfor12UkerFørTermin,
    skalSjekkes: () => true
};

export default starterInnenfor12UkerFørTerminRegel;
