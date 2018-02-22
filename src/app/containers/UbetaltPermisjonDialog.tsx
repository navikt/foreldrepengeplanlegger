import * as React from 'react';
import { connect } from 'react-redux';

import Modal from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';

import { DispatchProps, AppState } from 'app/redux/types';
import { ubetaltPermisjonLukkDialog } from 'app/redux/actions';
import EksterneLenker from 'app/eksterneLenker';

interface StateProps {
	isOpen: boolean;
}

type Props = StateProps & DispatchProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<Modal
			isOpen={props.isOpen}
			contentLabel="Ulønnet permisjon"
			onRequestClose={() => props.dispatch(ubetaltPermisjonLukkDialog())}
			className="ubetaltPermisjonDialog"
			children={
				<div className="dialogContent">
					<h1 className="typo-undertittel m-textCenter blokk-s">
						Ulønnet permisjon
					</h1>
					<p>
						Du må avtale ulønnet permisjon med din arbeidsgiver. Ulønnet
						permisjon i mer enn 14 dager kan påvirke din rett til blant annet
						sykepenger og pleiepenger. Les mer på{' '}
						<Lenke
							href={EksterneLenker.nav_ubetaltPermisjon}
							ariaLabel="Les mer om ulønnet permisjon på nav.no"
							target="_blank">
							nav.no
						</Lenke>
					</p>
					<p>
						Ønsker dere å ha opphold i foreldrepengene med ulønnet permisjon må
						den andre forelderen søke om utsettelse.
					</p>
				</div>
			}
		/>
	);
};

const mapStateToProps = (state: AppState): StateProps => {
	return {
		isOpen: state.view.ubetaltInformasjonDialogSynlig
	};
};

export default connect(mapStateToProps)(UtsettelseDialog);
