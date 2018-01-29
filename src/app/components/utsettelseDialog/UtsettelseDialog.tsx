import * as React from 'react';
import Modal from 'nav-frontend-modal';

import UtsettelseSkjema from './UtsettelseSkjema';
import { Utsettelse } from 'app/types';

interface Props {
	isOpen: boolean;
	utsettelse?: {};
	forelder1?: string;
	forelder2?: string;
	onClose: () => void;
	onOpen: () => void;
	onChange: (utsettelse: Utsettelse) => void;
}

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<button onClick={() => props.onOpen()}>Legg til utsettelse</button>
		<Modal
			isOpen={props.isOpen}
			contentLabel="Utsettelse"
			onRequestClose={() => props.onClose()}
			className="utsettelseSkjemaDialog"
			children={
				props.isOpen && (
					<UtsettelseSkjema
						utsettelse={props.utsettelse}
						forelder1={props.forelder1}
						forelder2={props.forelder2}
						onChange={(utsettelse) => props.onChange(utsettelse)}
					/>
				)
			}
		/>
	</div>
);

export default UtsettelseDialog;
