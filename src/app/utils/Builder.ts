import moment from 'moment';
import { Periode, isUlønnetPermisjon } from '../types/periodetyper';
import { Periodene, sorterPerioder } from './Periodene';
import { Uttaksdagen } from './Uttaksdagen';
import { Perioden } from './Perioden';
import { guid } from 'nav-frontend-js-utils';
import { getTidsperiode, Tidsperioden } from './Tidsperioden';
import arrayMove from 'array-move';
import { getUttaksinfoForPeriode } from './uttaksinfo';

export const UttaksplanBuilder = (perioder: Periode[], førsteUttaksdag: Date) => {
    return new Builder(perioder, førsteUttaksdag);
};

interface BuilderSettings {
    useFixedPerioder: boolean;
    slåSammenPerioder: boolean;
}

const SETTINGS: BuilderSettings = {
    useFixedPerioder: false,
    slåSammenPerioder: false
};

class Builder {
    protected førsteUttaksdag: Date;

    public constructor(public perioder: Periode[], førsteUttaksdag: Date, gjelderBareFarHarRett?: boolean) {
        this.perioder = perioder;
        this.førsteUttaksdag = førsteUttaksdag;
    }

    build() {
        if (SETTINGS.useFixedPerioder) {
            const fastePerioder = this.perioder.filter((p) => p.fixed === true);
            const fleksiblePerioder = this.perioder.filter((p) => p.fixed !== true);

            this.perioder = resetTidsperioder(fleksiblePerioder, this.førsteUttaksdag);
            this.perioder = slåSammenLikePerioder(this.perioder);
            this.perioder = settInnPerioder(this.perioder, fastePerioder);
            this.sort();
            this.perioder = slåSammenLikePerioder(this.perioder);
            this.perioder = fjernUtsettelsesårsakPåAvsluttendeUlønnedePermisjoner(this.perioder);
        } else {
            this.perioder = resetTidsperioder(this.perioder, this.førsteUttaksdag);
            this.perioder = fjernUtsettelsesårsakPåAvsluttendeUlønnedePermisjoner(this.perioder);
        }

        return this;
    }

    leggTilPeriode(periode: Periode) {
        this.perioder = settInnPeriode(this.perioder, periode).sort();
        return this;
    }

    fjernPeriode(periode: Periode) {
        this.perioder = slettPeriode(this.perioder, periode).sort();
        return this;
    }

    oppdaterPeriode(periode: Periode) {
        this.perioder = this.perioder.map((p) => (p.id === periode.id ? { ...periode } : p));
        return this;
    }

    flyttPeriode(periodeSomFlyttes: Periode, toIndex: number) {
        const fromIndex = this.perioder.indexOf(periodeSomFlyttes);
        const startDato = this.perioder[0].tidsperiode.fom;
        this.perioder = arrayMove(this.perioder, fromIndex, toIndex);
        this.perioder[0] = Perioden(this.perioder[0]).setStartdato(startDato);
        this.perioder = resetTidsperioder(this.perioder, this.førsteUttaksdag, true);
        return this;
    }
    slåSammenPerioder(periode1: Periode, periode2: Periode) {
        if (Perioden(periode1).erLik(periode2)) {
            this.perioder = slåSammenLikePerioder(this.perioder, true);
        }
        return this;
    }
    sort() {
        this.perioder.sort(sorterPerioder);
        return this;
    }
    oppdaterUttaksinfo() {
        this.perioder.map((p) => ({ ...p, uttaksinfo: getUttaksinfoForPeriode(p) }));
        return this;
    }
}

function resetTidsperioder(perioder: Periode[], førsteUttaksdag: Date, skipSort?: boolean): Periode[] {
    let forrigePeriode: Periode;
    const sammenslåttePerioder = slåSammenLikePerioder(
        skipSort ? perioder : perioder.sort(sorterPerioder)
    ) as Periode[];

    if (perioder.length > 0) {
        sammenslåttePerioder[0] = Perioden(sammenslåttePerioder[0]).setStartdato(førsteUttaksdag);
    }
    const resattePerioder = sammenslåttePerioder.map((periode) => {
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return periode;
        }
        forrigePeriode = {
            ...periode,
            tidsperiode: getTidsperiode(
                Uttaksdagen(forrigePeriode.tidsperiode.tom).neste(),
                Tidsperioden(periode.tidsperiode).getAntallUttaksdager()
            )
        };
        return {
            ...periode,
            tidsperiode: { ...forrigePeriode.tidsperiode }
        };
    });

    return resattePerioder;
}

function settInnPerioder(perioder: Periode[], perioder2: Periode[]): Periode[] {
    if (perioder.length === 0) {
        return perioder2;
    }
    let nyePerioder: Periode[] = [...perioder];
    perioder2.sort(sorterPerioder).forEach((periode) => {
        nyePerioder = settInnPeriode(nyePerioder, periode);
    });
    return nyePerioder.sort(sorterPerioder);
}

function slåSammenLikePerioder(perioder: Periode[], forceSlåSammen?: boolean): Periode[] {
    if (SETTINGS.slåSammenPerioder !== true && forceSlåSammen !== true) {
        return perioder;
    }
    if (perioder.length <= 1) {
        return perioder;
    }
    const nyePerioder: Periode[] = [];
    let forrigePeriode: Periode | undefined = { ...perioder[0] };
    perioder.forEach((periode, index) => {
        if (index === 0) {
            return;
        }
        if (forrigePeriode === undefined) {
            forrigePeriode = periode;
            return;
        }
        if (Perioden(forrigePeriode).erLik(periode) && Perioden(forrigePeriode).erSammenhengende(periode)) {
            forrigePeriode.tidsperiode.tom = periode.tidsperiode.tom;
            return;
        } else {
            nyePerioder.push(forrigePeriode);
            forrigePeriode = undefined;
        }
        forrigePeriode = periode;
    });
    nyePerioder.push(forrigePeriode);

    return nyePerioder;
}

function slettPeriode(perioder: Periode[], periode: Periode) {
    return perioder.filter((p) => p.id !== periode.id);
}

function settInnPeriode(perioder: Periode[], nyPeriode: Periode): Periode[] {
    if (perioder.length === 0) {
        return [nyPeriode];
    }
    const berørtePerioder = Periodene(perioder).finnOverlappendePerioder(nyPeriode);
    const periodeSomMåSplittes = Periodene(perioder).finnPeriodeMedDato(nyPeriode.tidsperiode.fom);

    if (berørtePerioder.length === 0 && periodeSomMåSplittes === undefined) {
        const nyPeriodeliste = [...perioder, nyPeriode].sort(sorterPerioder);
        // if (nyPeriodeliste[nyPeriodeliste.length - 1].id === nyPeriode.id) {
        //     return finnOgSettInnHull(nyPeriodeliste);
        // }
        return nyPeriodeliste;
    }

    if (!periodeSomMåSplittes) {
        const foregåendePeriode = Periodene(perioder)
            .finnAlleForegåendePerioder(nyPeriode)
            .pop();
        if (foregåendePeriode) {
            return leggTilPeriodeEtterPeriode(perioder, foregåendePeriode, nyPeriode);
        }
        return leggTilPeriodeFørPeriode(perioder, perioder[0], nyPeriode);
    }

    // if (periodeSomMåSplittes.fixed === true) {
    //     throw new Error('Kan ikke dele opp en fixed periode');
    // }
    if (moment.utc(periodeSomMåSplittes.tidsperiode.fom).isSame(nyPeriode.tidsperiode.fom, 'day')) {
        return leggTilPeriodeEtterPeriode(perioder, periodeSomMåSplittes, nyPeriode);
    } else {
        return leggTilPeriodeIPeriode(perioder, periodeSomMåSplittes, nyPeriode);
    }
}

function leggTilPeriodeEtterPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const uttaksdagerIUtsettelse: number = Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();
    return [
        ...perioderFør,
        ...[nyPeriode],
        ...Periodene([periode, ...perioderEtter]).forskyvPerioder(uttaksdagerIUtsettelse)
    ];
}

function leggTilPeriodeFørPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const uttaksdagerIUtsettelse: number = Tidsperioden(nyPeriode.tidsperiode).getAntallUttaksdager();
    return [...[nyPeriode], ...Periodene([periode, ...perioderEtter]).forskyvPerioder(uttaksdagerIUtsettelse)];
}

function leggTilPeriodeIPeriode(perioder: Periode[], periode: Periode, nyPeriode: Periode): Periode[] {
    const perioderFør = Periodene(perioder).finnAlleForegåendePerioder(periode);
    const perioderEtter = Periodene(perioder).finnAllePåfølgendePerioder(periode);
    const splittetPeriode = splittPeriodeMedPeriode(periode, nyPeriode);
    const opprinneligVarighet = Perioden(periode).getAntallUttaksdager();
    const nyVarighet = Tidsperioden({
        fom: splittetPeriode[0].tidsperiode.fom,
        tom: splittetPeriode[2].tidsperiode.tom // Ta høyde for at split inneholdt opphold
    }).getAntallUttaksdager();
    const uttaksdager = nyVarighet - opprinneligVarighet;
    return [...perioderFør, ...splittetPeriode, ...Periodene(perioderEtter).forskyvPerioder(uttaksdager)];
}

function splittPeriodeMedPeriode(periode: Periode, nyPeriode: Periode): Periode[] {
    const dagerIPeriode = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const dagerForsteDel = Tidsperioden({
        fom: periode.tidsperiode.fom,
        tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige()
    }).getAntallUttaksdager();
    let dagerSisteDel = dagerIPeriode - dagerForsteDel;
    const forste: Periode = {
        ...periode,
        tidsperiode: {
            fom: periode.tidsperiode.fom,
            tom: Uttaksdagen(nyPeriode.tidsperiode.fom).forrige()
        }
    };
    const midt: Periode = {
        ...nyPeriode,
        tidsperiode: {
            fom: Uttaksdagen(nyPeriode.tidsperiode.fom).denneEllerNeste(),
            tom: Uttaksdagen(nyPeriode.tidsperiode.tom).denneEllerForrige()
        }
    };
    const startSisteDel: Date = Uttaksdagen(midt.tidsperiode.tom).neste();

    if (Perioden(periode).erUlønnetPermisjon()) {
        dagerSisteDel = dagerSisteDel - Perioden(midt).getAntallUttaksdager();
    }
    const siste: Periode = {
        ...periode,
        id: guid(),
        tidsperiode: getTidsperiode(startSisteDel, dagerSisteDel)
    };
    return [forste, midt, siste];
}

function fjernUtsettelsesårsakPåAvsluttendeUlønnedePermisjoner(perioder: Periode[]): Periode[] {
    let annenTypePeriodeFunnet = false;
    const revPerioder = perioder
        .slice()
        .reverse()
        .map((periode) => {
            if (isUlønnetPermisjon(periode) && annenTypePeriodeFunnet === false) {
                return {
                    ...periode,
                    utsettelsesårsak: undefined
                };
            }
            annenTypePeriodeFunnet = true;
            return periode;
        })
        .reverse();
    return revPerioder;
}
