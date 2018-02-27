import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Modal from 'nav-frontend-modal';

import { DispatchProps } from 'app/redux/types';
import {
	utsettelseLukkDialog,
	opprettEllerOppdaterUtsettelse,
	slettUtsettelse
} from 'app/redux/actions';
import { Utsettelsesperiode, Tidsperiode, Permisjonsregler } from 'app/types';
import UtsettelseSkjema from 'app/components/utsettelseSkjema/UtsettelseSkjema';
import { intlString } from 'app/intl/IntlTekst';

interface OwnProps {
	isOpen: boolean;
	utsettelser: Utsettelsesperiode[];
	tidsrom: Tidsperiode;
	permisjonsregler: Permisjonsregler;
	utsettelse?: Utsettelsesperiode;
	navnForelder1: string;
	navnForelder2: string;
}

type Props = OwnProps & DispatchProps & InjectedIntlProps;

const UtsettelseDialog: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<Modal
			isOpen={props.isOpen}
			contentLabel={intlString(props.intl, 'utsettelseskjema.tittel')}
			onRequestClose={() => props.dispatch(utsettelseLukkDialog())}
			className="utsettelseSkjemaDialog"
			children={
				props.isOpen && (
					<UtsettelseSkjema
						registrerteUtsettelser={props.utsettelser}
						utsettelse={props.utsettelse}
						navnForelder1={props.navnForelder1}
						navnForelder2={props.navnForelder2}
						permisjonsregler={props.permisjonsregler}
						tidsrom={props.tidsrom}
						onChange={(utsettelse) =>
							props.dispatch(opprettEllerOppdaterUtsettelse(utsettelse))
						}
						onFjern={(utsettelse) =>
							props.dispatch(slettUtsettelse(utsettelse))
						}
					/>
				)
			}
		/>
	);
};

export default connect()(injectIntl(UtsettelseDialog));
