import * as React from 'react';
import { FormEvent } from 'react';
import { UtsettelseArsakType, Utsettelse, Forelder } from 'app/types';
import DateInput from 'shared/components/dateInput/DateInput';
import { Hovedknapp } from 'nav-frontend-knapper';
import Radioliste from 'shared/components/radioliste/Radioliste';

interface Props {
	utsettelse?: Utsettelse;
	forelder1?: string;
	forelder2?: string;
	onChange: (utsettelse: Utsettelse) => void;
}

interface State {
	arsak?: UtsettelseArsakType;
	startdato?: Date;
	sluttdato?: Date;
	forelder?: Forelder;
}

const preventDefaultEvent = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();
};

class UtsettelseSkjema extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.hentSkjemadata = this.hentSkjemadata.bind(this);
		this.erSkjemaGyldig = this.erSkjemaGyldig.bind(this);
		this.state = {
			startdato: undefined,
			sluttdato: undefined,
			arsak: undefined,
			forelder: undefined
		};
	}

	hentSkjemadata(): Utsettelse {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		if (!startdato || !sluttdato || !arsak || !forelder) {
			return {};
		}
		return {
			arsak,
			tidsperiode: {
				startdato,
				sluttdato
			},
			forelder
		};
	}

	erSkjemaGyldig(): boolean {
		return (
			this.state.arsak !== undefined &&
			this.state.sluttdato !== undefined &&
			this.state.startdato !== undefined &&
			this.state.forelder !== undefined
		);
	}

	handleSubmitClick() {
		if (this.erSkjemaGyldig()) {
			this.props.onChange(this.hentSkjemadata());
		}
	}

	render() {
		const { arsak, startdato, sluttdato, forelder } = this.state;
		const { forelder1, forelder2 } = this.props;
		return (
			<form onSubmit={preventDefaultEvent} className="utsettelseSkjema">
				<h1 className="typo-undertittel m-textCenter blokk-s">Legg til utsettelse</h1>
				<div className="blokk-s">
					<Radioliste
						tittel="Velg type"
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
					<DateInput
						label="Startdato"
						id="startdato"
						onChange={(date) => this.setState({ startdato: new Date(date) })}
						selectedDate={startdato}
					/>
				</div>
				<div className="blokk-s">
					<DateInput
						label="Sluttdato"
						id="sluttdato"
						onChange={(date) => this.setState({ sluttdato: new Date(date) })}
						selectedDate={sluttdato}
					/>
				</div>
				<div className="blokk-l">
					<Radioliste
						tittel="Hvem gjelder det?"
						inputnavn="forelder"
						valg={[
							{ tittel: forelder1 || 'Forelder 1', verdi: 'forelder1' },
							{ tittel: forelder2 || 'Forelder 2', verdi: 'forelder2' }
						]}
						valgtVerdi={forelder}
						onChange={(value) => this.setState({ forelder: value as Forelder })}
					/>
				</div>

				<Hovedknapp onClick={() => this.handleSubmitClick()} className="m-fullBredde">
					Legg til
				</Hovedknapp>
			</form>
		);
	}
}

export default UtsettelseSkjema;
