import * as React from 'react';
import * as classnames from 'classnames';

import { Radio, SkjemaGruppe, RadioProps, Feil } from 'nav-frontend-skjema';

type RadiolisteValgVerdi = string | number | undefined;

type RadiolisteChangeEvent = (verdi: RadiolisteValgVerdi) => void;

type RadiobuttonStil = 'intern' | 'ekstern';

export interface RadiolisteValg {
	tittel: string;
	verdi: string;
	radioProps?: RadioProps;
}

export interface Props {
	valg: RadiolisteValg[];
	inputnavn: string;
	tittel: string;
	valgtVerdi?: RadiolisteValgVerdi;
	onChange: RadiolisteChangeEvent;
	feil?: Feil;
	stil?: RadiobuttonStil;
	kolonner?: '1' | '2';
}

interface RadiolisteRadioProps extends RadiolisteValg {
	/** Navn på inputelementene i listen */
	navn: string;
	/** Om radio er valgt */
	valgt: boolean;
	/** Kall når en radio velges */
	onChange: () => void;
}

const RadiolisteRadio: React.StatelessComponent<RadiolisteRadioProps> = ({
	navn,
	tittel,
	verdi,
	valgt,
	onChange,
	radioProps
}) => <Radio {...radioProps} name={navn} value={verdi} label={tittel} checked={valgt} onChange={onChange} />;

const Radioliste: React.StatelessComponent<Props> = ({
	valg,
	valgtVerdi,
	inputnavn,
	feil,
	tittel,
	onChange,
	stil,
	kolonner
}) => {
	const cls = classnames('radioliste', {
		'radioliste--ekstern': stil === 'ekstern',
		'radioliste--toKolonner': kolonner === '2'
	});
	return (
		<SkjemaGruppe className={cls} feil={feil} title={tittel}>
			<div className="radioliste__radioer">
				{valg.map((option) => (
					<div className="radioliste__radio" key={`${inputnavn}${option.verdi}`}>
						<RadiolisteRadio
							{...option}
							navn={inputnavn}
							valgt={valgtVerdi === option.verdi}
							onChange={() => onChange(option.verdi)}
						/>
					</div>
				))}
			</div>
		</SkjemaGruppe>
	);
};

export default Radioliste;
