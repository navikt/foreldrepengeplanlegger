import * as React from 'react';
import Modal from 'nav-frontend-modal';

import UtsettelseSkjema from './UtsettelseSkjema';

interface Props {
	isOpen: boolean;
	utsettelse?: {};
	onClose: () => void;
	onOpen: () => void;
}

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => (
	<div>
		<button onClick={() => props.onOpen()}>Vis dialog</button>
		<Modal
			isOpen={props.isOpen}
			contentLabel="Utsettelse"
			onRequestClose={() => props.onClose()}
			className="utsettelseSkjemaDialog"
			children={props.isOpen && <UtsettelseSkjema />}
		/>
	</div>
);

export default UtsettelseDialog;
