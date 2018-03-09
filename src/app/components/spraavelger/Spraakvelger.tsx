import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, DispatchProps } from 'app/redux/types';
import { Spraak } from 'app/types';
import { setSpraak } from 'app/redux/actions';
import IntlTekst from 'app/intl/IntlTekst';

import './sprakvelger.less';

export interface Props {
	spraak: Spraak;
}

const stopEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
	evt.stopPropagation();
	evt.preventDefault();
};

const Sprakvelger: React.StatelessComponent<Props & DispatchProps> = ({
	dispatch,
	spraak
}) => (
	<div className="sprakvelger">
		<a
			href="#"
			className="lenke"
			onClick={(e) => {
				stopEvent(e);
				dispatch(setSpraak(spraak === 'nb' ? 'nn' : 'nb'));
			}}>
			<IntlTekst
				id={spraak === 'nb' ? 'byttSprakTilNynorsk' : 'byttSprakTilBokmal'}
			/>
		</a>
	</div>
);

export default connect((state: AppState) => ({ spraak: state.view.spraak }))(
	Sprakvelger
);
