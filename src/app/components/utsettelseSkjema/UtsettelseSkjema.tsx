import * as React from 'react';
import { FormEvent } from 'react';
import { UtsettelseArsakType, Utsettelsesperiode, Forelder, Periodetype } from 'app/types';
import DateInput from 'shared/components/dateInput/DateInput';
import { Hovedknapp } from 'nav-frontend-knapper';
import Radioliste from 'shared/components/radioliste/Radioliste';
import { Row, Column } from 'nav-frontend-grid';

interface Props {
	utsettelse?: Utsettelsesperiode;
	forelder1?: string;
	forelder2?: string;
	onChange: (utsettelse: Utsettelsesperiode) => void;
}

interface State {
	arsak?: UtsettelseArsakType;
	forelder?: Forelder;
	startdato?: Date;
	sluttdato?: Date;
}

const preventDefaultEvent = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();
};

class UtsettelseSkjema extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		const { utsettelse } = props;
		this.hentGyldigSkjemadata = this.hentGyldigSkjemadata.bind(this);
		const state: State = utsettelse
			? {
					arsak: utsettelse.arsak,
					forelder: utsettelse.forelder,
					startdato: utsettelse.tidsperiode ? utsettelse.tidsperiode.startdato : undefined,
					sluttdato: utsettelse.tidsperiode ? utsettelse.tidsperiode.sluttdato : undefined
				}
			: {};

		this.state = {
			...state
		};
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

	handleSubmitClick() {
		const skjemadata = this.hentGyldigSkjemadata();
		if (skjemadata) {
			this.props.onChange(skjemadata);
		}
	}

	render() {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		const { utsettelse, forelder1, forelder2 } = this.props;
		return (
			<form onSubmit={preventDefaultEvent} className="utsettelseSkjema">
				<h1 className="typo-undertittel m-textCenter blokk-s">Legg til utsettelse</h1>
				<div className="blokk-s">
					<Radioliste
						tittel="Velg type"
						stil="ekstern"
						kolonner="2"
						valg={[
							{
								tittel: 'Ferie',
								verdi: UtsettelseArsakType.Ferie
							},
							{
								tittel: 'Ubetalt permisjon',
								verdi: UtsettelseArsakType.UbetaltPermisjon
							},
							{
								tittel: 'Arbeid',
								verdi: UtsettelseArsakType.Arbeid
							}
						]}
						inputnavn="utsettelse"
						valgtVerdi={arsak}
						onChange={(value) => this.setState({ arsak: value as UtsettelseArsakType })}
					/>
				</div>
				<div className="blokk-s">
					<Row>
						<Column xs="12" sm="6">
							<DateInput
								label="Startdato"
								id="startdato"
								onChange={(date) => this.setState({ startdato: new Date(date) })}
								selectedDate={startdato}
							/>
						</Column>
						<Column xs="12" sm="6">
							<DateInput
								label="Sluttdato"
								id="sluttdato"
								onChange={(date) => this.setState({ sluttdato: new Date(date) })}
								selectedDate={sluttdato}
							/>
						</Column>
					</Row>
				</div>
				<div className="blokk-l">
					<Radioliste
						kolonner="2"
						tittel="Hvem gjelder det?"
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

				<Hovedknapp onClick={() => this.handleSubmitClick()} className="m-fullBredde">
					{utsettelse ? 'Oppdater' : 'Legg til'}
				</Hovedknapp>
			</form>
		);
	}
}

export default UtsettelseSkjema;
