import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-collapse';
import { AppState } from 'app/redux/types';
import Veilederinfo, {
	VeilederInfoProps
} from 'app/elements/veilederinfo/Veilederinfo';
import { Infotekster } from 'app/redux/reducers/viewReducer';

export interface StateProps {
	isOpen: boolean;
}

export interface OwnProps extends VeilederInfoProps {
	id: Infotekster;
	apen?: boolean;
}

type Props = StateProps & OwnProps;

const SkjemaVeileder: React.StatelessComponent<Props> = ({
	id,
	isOpen,
	apen = false,
	...rest
}) => {
	const erApen: boolean = isOpen || apen;
	const content = erApen ? (
		<div className="blokkPad-s">
			<Veilederinfo {...rest} />
		</div>
	) : (
		<div />
	);
	return (
		<Collapse isOpened={erApen} springConfig={{ stiffness: 250, damping: 30 }}>
			{content}
		</Collapse>
	);
};

export default connect((state: AppState, props: OwnProps) => {
	return {
		isOpen: state.view.synligInfo.has(props.id)
	};
})(SkjemaVeileder);
