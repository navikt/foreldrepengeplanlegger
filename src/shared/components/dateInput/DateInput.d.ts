import * as React from 'react';

export interface DateInputProps {
	id: string;
	label: React.ReactNode;
	input: { value?: Date };
	disabled?: boolean;
	fromDate?: Date;
	toDate?: Date;
	errorMessage?: React.ReactNode;
	onChange: (dato: string) => void;
}

declare class DateInput extends React.Component<DateInputProps> {}

export default DateInput;
