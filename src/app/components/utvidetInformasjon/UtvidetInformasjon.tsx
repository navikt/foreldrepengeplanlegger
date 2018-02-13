import * as React from 'react';
import * as classnames from 'classnames';
import { Collapse } from 'react-collapse';
import InfoToggler from 'app/components/infoToggler/InfoToggler';
import { guid } from 'nav-frontend-js-utils';

interface Props {
	children: React.ReactNode;
	apneLabel?: string;
	lukkLabel?: string;
}

interface State {
	apen: boolean;
}

class UtvidetInformasjon extends React.Component<Props, State> {
	innholdId: string;

	constructor(props: Props) {
		super(props);
		this.innholdId = guid();
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
				<div className="utvidetInformasjon__toggler">
					<InfoToggler
						onToggle={() => this.setState({ apen: !this.state.apen })}
						apen={this.state.apen}>
						{this.state.apen ? lukkLabel : apneLabel}
					</InfoToggler>
				</div>
				<div className="utvidetInformasjon__innhold" id={this.innholdId}>
					<Collapse
						isOpened={this.state.apen}
						springConfig={{ stiffness: 250, damping: 30 }}>
						{' '}
						{this.props.children}
					</Collapse>
				</div>
			</div>
		);
	}
}

export default UtvidetInformasjon;
