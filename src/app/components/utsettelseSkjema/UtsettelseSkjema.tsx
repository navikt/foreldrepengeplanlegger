import * as React from 'react';
import { FormEvent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Row, Column } from 'nav-frontend-grid';
import { Feil } from 'nav-frontend-skjema';
import {
	UtsettelseArsakType,
	Utsettelsesperiode,
	Forelder,
	Periodetype,
	Tidsperiode,
	Permisjonsregler
} from 'app/types';
import DateInput, { Range } from 'shared/components/dateInput/DateInput';
import Radioliste from 'shared/components/radioliste/Radioliste';
import { validerDato, normaliserDato } from 'app/utils';
import { isBefore, isSameDay, isAfter } from 'date-fns';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import Ferieinfo from 'app/components/utsettelseSkjema/Ferieinfo';
import {
	getAntallUttaksdagerITidsperiode,
	getForsteUttaksdagForDato
} from 'app/utils/uttaksdagerUtils';
import {
	getAntallFeriedagerForForelder,
	getSisteMuligePermisjonsdag
} from 'app/utils/permisjonUtils';

import './utsettelseSkjema.less';
import EkspanderbartInnhold from 'shared/components/ekspanderbartInnhold/EkspanderbartInnhold';
import { AppTekster } from 'app/intl/tekstnokler';
import { renderDag } from 'app/utils/renderUtils';

interface OwnProps {
	termindato: Date;
	tidsrom: Tidsperiode;
	utsettelse?: Utsettelsesperiode;
	registrerteUtsettelser: Utsettelsesperiode[];
	navnForelder1?: string;
	navnForelder2?: string;
	permisjonsregler: Permisjonsregler;
	onChange: (utsettelse: Utsettelsesperiode) => void;
	onFjern: (utsettelse: Utsettelsesperiode) => void;
}

type Props = OwnProps & InjectedIntlProps;

type Skjemaelement =
	| 'arsak'
	| 'forelder'
	| 'startdato'
	| 'sluttdato'
	| 'feriedager';

type Valideringsfeil = Map<Skjemaelement, Feil>;

interface State {
	arsak?: UtsettelseArsakType;
	forelder?: Forelder;
	startdato?: Date;
	sluttdato?: Date;
	valideringsfeil: Valideringsfeil;
	visValideringsfeil?: boolean;
}

const preventDefaultEvent = (e: FormEvent<HTMLFormElement>) => {
	e.stopPropagation();
	e.preventDefault();
};

class UtsettelseSkjema extends React.Component<Props, State> {
	revaliderTimeoutId: number;
	skalValidere: boolean;

	constructor(props: Props) {
		super(props);
		const { utsettelse } = props;
		this.hentSkjemadata = this.hentSkjemadata.bind(this);
		this.setStartdato = this.setStartdato.bind(this);
		this.setSluttdato = this.setSluttdato.bind(this);
		this.getAntallFeriedager = this.getAntallFeriedager.bind(this);
		// this.setValideringsfeil = this.setValideringsfeil.bind(this);
		// this.clearValideringsfeil = this.clearValideringsfeil.bind(this);
		this.getFeil = this.getFeil.bind(this);
		this.validerSkjema = this.validerSkjema.bind(this);
		this.revaliderSkjema = this.revaliderSkjema.bind(this);
		this.getUgyldigeTidsrom = this.getUgyldigeTidsrom.bind(this);
		this.getTilTidsromSluttdato = this.getTilTidsromSluttdato.bind(this);
		const state: State = utsettelse
			? {
					valideringsfeil: new Map(),
					arsak: utsettelse.arsak,
					forelder: utsettelse.forelder,
					startdato: utsettelse.tidsperiode
						? utsettelse.tidsperiode.startdato
						: undefined,
					sluttdato: utsettelse.tidsperiode
						? utsettelse.tidsperiode.sluttdato
						: undefined
			  }
			: {
					valideringsfeil: new Map()
			  };

		this.state = {
			...state
		};
	}

	// setValideringsfeil(skjemaelement: Skjemaelement, feil: Feil) {
	// 	const valideringsfeil = new Map(this.state.valideringsfeil);
	// 	valideringsfeil.set(skjemaelement, feil);
	// 	this.setState({
	// 		valideringsfeil
	// 	});
	// }

	// clearValideringsfeil(skjemaelement: Skjemaelement) {
	// 	const valideringsfeil = new Map(this.state.valideringsfeil);
	// 	valideringsfeil.delete(skjemaelement);
	// 	this.setState({
	// 		valideringsfeil
	// 	});
	// }

	getFeil(skjemaelement: Skjemaelement): Feil | undefined {
		return this.state.valideringsfeil.get(skjemaelement);
	}

	setStartdato(dato: string) {
		const startdato = normaliserDato(new Date(dato));
		const sluttdato = this.state.sluttdato;
		this.setState({
			startdato,
			sluttdato: sluttdato
				? isBefore(startdato, sluttdato) || isSameDay(startdato, sluttdato)
					? sluttdato
					: undefined
				: undefined
		});
		this.revaliderSkjema();
	}

	setSluttdato(dato: string) {
		const sluttdato = normaliserDato(new Date(dato));
		this.setState({ sluttdato });
		this.revaliderSkjema();
	}

	revaliderSkjema() {
		if (this.revaliderTimeoutId) {
			window.clearTimeout(this.revaliderTimeoutId);
		}
		this.skalValidere = true;
		this.revaliderTimeoutId = window.setTimeout(this.validerSkjema, 0);
	}

	validerSkjema(): Valideringsfeil {
		this.skalValidere = false;
		const valideringsfeil: Valideringsfeil = new Map();
		const ugyldigeTidsrom = this.getUgyldigeTidsrom();
		const startdato = this.state.startdato;
		const sluttdato = this.state.sluttdato;

		if (!startdato) {
			valideringsfeil.set('startdato', {
				feilmelding: intlString(
					this.props.intl,
					'utsettelseskjema.feil.startdatoMangler'
				)
			});
		} else {
			const datoValideringsfeil = validerDato(
				startdato,
				this.props.tidsrom,
				ugyldigeTidsrom,
				this.props.termindato
			);
			if (datoValideringsfeil) {
				valideringsfeil.set('startdato', {
					feilmelding: intlString(
						this.props.intl,
						`datovalidering.${datoValideringsfeil}` as AppTekster,
						{ datonavn: intlString(this.props.intl, 'startdato') }
					)
				});
			}
		}
		if (!sluttdato) {
			valideringsfeil.set('sluttdato', {
				feilmelding: intlString(
					this.props.intl,
					'utsettelseskjema.feil.sluttdatoMangler'
				)
			});
		} else {
			const datoValideringsfeil = validerDato(
				sluttdato,
				{
					...this.props.tidsrom,
					sluttdato: this.getTilTidsromSluttdato(
						startdato || this.props.tidsrom.startdato
					)
				},
				ugyldigeTidsrom
			);
			if (datoValideringsfeil) {
				valideringsfeil.set('sluttdato', {
					feilmelding: intlString(
						this.props.intl,
						`datovalidering.${datoValideringsfeil}` as AppTekster,
						{ datonavn: intlString(this.props.intl, 'sluttdato') }
					)
				});
			} else if (startdato && isBefore(sluttdato, startdato)) {
				valideringsfeil.set('sluttdato', {
					feilmelding: intlString(
						this.props.intl,
						'utsettelseskjema.feil.sluttdatoEtterStartdato'
					)
				});
			}
		}
		if (
			this.state.arsak === UtsettelseArsakType.Ferie &&
			this.getAntallFeriedager() >
				this.props.permisjonsregler.maksFeriedagerMedOverføring
		) {
			valideringsfeil.set('feriedager', {
				feilmelding: intlString(
					this.props.intl,
					'utsettelseskjema.feil.ugyldigAntallFeriedager'
				)
			});
		}
		this.setState({ valideringsfeil });
		return valideringsfeil;
	}

	hentSkjemadata(): Utsettelsesperiode {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		return {
			id: this.props.utsettelse ? this.props.utsettelse.id : undefined,
			type: Periodetype.Utsettelse,
			arsak,
			tidsperiode: {
				startdato,
				sluttdato
			},
			forelder
		} as any;
	}

	handleSubmitClick(evt: React.MouseEvent<HTMLButtonElement>) {
		evt.preventDefault();
		const valideringsfeil = this.validerSkjema();
		if (valideringsfeil.size === 0) {
			this.setState({ visValideringsfeil: false });
			this.props.onChange(this.hentSkjemadata());
		} else {
			this.setState({ visValideringsfeil: true, valideringsfeil });
		}
	}

	getAntallFeriedager() {
		let registrerteFeriedager = 0;
		let nyeFeriedager = 0;
		let feriedagerDenneUtsettelsen = 0;

		if (this.state.forelder && this.state.arsak === UtsettelseArsakType.Ferie) {
			registrerteFeriedager = getAntallFeriedagerForForelder(
				this.props.registrerteUtsettelser,
				this.state.forelder
			);
		}

		if (this.state.startdato && this.state.sluttdato) {
			nyeFeriedager = getAntallUttaksdagerITidsperiode({
				startdato: this.state.startdato,
				sluttdato: this.state.sluttdato
			});
		}

		if (this.props.utsettelse) {
			feriedagerDenneUtsettelsen = getAntallUttaksdagerITidsperiode(
				this.props.utsettelse.tidsperiode
			);
		}

		return registrerteFeriedager + nyeFeriedager - feriedagerDenneUtsettelsen;
	}

	getUgyldigeTidsrom(): Range[] | undefined {
		const ugyldigeTidsrom =
			this.props.registrerteUtsettelser &&
			this.props.registrerteUtsettelser
				.filter(
					(u) => !this.props.utsettelse || this.props.utsettelse.id !== u.id
				)
				.map((u) => ({
					from: u.tidsperiode.startdato,
					to: u.tidsperiode.sluttdato
				}));
		return ugyldigeTidsrom;
	}

	getTilTidsromSluttdato(tilTidsromStartdato: Date) {
		const { registrerteUtsettelser } = this.props;
		if (registrerteUtsettelser.length > 0) {
			const pafolgendeUtsettelser = registrerteUtsettelser.filter((u) =>
				isAfter(u.tidsperiode.startdato, tilTidsromStartdato)
			);
			if (pafolgendeUtsettelser.length > 0) {
				return getForsteUttaksdagForDato(
					pafolgendeUtsettelser[0].tidsperiode.startdato
				);
			}
		}
		return getSisteMuligePermisjonsdag(
			this.props.termindato,
			this.props.permisjonsregler
		);
	}

	render() {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		const {
			utsettelse,
			navnForelder1,
			navnForelder2,
			tidsrom,
			intl
		} = this.props;

		const tilTidsromStartdato = startdato ? startdato : tidsrom.startdato;
		const tilTidsrom: Tidsperiode = {
			startdato: tilTidsromStartdato,
			sluttdato: this.getTilTidsromSluttdato(tilTidsromStartdato)
		};

		const ugyldigeTidsrom = this.getUgyldigeTidsrom();

		const antallFeriedager =
			this.state.arsak === UtsettelseArsakType.Ferie
				? this.getAntallFeriedager()
				: 0;

		const visFerieinfo = forelder && arsak === 'ferie';

		const startdatoFeil = this.getFeil('startdato');
		const sluttdatoFeil = this.getFeil('sluttdato');

		const visStartdatofeil =
			!this.skalValidere &&
			startdatoFeil &&
			(this.state.visValideringsfeil || this.state.startdato !== undefined);
		const visSluttdatofeil =
			!this.skalValidere &&
			sluttdatoFeil &&
			(this.state.visValideringsfeil || this.state.sluttdato !== undefined);

		return (
			<form
				action="#"
				onSubmit={preventDefaultEvent}
				className="utsettelseSkjema dialogContent">
				<h1 className="typo-undertittel m-textCenter blokk-s">
					<IntlTekst id="utsettelseskjema.tittel" />
				</h1>
				<div className="blokkPad-s">
					<Radioliste
						kolonner="2"
						tittel={intlString(intl, 'utsettelseskjema.hvem.sporsmal')}
						inputnavn="forelder"
						stil="ekstern"
						feil={this.getFeil('forelder')}
						valg={[
							{
								tittel: navnForelder1 || intlString(intl, 'Forelder1'),
								verdi: 'forelder1'
							},
							{
								tittel: navnForelder2 || intlString(intl, 'Forelder2'),
								verdi: 'forelder2'
							}
						]}
						valgtVerdi={forelder}
						onChange={(value) => {
							this.setState({ forelder: value as Forelder });
							this.revaliderSkjema();
						}}
					/>
				</div>

				<EkspanderbartInnhold
					erApen={forelder !== undefined}
					harEkspanderbartInnhold={true}>
					<div className="blokkPad-xxs">
						<Radioliste
							tittel={
								<IntlTekst
									id="utsettelseskjema.arsak.sporsmal"
									values={{
										navn:
											forelder === 'forelder1' ? navnForelder1 : navnForelder2
									}}
								/>
							}
							stil="ekstern"
							feil={this.getFeil('arsak')}
							valg={[
								{
									tittel: intl.formatMessage({
										id: 'utsettelseskjema.arsak.arbeid'
									}),
									verdi: UtsettelseArsakType.Arbeid
								},
								{
									tittel: intlString(intl, 'utsettelseskjema.arsak.ferie'),
									verdi: UtsettelseArsakType.Ferie
								}
							]}
							inputnavn="utsettelse"
							valgtVerdi={arsak}
							onChange={(value) => {
								this.setState({ arsak: value as UtsettelseArsakType });
								this.revaliderSkjema();
							}}
						/>
					</div>
				</EkspanderbartInnhold>

				<EkspanderbartInnhold
					erApen={this.state.arsak !== undefined}
					harEkspanderbartInnhold={true}>
					<div className="blokkPad-s">
						<Row>
							<Column xs="12" sm="6">
								<div className="blokkPad-s">
									<DateInput
										label={intl.formatMessage({
											id: 'utsettelseskjema.startdato.sporsmal'
										})}
										id="startdato"
										errorMessage={
											visStartdatofeil && startdatoFeil
												? startdatoFeil.feilmelding
												: undefined
										}
										fromDate={tidsrom.startdato}
										toDate={tidsrom.sluttdato}
										onChange={(date) => this.setStartdato(date)}
										onInputBlur={(date) => {
											this.setStartdato(date);
										}}
										renderDay={renderDag}
										selectedDate={startdato}
										disabledRanges={ugyldigeTidsrom}
										disableWeekends={true}
										fullscreen={true}
									/>
								</div>
							</Column>
							<Column xs="12" sm="6">
								<div className="blokkPad-s">
									<DateInput
										label={intlString(
											intl,
											'utsettelseskjema.sluttdato.sporsmal'
										)}
										id="sluttdato"
										errorMessage={
											visSluttdatofeil && sluttdatoFeil
												? sluttdatoFeil.feilmelding
												: undefined
										}
										fromDate={tilTidsrom.startdato}
										toDate={tilTidsrom.sluttdato}
										onChange={(date) => this.setSluttdato(date)}
										onInputBlur={(date) => this.setSluttdato(date)}
										selectedDate={sluttdato}
										disabledRanges={ugyldigeTidsrom}
										disableWeekends={true}
										fullscreen={true}
									/>
								</div>
							</Column>
						</Row>
						{visFerieinfo && (
							<Ferieinfo
								feriedager={antallFeriedager}
								permisjonsregler={this.props.permisjonsregler}
								forelderNavn={
									forelder === 'forelder1'
										? navnForelder1 || intlString(intl, 'forelder1')
										: navnForelder2 || intlString(intl, 'forelder2')
								}
							/>
						)}
					</div>
				</EkspanderbartInnhold>
				{this.state.arsak !== undefined && (
					<Row>
						<Column xs="12" sm={utsettelse ? '6' : '12'}>
							<div className="blokkPad-xxs">
								<Hovedknapp
									onClick={(evt) => this.handleSubmitClick(evt)}
									className="m-fullBredde">
									{utsettelse ? (
										<IntlTekst id="utsettelseskjema.knapp.oppdater" />
									) : (
										<IntlTekst id="utsettelseskjema.knapp.leggtil" />
									)}
								</Hovedknapp>
							</div>
						</Column>
						{utsettelse && (
							<Column xs="12" sm="6">
								<Knapp
									type="standard"
									htmlType="button"
									onClick={() => this.props.onFjern(utsettelse)}
									className="m-fullBredde">
									<IntlTekst id="utsettelseskjema.knapp.fjern" />
								</Knapp>
							</Column>
						)}
					</Row>
				)}
			</form>
		);
	}
}

export default injectIntl(UtsettelseSkjema);
