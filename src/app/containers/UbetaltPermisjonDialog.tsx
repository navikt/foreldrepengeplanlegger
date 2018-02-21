import * as React from 'react';
import { connect } from 'react-redux';

import Modal from 'nav-frontend-modal';
import { Element } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { DispatchProps, AppState } from 'app/redux/types';
import { utsettelseLukkDialog, utsettelseVisDialog } from 'app/redux/actions';
import LeggTilKnapp from 'app/elements/leggTilKnapp/LeggTilKnapp';
import Veilederinfo from 'app/components/veilederinfo/Veilederinfo';
import EksterneLenker from 'app/eksterneLenker';

interface StateProps {
	isOpen: boolean;
}

type Props = StateProps & DispatchProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<div>
			<div className="blokk-xs">
				<Element>Ubetalt permisjon</Element>
			</div>
			<LeggTilKnapp onClick={() => props.dispatch(utsettelseVisDialog())} />
			<Modal
				isOpen={props.isOpen}
				contentLabel="Ubetalt permisjon"
				onRequestClose={() => props.dispatch(utsettelseLukkDialog())}
				className="ubetaltPermisjonDialod"
				children={
					<Veilederinfo
						utvidetInfo={
							<p>
								Du må avtale ulønnet permisjon med din arbeidsgiver. Ulønnet
								permisjon i mer enn 14 dager kan påvirke din rett til blant
								annet sykepenger og pleiepenger. Les mer på{' '}
								<Lenke
									href={EksterneLenker.nav_ubetaltPermisjon}
									ariaLabel="Les mer om ulønnet permisjon på nav.no"
									target="_blank">
									nav.no
								</Lenke>
							</p>
						}>
						Ønsker dere å ha opphold i foreldrepengene med ulønnet permisjon må
						den andre forelderen søke om utsettelse.
					</Veilederinfo>
				}
			/>
		</div>
	);
};

const mapStateToProps = (state: AppState): StateProps => {
	return {
		isOpen: state.utsettelse.dialogErApen
	};
};

export default connect(mapStateToProps)(UtsettelseDialog);
