import * as React from 'react';

export interface Range {
	from: Date;
	to: Date;
}

export interface DateInputProps {
	id: string;
	label: React.ReactNode;
	selectedDate?: Date;
	inputProps?: React.HTMLProps<HTMLInputElement>;
	disabled?: boolean;
	fromDate?: Date;
	toDate?: Date;
	errorMessage?: React.ReactNode;
	disabledRanges?: Range[];
	disableWeekends?: boolean;
	fullscreen?: boolean;
	onChange: (date: string) => void;
}

declare class DateInput extends React.Component<DateInputProps> {}

export default DateInput;
