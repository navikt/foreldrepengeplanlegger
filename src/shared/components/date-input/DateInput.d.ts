import * as React from 'react';

export interface DateInputChangeEvent {
	value: Date;
}

export interface DateInputProps {
	id: string;
	label: React.ReactNode;
	input: { value?: Date };
	disabled?: boolean;
	fromDate?: Date;
	toDate?: Date;
	errorMessage?: React.ReactNode;
	onChange: (evt: DateInputChangeEvent) => void;
}

declare class DateInput extends React.Component<DateInputProps> {}

export default DateInput;
