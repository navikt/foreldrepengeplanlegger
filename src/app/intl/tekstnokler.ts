import { StonadskontoType } from 'app/types';

export type GenerellTekst =
	| 'applikasjonstittel'
	| 'forelder1'
	| 'forelder2'
	| 'tittel.introtekst'
	| 'utvidetinfo.lukk'
	| 'utvidetinfo.lesmer';

export type UtsettelsesskjemaTekst =
	| 'utsettelseskjema.tittel'
	| 'utsettelseskjema.arsak.sporsmal'
	| 'utsettelseskjema.arsak.ferie'
	| 'utsettelseskjema.veiledning.ferie'
	| 'utsettelseskjema.arsak.arbeid'
	| 'utsettelseskjema.hvem.sporsmal'
	| 'utsettelseskjema.hvem.sporsmal.ferie'
	| 'utsettelseskjema.hvem.sporsmal.arbeid'
	| 'utsettelseskjema.startdato.sporsmal'
	| 'utsettelseskjema.sluttdato.sporsmal'
	| 'utsettelseskjema.knapp.leggtil'
	| 'utsettelseskjema.knapp.oppdater'
	| 'utsettelseskjema.knapp.fjern';

export type SkjemaTekst =
	| 'skjema.fordeling.sporsmal'
	| 'skjema.fordeling.reduser.tooltip';

export type Tidslinje =
	| 'tidslinje.periodeinfo.konto.uker'
	| 'tidslinje.periodeinfo.starterpermisjon.enkel'
	| 'tidslinje.periodeinfo.starterpermisjon.detaljert'
	| 'tidslinje.utsettelse'
	| 'tidslinje.periodeinfo.fortsettelse.fortsetter'
	| 'tidslinje.periodeinfo.fortsettelse.avslutter'
	| 'tidslinje.hendelse.termin'
	| 'tidslinje.hendelse.sistepermisjonsdag';

export type Stonadkontotyper =
	| 'stonadskonto.modrekvote'
	| 'stonadskonto.modrekvotePakrevd'
	| 'stonadskonto.fedrekvote'
	| 'stonadskonto.fellesperiode'
	| 'stonadskonto.foreldrepenger';

export type Utsettelsearsaker = 'utsettelse.ferie' | 'utsettelse.arbeid';

export type AppTekster =
	| UtsettelsesskjemaTekst
	| GenerellTekst
	| SkjemaTekst
	| Tidslinje
	| StonadskontoType
	| Stonadkontotyper
	| Utsettelsearsaker;
