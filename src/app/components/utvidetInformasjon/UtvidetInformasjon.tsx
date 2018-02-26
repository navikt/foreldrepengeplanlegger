import * as React from 'react';
import * as classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Collapse } from 'react-collapse';
import { guid } from 'nav-frontend-js-utils';
import InfoToggler from 'app/components/utvidetInformasjon/InfoToggler';

import './utvidetInformasjon.less';
import { intlString } from 'app/intl/IntlTekst';

interface OwnProps {
	children: React.ReactNode;
	apneLabel?: string;
	lukkLabel?: string;
}

interface State {
	apen: boolean;
}

type Props = OwnProps & InjectedIntlProps;

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

		const {
			apneLabel = intlString(this.props.intl, 'utvidetinfo.lesmer'),
			lukkLabel = intlString(this.props.intl, 'utvidetinfo.lukk')
		} = this.props;
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

export default injectIntl(UtvidetInformasjon);
