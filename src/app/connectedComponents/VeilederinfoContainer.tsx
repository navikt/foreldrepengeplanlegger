import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'react-collapse';
import { AppState } from 'app/redux/types';
import Veilederinfo, {
	VeilederInfoProps
} from 'app/elements/veilederinfo/Veilederinfo';

export interface StateProps {
	isOpen: boolean;
}

export interface OwnProps extends VeilederInfoProps {
	id: string;
}

type Props = StateProps & OwnProps;

const SkjemaVeileder: React.StatelessComponent<Props> = (props) => {
	const { id, ...rest } = props;
	return (
		<Collapse
			isOpened={props.isOpen}
			springConfig={{ stiffness: 250, damping: 30 }}>
			<Veilederinfo {...rest} />
		</Collapse>
	);
};

export default connect((state: AppState, props: OwnProps) => {
	return {
		isOpen: state.view.synligInfo.has(props.id)
	};
})(SkjemaVeileder);
