import * as React from 'react';
import { FormEvent } from 'react';
import { Collapse } from 'react-collapse';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Row, Column } from 'nav-frontend-grid';
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
import { erGyldigDato } from 'app/utils';
import { isBefore, isSameDay, isAfter } from 'date-fns';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import Ferieinfo from 'app/components/utsettelseSkjema/Ferieinfo';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import { getAntallFeriedagerForForelder } from 'app/utils/permisjonUtils';
import Veilederinfo from 'app/elements/veilederinfo/Veilederinfo';

import './utsettelseSkjema.less';

interface OwnProps {
	tidsrom: Tidsperiode;
	utsettelse?: Utsettelsesperiode;
	registrerteUtsettelser: Utsettelsesperiode[];
	navnForelder1: string;
	navnForelder2: string;
	permisjonsregler: Permisjonsregler;
	onChange: (utsettelse: Utsettelsesperiode) => void;
	onFjern: (utsettelse: Utsettelsesperiode) => void;
}

type Props = OwnProps & InjectedIntlProps;

interface State {
	arsak?: UtsettelseArsakType;
	forelder?: Forelder;
	startdato?: Date;
	sluttdato?: Date;
}

const preventDefaultEvent = (e: FormEvent<HTMLFormElement>) => {
	e.stopPropagation();
	e.preventDefault();
};

const getHvemTittel = (
	intl: InjectedIntl,
	arsak: UtsettelseArsakType | undefined
): string => {
	if (!arsak) {
		return intlString(intl, 'utsettelseskjema.hvem.sporsmal');
	}
	return arsak === UtsettelseArsakType.Ferie
		? intlString(intl, 'utsettelseskjema.hvem.sporsmal.ferie')
		: intlString(intl, 'utsettelseskjema.hvem.sporsmal.arbeid');
};

class UtsettelseSkjema extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const { utsettelse } = props;
		this.hentGyldigSkjemadata = this.hentGyldigSkjemadata.bind(this);
		this.setStartdato = this.setStartdato.bind(this);
		this.setSluttdato = this.setSluttdato.bind(this);
		this.getAntallFeriedager = this.getAntallFeriedager.bind(this);
		const state: State = utsettelse
			? {
					arsak: utsettelse.arsak,
					forelder: utsettelse.forelder,
					startdato: utsettelse.tidsperiode
						? utsettelse.tidsperiode.startdato
						: undefined,
					sluttdato: utsettelse.tidsperiode
						? utsettelse.tidsperiode.sluttdato
						: undefined
				}
			: {};

		this.state = {
			...state
		};
	}

	setStartdato(
		dato: string,
		tidsrom: Tidsperiode,
		ugyldigeTidsrom: Range[] = []
	) {
		const startdato = new Date(dato);
		const sluttdato = this.state.sluttdato;
		if (erGyldigDato(startdato, tidsrom, ugyldigeTidsrom)) {
			this.setState({
				startdato,
				sluttdato: sluttdato
					? isBefore(startdato, sluttdato) || isSameDay(startdato, sluttdato)
						? sluttdato
						: undefined
					: undefined
			});
		}
	}

	setSluttdato(
		dato: string,
		tilTidsrom: Tidsperiode,
		ugyldigeTidsrom: Range[] = []
	) {
		const sluttdato = new Date(dato);
		const startdato = this.state.startdato;
		if (
			erGyldigDato(sluttdato, tilTidsrom, ugyldigeTidsrom) &&
			((startdato &&
				(isAfter(sluttdato, startdato) || isSameDay(sluttdato, startdato))) ||
				!startdato)
		) {
			this.setState({ sluttdato });
		}
	}

	hentGyldigSkjemadata(): Utsettelsesperiode | undefined {
		if (
			this.state.arsak !== undefined &&
			this.state.sluttdato !== undefined &&
			this.state.startdato !== undefined &&
			this.state.forelder !== undefined
		) {
			const { arsak, startdato, sluttdato, forelder } = this.state;
			if (
				this.state.arsak === UtsettelseArsakType.Ferie &&
				this.getAntallFeriedager() >
					this.props.permisjonsregler.maksFeriedagerMedOverføring
			) {
				return undefined;
			}
			return {
				id: this.props.utsettelse ? this.props.utsettelse.id : undefined,
				type: Periodetype.Utsettelse,
				arsak,
				tidsperiode: {
					startdato,
					sluttdato
				},
				forelder
			};
		} else {
			return undefined;
		}
	}

	handleSubmitClick(evt: React.MouseEvent<HTMLButtonElement>) {
		evt.preventDefault();
		const skjemadata = this.hentGyldigSkjemadata();
		if (skjemadata) {
			this.props.onChange(skjemadata);
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

	render() {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		const {
			utsettelse,
			navnForelder1,
			navnForelder2,
			tidsrom,
			registrerteUtsettelser,
			intl
		} = this.props;

		const tilTidsrom: Tidsperiode = {
			startdato: startdato ? startdato : tidsrom.startdato,
			sluttdato: tidsrom.sluttdato
		};

		const ugyldigeTidsrom: Range[] | undefined =
			registrerteUtsettelser &&
			registrerteUtsettelser
				.filter(
					(u) => !this.props.utsettelse || this.props.utsettelse.id !== u.id
				)
				.map((u) => ({
					from: u.tidsperiode.startdato,
					to: u.tidsperiode.sluttdato
				}));

		const antallFeriedager =
			this.state.arsak === UtsettelseArsakType.Ferie
				? this.getAntallFeriedager()
				: 0;

		const visFerieinfo =
			forelder &&
			antallFeriedager > this.props.permisjonsregler.maksFeriedagerEttÅr;

		return (
			<form
				action="#"
				onSubmit={preventDefaultEvent}
				className="utsettelseSkjema dialogContent">
				<h1 className="typo-undertittel m-textCenter blokk-s">
					<IntlTekst id="utsettelseskjema.tittel" />
				</h1>
				<div className="blokk-xxs">
					<Radioliste
						tittel={<IntlTekst id="utsettelseskjema.tittel" />}
						stil="ekstern"
						kolonner="2"
						valg={[
							{
								tittel: intlString(intl, 'utsettelseskjema.arsak.ferie'),
								verdi: UtsettelseArsakType.Ferie
							},
							{
								tittel: intl.formatMessage({
									id: 'utsettelseskjema.arsak.arbeid'
								}),
								verdi: UtsettelseArsakType.Arbeid
							}
						]}
						inputnavn="utsettelse"
						valgtVerdi={arsak}
						onChange={(value) =>
							this.setState({ arsak: value as UtsettelseArsakType })
						}
					/>
				</div>
				<Collapse
					isOpened={this.state.arsak === UtsettelseArsakType.Ferie}
					springConfig={{ stiffness: 250, damping: 30 }}>
					<div className="blokkPad-s">
						<Veilederinfo>
							<IntlTekst id="utsettelseskjema.veiledning.ferie" />
						</Veilederinfo>
					</div>
				</Collapse>
				<div className="blokk-s">
					<Radioliste
						kolonner="2"
						tittel={getHvemTittel(intl, this.state.arsak)}
						inputnavn="forelder"
						stil="ekstern"
						valg={[
							{
								tittel: navnForelder1 || intlString(intl, 'forelder1'),
								verdi: 'forelder1'
							},
							{
								tittel: navnForelder2 || intlString(intl, 'forelder2'),
								verdi: 'forelder2'
							}
						]}
						valgtVerdi={forelder}
						onChange={(value) => this.setState({ forelder: value as Forelder })}
					/>
				</div>
				<div className="blokk-s">
					<Row>
						<Column xs="12" sm="6">
							<div className="blokk-s">
								<DateInput
									label={intl.formatMessage({
										id: 'utsettelseskjema.startdato.sporsmal'
									})}
									id="startdato"
									fromDate={tidsrom.startdato}
									toDate={tidsrom.sluttdato}
									onChange={(date) =>
										this.setStartdato(date, tidsrom, ugyldigeTidsrom)
									}
									selectedDate={startdato}
									disabledRanges={ugyldigeTidsrom}
									disableWeekends={true}
									fullscreen={true}
								/>
							</div>
						</Column>
						<Column xs="12" sm="6">
							<div className="blokk-s">
								<DateInput
									label={intlString(
										intl,
										'utsettelseskjema.sluttdato.sporsmal'
									)}
									id="sluttdato"
									fromDate={tilTidsrom.startdato}
									toDate={tilTidsrom.sluttdato}
									onChange={(date) =>
										this.setSluttdato(date, tilTidsrom, ugyldigeTidsrom)
									}
									selectedDate={sluttdato}
									disabledRanges={ugyldigeTidsrom}
									disableWeekends={true}
									fullscreen={true}
								/>
							</div>
						</Column>
					</Row>
				</div>
				{visFerieinfo && (
					<Ferieinfo
						feriedager={antallFeriedager}
						permisjonsregler={this.props.permisjonsregler}
						forelderNavn={navnForelder1}
					/>
				)}
				<Row>
					<Column xs="12" sm={utsettelse ? '6' : '12'}>
						<div className="blokk-xxs">
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
			</form>
		);
	}
}

export default injectIntl(UtsettelseSkjema);
