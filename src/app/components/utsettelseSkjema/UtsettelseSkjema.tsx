import * as React from 'react';
import { FormEvent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as classnames from 'classnames';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Row, Column } from 'nav-frontend-grid';
import { Feil, SkjemaGruppe } from 'nav-frontend-skjema';
import {
	UtsettelseArsakType,
	Utsettelsesperiode,
	Forelder,
	Periodetype,
	Tidsperiode,
	Permisjonsregler
} from 'app/types';
import DateInput from 'shared/components/dateInput/DateInput';
import Radioliste from 'shared/components/radioliste/Radioliste';
import { normaliserDato } from 'app/utils';
import { isBefore, isSameDay } from 'date-fns';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';
import Ferieinfo from 'app/components/utsettelseSkjema/Ferieinfo';
import EkspanderbartInnhold from 'shared/components/ekspanderbartInnhold/EkspanderbartInnhold';
import { renderDag } from 'app/utils/renderUtils';
import {
	validerUtsettelseskjema,
	getTilTidsromSluttdato,
	getAntallFeriedager,
	getUgyldigeTidsrom,
	getDefaultState
} from 'app/components/utsettelseSkjema/utils';

import './utsettelseSkjema.less';
import {
	Valideringsfeil,
	Skjemaelement
} from 'app/components/utsettelseSkjema/types';

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

export type Props = OwnProps & InjectedIntlProps;

export interface State {
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
		this.hentSkjemadata = this.hentSkjemadata.bind(this);
		this.setStartdato = this.setStartdato.bind(this);
		this.setSluttdato = this.setSluttdato.bind(this);
		this.getSkjemaelementFeil = this.getSkjemaelementFeil.bind(this);
		this.validerSkjema = this.validerSkjema.bind(this);
		this.revaliderSkjema = this.revaliderSkjema.bind(this);
		this.state = {
			...getDefaultState(this.props.utsettelse)
		};
	}

	getSkjemaelementFeil(skjemaelement: Skjemaelement): Feil | undefined {
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
		const valideringsfeil = validerUtsettelseskjema(this.state, this.props);
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

	render() {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		const {
			utsettelse,
			navnForelder1,
			navnForelder2,
			tidsrom,
			permisjonsregler,
			termindato,
			registrerteUtsettelser,
			intl
		} = this.props;

		const tilTidsromStartdato = startdato ? startdato : tidsrom.startdato;
		const tilTidsrom: Tidsperiode = {
			startdato: tilTidsromStartdato,
			sluttdato: getTilTidsromSluttdato(
				termindato,
				permisjonsregler,
				tilTidsromStartdato,
				registrerteUtsettelser
			)
		};

		const ugyldigeTidsrom = getUgyldigeTidsrom(
			registrerteUtsettelser,
			utsettelse
		);

		const antallFeriedager =
			this.state.arsak === UtsettelseArsakType.Ferie
				? getAntallFeriedager(
						arsak,
						forelder,
						startdato,
						sluttdato,
						registrerteUtsettelser,
						utsettelse
				  )
				: 0;

		const visFerieinfo = forelder && arsak === 'ferie';

		const startdatoFeil = this.getSkjemaelementFeil('startdato');
		const sluttdatoFeil = this.getSkjemaelementFeil('sluttdato');

		const visStartdatofeil =
			!this.skalValidere &&
			startdatoFeil &&
			(this.state.visValideringsfeil || this.state.startdato !== undefined);
		const visSluttdatofeil =
			!this.skalValidere &&
			sluttdatoFeil &&
			(this.state.visValideringsfeil || this.state.sluttdato !== undefined);
		const tidsperiodeFeil =
			!visStartdatofeil && !visSluttdatofeil
				? this.getSkjemaelementFeil('tidsperiode')
				: undefined;
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
						feil={this.getSkjemaelementFeil('forelder')}
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
							feil={this.getSkjemaelementFeil('arsak')}
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
						<SkjemaGruppe
							feil={tidsperiodeFeil}
							className={classnames('tidsperiodeSkjemagruppe', {
								'tidsperiodeSkjemagruppe--harFeil':
									tidsperiodeFeil !== undefined
							})}>
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
											renderDay={renderDag}
											disabledRanges={ugyldigeTidsrom}
											disableWeekends={true}
											fullscreen={true}
										/>
									</div>
								</Column>
							</Row>
						</SkjemaGruppe>
						{visFerieinfo && (
							<Ferieinfo
								feriedager={antallFeriedager}
								permisjonsregler={permisjonsregler}
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
