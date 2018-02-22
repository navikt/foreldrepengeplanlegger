import * as React from 'react';
import { connect } from 'react-redux';

import Modal from 'nav-frontend-modal';
import Lenke from 'nav-frontend-lenker';

import { DispatchProps, AppState } from 'app/redux/types';
import { ulonnetPermisjonLukkDialog } from 'app/redux/actions';
import EksterneLenker from 'app/eksterneLenker';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import IntlTekst, { intlString } from 'app/intl/IntlTekst';

interface StateProps {
	isOpen: boolean;
}

type Props = StateProps & DispatchProps & InjectedIntlProps;

const UlonnetPermisjonDialog: React.StatelessComponent<Props> = (
	props: Props
) => {
	return (
		<Modal
			isOpen={props.isOpen}
			contentLabel="Ulønnet permisjon"
			onRequestClose={() => props.dispatch(ulonnetPermisjonLukkDialog())}
			className="ulonnetPermisjonDialog"
			children={
				<div className="dialogContent">
					<h1 className="typo-undertittel m-textCenter blokk-s">
						<IntlTekst id="dialog.ulonnetpermisjon.tittel" />
					</h1>
					<p>
						<IntlTekst id="dialog.ulonnetpermisjon.innhold1" />

						<Lenke
							href={EksterneLenker.nav_ulonnetPermisjon}
							ariaLabel={intlString(
								props.intl,
								'dialog.ulonnetpermisjon.navlenke.alttekst'
							)}
							target="_blank">
							<IntlTekst id="dialog.ulonnetpermisjon.navlenke.tekst" />
						</Lenke>
					</p>
					<p>
						<IntlTekst id="dialog.ulonnetpermisjon.innhold2" />
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

export default connect(mapStateToProps)(injectIntl(UlonnetPermisjonDialog));
