import * as React from 'react';

export type DialogBoxType = 'info' | 'warning' | 'alert' | 'success';

export interface DialogBoxProps {
	/** Default info. Styrer bakgrunnsfarge og bilde */
	type: DialogBoxType;
	/** Inhold i dialogen */
	children: React.ReactNode | string;
	/** Default false. Lar dialogboksen går utover egen bredde med 1rem venstre og høyre */
	overflow?: boolean;
}

declare class DialogBox extends React.Component<DialogBoxProps> {}

export default DialogBox;
