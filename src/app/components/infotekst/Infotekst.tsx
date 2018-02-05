import * as React from 'react';
import InfoDameIkon from 'app/components/ikoner/InfoDameIkon';
import Modal from 'shared/components/modal/Modal';

export interface Props {
	tittel?: string;
}

export interface State {
	apen: boolean;
}

export class Infotekst extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.apne = this.apne.bind(this);
		this.state = {
			apen: false
		};
	}
	apne() {
		this.setState({ apen: true });
	}
	render() {
		return (
			<div className="infotekst">
				<button type="button" className="infotekst__knapp" onClick={(e) => this.apne()}>
					<span className="infotekst__knapp__ikon">
						<InfoDameIkon />
					</span>
					<span className="infotekst__knapp__label">{this.props.tittel}</span>
				</button>
				<Modal title="ABC" type="success" isOpen={this.state.apen}>
					asdfhd
				</Modal>
			</div>
		);
	}
}

export default Infotekst;
