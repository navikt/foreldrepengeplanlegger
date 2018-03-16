import * as React from 'react';
import { Tidsperiode } from 'app/types';
import TidsperiodeTekst from 'app/components/tidslinje/elementer/TidsperiodeTekst';
import RedigerInnslagKnapp from 'app/components/tidslinje/elementer/RedigerInnslagKnapp';
import Varighet from 'app/components/tidslinje/elementer/Varighet';
import { getAntallUttaksdagerITidsperiode } from 'app/utils/uttaksdagerUtils';
import { InnslagEkstrainfo } from 'app/components/tidslinje/types';
import UtvidetInformasjon from 'app/elements/utvidetInformasjon/UtvidetInformasjon';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { intlString } from 'app/intl/IntlTekst';

export interface Props {
	children: React.ReactNode;
	tidsperiode?: Tidsperiode;
	ekstrainfo?: InnslagEkstrainfo;
	trekkFraFeriedager?: boolean;
	onRediger?: () => void;
}

const InnslagLayout: React.StatelessComponent<Props & InjectedIntlProps> = ({
	tidsperiode,
	ekstrainfo,
	onRediger,
	intl,
	trekkFraFeriedager,
	children
}) => (
	<div className="innslagLayout">
		<div className="periodeinnslag__topp">
			<div className="periodeinnslag__topp__venstre">{children}</div>
			<div className="periodeinnslag__topp__hoyre">
				{tidsperiode && (
					<span className="tidslinje__varighet">
						<Varighet
							dager={getAntallUttaksdagerITidsperiode(
								tidsperiode,
								trekkFraFeriedager
							)}
						/>
					</span>
				)}
				{onRediger && (
					<div className="periodeinnslag__rediger">
						<RedigerInnslagKnapp onClick={() => onRediger()} />
					</div>
				)}
			</div>
		</div>
		{tidsperiode && (
			<div className="periodeinnslag__dato">
				<TidsperiodeTekst
					tidsperiode={tidsperiode}
					visSluttdato={true}
					visVarighet={true}
				/>
			</div>
		)}
		{ekstrainfo && (
			<div className="periodeinnslag__ekstrainfo">
				<UtvidetInformasjon
					apneLabel={intlString(intl, 'tidslinje.visdetaljer')}
					lukkLabel={intlString(intl, 'tidslinje.skjuldetaljer')}>
					<div className="blokkPad-xxs">{ekstrainfo.tekst}</div>
				</UtvidetInformasjon>
			</div>
		)}
	</div>
);

export default injectIntl(InnslagLayout);
