import { StonadskontoType } from 'app/types';

export type GenerellTekst =
	| 'applikasjonstittel'
	| 'forelder1'
	| 'forelder2'
	| 'uker'
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
	| 'utsettelseskjema.knapp.fjern'
	| 'utsettelseskjema.ferievarsel.ulovlig'
	| 'utsettelseskjema.ferievarsel.kreveroverforing';

export type SkjemaTekst =
	| 'skjema.label.forelder1'
	| 'skjema.label.forelder2'
	| 'skjema.label.termindato'
	| 'skjema.feilmelding.ugyldig_termindato'
	| 'skjema.label.sats'
	| 'skjema.label.sats80'
	| 'skjema.label.sats100'
	| 'skjema.veiledning.sats.alttekst'
	| 'skjema.veiledning.sats'
	| 'skjema.label.sats80'
	| 'skjema.label.sats100'
	| 'skjema.fordeling.sporsmal'
	| 'skjema.fordeling.veiledning'
	| 'skjema.fordeling.uker'
	| 'skjema.fordeling.reduser.tooltip';

export type Tidslinje =
	| 'tidslinje.tittel'
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

export type OppholdTekst =
	| 'opphold.arsak.ferie'
	| 'opphold.arsak.arbeid'
	| 'opphold.tittel'
	| 'opphold.knapp.leggtil'
	| 'opphold.knapp.ulonnetpermisjon';

export type SkjulteTekster =
	| 'skjermleser.skjema.tittel'
	| 'skjermleser.fordeling_av_fellesperiode'
	| 'skjermleser.tidslinje.oppsummering.tittel';

export type Veiledningstekster =
	| 'veileder.forbehold.intro'
	| 'veileder.forbehold.utvidetinfo.tittel'
	| 'veileder.forbehold.utvidetinfo.html'
	| 'veileder.ulonnetpermisjon.tittel'
	| 'veileder.ulonnetpermisjon.intro.html'
	| 'veileder.ulonnetpermisjon.utvidetinfo'
	| 'veileder.ulonnetpermisjon.utvidetinfo.navlenketekst';

export type AppTekster =
	| UtsettelsesskjemaTekst
	| GenerellTekst
	| SkjemaTekst
	| Tidslinje
	| StonadskontoType
	| Stonadkontotyper
	| OppholdTekst
	| SkjulteTekster
	| Veiledningstekster;
