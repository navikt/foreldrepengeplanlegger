declare module 'nav-frontend-skjema' {
	import * as React from 'react';

	export type InputBredde =
		| 'fullbredde'
		| 'XXLl'
		| 'XL'
		| 'L'
		| 'M'
		| 'S'
		| 'XS'
		| 'XXS';

	type SelectBredde = 'fullbredde' | 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs';

	interface RadioProps extends React.HTMLProps<Radio> {
		label: React.ReactNode | any;
		name: string;
		className?: string;
		id?: string;
		checked?: boolean;
		radioRef?: Function;
		defaultChecked?: boolean;
		value: string;
	}

	export interface Feil {
		tittel?: string;
		feilmelding: string;
	}

	export interface InputProps extends React.HTMLProps<HTMLInputElement> {
		bredde?: InputBredde;
		className?: string;
		inputClassName?: string;
		feil?: Feil;
		id?: string;
		inputRef?: Function;
		label: string;
		name?: string;
	}

	interface CheckboxProps extends React.HTMLProps<Checkbox> {
		label: React.ReactNode | any;
		className?: string;
		id?: string;
		checked?: boolean;
		feil?: Feil;
		checboxRef?: Function;
		defaultChecked?: boolean;
	}

	interface SkjemagruppeProps {
		children: React.ReactNode | React.ReactNode[];
		title?: string;
		className?: string;
		feil?: Feil;
	}

	interface TextareaProps extends React.HTMLProps<Textarea> {
		label: React.ReactNode | any;
		value: string;
		maxLength?: number;
		textareaClass?: string;
		id?: string;
		name?: string;
		feil?: Feil;
		tellerTekst?: (antallTegn: number, maxLength: number) => string;
		textareaRef?: Function;
	}

	interface SelectProps extends React.HTMLProps<Select> {
		label: React.ReactNode | any;
		bredde?: SelectBredde;
		id?: string;
		className?: string;
		feil?: Feil;
		selectRef?: () => React.ReactElement<any>;
	}

	export type RadioPanelChangeEvent = (
		event: React.SyntheticEvent<EventTarget>
	) => void;

	export interface RadioPanelProps extends RadioProps {
		checked: boolean;
		name: string;
		onChange: RadioPanelChangeEvent;
		inputProps?: React.InputHTMLAttributes<HTMLInputElement> | any;
	}

	export interface RadioPanelGruppeProps {
		radios: RadioProps[];
		name: string;
		legend: string;
		onChange: (event: React.SyntheticEvent<EventTarget>, value: string) => void;
		checked?: string;
		feil?: FeilProps;
	}

	export interface FeilProps {
		feilmelding: React.ReactNode | React.ReactChild | React.ReactChildren;
	}

	export class Radio extends React.Component<RadioProps, {}> {}
	export class Checkbox extends React.Component<CheckboxProps, {}> {}
	export class Input extends React.Component<InputProps, {}> {}
	export class SkjemaGruppe extends React.Component<SkjemagruppeProps, {}> {}
	export class Textarea extends React.Component<TextareaProps, {}> {}
	export class Select extends React.Component<SelectProps, {}> {}
	export class RadioPanelGruppe extends React.Component<
		RadioPanelGruppeProps,
		{}
	> {}
	export class RadioPanel extends React.Component<RadioPanelProps, {}> {}
}
