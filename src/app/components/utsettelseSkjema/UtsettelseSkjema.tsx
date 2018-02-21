import * as React from 'react';
import { FormEvent } from 'react';
import {
	UtsettelseArsakType,
	Utsettelsesperiode,
	Forelder,
	Periodetype,
	Tidsperiode
} from 'app/types';
import DateInput, { Range } from 'shared/components/dateInput/DateInput';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Radioliste from 'shared/components/radioliste/Radioliste';
import { Row, Column } from 'nav-frontend-grid';
import { erGyldigDato } from 'app/utils';
import { isBefore, isSameDay, isAfter } from 'date-fns';

import './utsettelseSkjema.less';
import Veilederinfo from 'app/components/veilederinfo/Veilederinfo';
import { Collapse } from 'react-collapse';

interface Props {
	tidsrom: Tidsperiode;
	utsettelse?: Utsettelsesperiode;
	registrerteUtsettelser?: Utsettelsesperiode[];
	forelder1?: string;
	forelder2?: string;
	onChange: (utsettelse: Utsettelsesperiode) => void;
	onFjern: (utsettelse: Utsettelsesperiode) => void;
}

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

const getHvemTittel = (arsak: UtsettelseArsakType | undefined): string => {
	if (!arsak) {
		return 'Hvem skal ha opphold i permisjonen?';
	}
	return arsak === UtsettelseArsakType.Ferie
		? `Hvem skal ta ut ferie?`
		: 'Hvem skal arbeide?';
};

class UtsettelseSkjema extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const { utsettelse } = props;
		this.hentGyldigSkjemadata = this.hentGyldigSkjemadata.bind(this);
		this.setStartdato = this.setStartdato.bind(this);
		this.setSluttdato = this.setSluttdato.bind(this);
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

	render() {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		const {
			utsettelse,
			forelder1,
			forelder2,
			tidsrom,
			registrerteUtsettelser
		} = this.props;

		const tilTidsrom: Tidsperiode = {
			startdato: startdato ? startdato : tidsrom.startdato,
			sluttdato: tidsrom.sluttdato
		};

		const ugyldigeTidsrom: Range[] | undefined =
			registrerteUtsettelser &&
			registrerteUtsettelser.map((u) => ({
				from: u.tidsperiode.startdato,
				to: u.tidsperiode.sluttdato
			}));

		return (
			<form
				action="#"
				onSubmit={preventDefaultEvent}
				className="utsettelseSkjema dialogContent">
				<h1 className="typo-undertittel m-textCenter blokk-s">
					Opphold i permisjonen
				</h1>
				<div className="blokk-xxs">
					<Radioliste
						tittel="Hva skal du gjøre?"
						stil="ekstern"
						kolonner="2"
						valg={[
							{
								tittel: 'Ta ut ferie',
								verdi: UtsettelseArsakType.Ferie
							},
							{
								tittel: 'Arbeide fulltid',
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
						<Veilederinfo>Informasjon om ferie[todo]</Veilederinfo>
					</div>
				</Collapse>
				<div className="blokk-s">
					<Radioliste
						kolonner="2"
						tittel={getHvemTittel(this.state.arsak)}
						inputnavn="forelder"
						stil="ekstern"
						valg={[
							{ tittel: forelder1 || 'Forelder 1', verdi: 'forelder1' },
							{ tittel: forelder2 || 'Forelder 2', verdi: 'forelder2' }
						]}
						valgtVerdi={forelder}
						onChange={(value) => this.setState({ forelder: value as Forelder })}
					/>
				</div>
				<div className="blokk-m">
					<Row>
						<Column xs="12" sm="6">
							<div className="blokk-s">
								<DateInput
									label="Startdato"
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
									label="Sluttdato"
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

				<Row>
					<Column xs="12" sm={utsettelse ? '6' : '12'}>
						<div className="blokk-xxs">
							<Hovedknapp
								onClick={(evt) => this.handleSubmitClick(evt)}
								className="m-fullBredde">
								{utsettelse ? 'Oppdater' : 'Legg til'}
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
								Fjern
							</Knapp>
						</Column>
					)}
				</Row>
			</form>
		);
	}
}

export default UtsettelseSkjema;
