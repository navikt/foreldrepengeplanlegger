import * as React from 'react';
import * as classnames from 'classnames';
import { Collapse } from 'react-collapse';

import ToggleLenke from 'app/components/toggleLenke/ToggleLenke';

interface Props {
	children: React.ReactNode;
	apneLabel?: string;
	lukkLabel?: string;
}

interface State {
	apen: boolean;
}

class UtvidetInformasjon extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			apen: false
		};
	}
	render() {
		const cls = classnames('utvidetInformasjon', {
			'utvidetInformasjon--apen': this.state.apen
		});
		const { apneLabel = 'Les mer', lukkLabel = 'Lukk' } = this.props;
		return (
			<div className={cls}>
				<Collapse isOpened={this.state.apen}>
					{' '}
					<div className="utvidetInformasjon__innholdContainer">
						<div className="utvidetInformasjon__innhold">
							{this.props.children}
						</div>
						<ToggleLenke
							onToggle={() => this.setState({ apen: false })}
							apen={true}>
							{lukkLabel}
						</ToggleLenke>
					</div>
				</Collapse>
				{!this.state.apen && (
					<ToggleLenke
						onToggle={() => this.setState({ apen: true })}
						apen={false}>
						{apneLabel}
					</ToggleLenke>
				)}
			</div>
		);
	}
}

export default UtvidetInformasjon;
