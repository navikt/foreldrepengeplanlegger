import * as React from 'react';
import { FormEvent } from 'react';
import TransformingRadioGroup, {
	TransformingRadioGroupStageValue
} from 'shared/components/transformingRadioGroup/TransformingRadioGroup';
import { UtsettelseArsakType, UtsettelsePeriode, Forelder } from 'app/types';
import { SkjemaGruppe, Radio } from 'nav-frontend-skjema';
import DateInput from 'shared/components/dateInput/DateInput';
import { Hovedknapp } from 'nav-frontend-knapper';

interface Props {
	utsettelse?: UtsettelsePeriode;
	forelder1?: string;
	forelder2?: string;
}

interface State {
	utsettelseArsak?: UtsettelseArsakType;
	fraDato?: Date;
	tilDato?: Date;
	forelder?: Forelder;
}

const utsettelser: TransformingRadioGroupStageValue[] = [
	{
		label: 'Ferie',
		value: UtsettelseArsakType.Ferie
	},
	{
		label: 'Ubetalt permisjon',
		value: UtsettelseArsakType.UbetaltPermisjon
	},
	{
		label: 'Arbeid',
		value: UtsettelseArsakType.Arbeid
	}
];

const preventDefaultEvent = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();
};

class UtsettelseSkjema extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			fraDato: undefined,
			tilDato: undefined,
			utsettelseArsak: undefined,
			forelder: undefined
		};
	}

	handleSubmitClick() {
		return false;
	}

	render() {
		const { utsettelseArsak, fraDato, tilDato, forelder } = this.state;
		return (
			<form onSubmit={preventDefaultEvent}>
				<h1>Legg til utsettelse</h1>
				<div className="blokk-l">
					<TransformingRadioGroup
						stage={{
							name: 'utsettelse',
							legend: 'Velg type',
							values: utsettelser,
							selectedValue: utsettelseArsak
						}}
						collapsed={!!utsettelseArsak}
						expanded={!!!utsettelseArsak}
						onClickCollapsed={(value) => this.setState({ utsettelseArsak: undefined })}
						onClickExpanded={(evt, value) => {
							this.setState({ utsettelseArsak: value as UtsettelseArsakType });
						}}
					/>
					<DateInput
						label="Fra"
						id="fraDato"
						onChange={(date) => this.setState({ fraDato: new Date(date) })}
						selectedDate={fraDato}
					/>
					<DateInput
						label="Til"
						id="tilDato"
						onChange={(date) => this.setState({ tilDato: new Date(date) })}
						selectedDate={tilDato}
					/>
					<SkjemaGruppe title="Hvem gjelder det?">
						<Radio
							name="forelder"
							value="forelder1"
							checked={forelder === 'forelder1'}
							onChange={() => this.setState({ forelder: 'forelder1' })}
							label={this.props.forelder1 || 'Forelder 1'}
						/>
						<Radio
							name="forelder"
							value="forelder2"
							checked={forelder === 'forelder2'}
							onChange={() => this.setState({ forelder: 'forelder2' })}
							label={this.props.forelder2 || 'Forelder 2'}
						/>
					</SkjemaGruppe>
				</div>

				<Hovedknapp onClick={() => this.handleSubmitClick()}>Legg til</Hovedknapp>
			</form>
		);
	}
}

export default UtsettelseSkjema;
