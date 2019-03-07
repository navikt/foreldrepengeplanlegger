import * as React from 'react';
import { Situasjon, Forelder } from '../../types';
import BEMHelper from 'common/utils/bem';
import OppsummeringBlokk from '../oppsummeringBlokk/OppsummeringBlokk';
import AntallBarnSirkel from './antallBarnSirkel/AntallBarnSirkel';

import SituasjonSirkel from './situasjonSirkel/SituasjonSirkel';
import SpebarnSirkel from './spebarnSirkel/SpebarnSirkel';
import { formaterDatoUtenDag } from 'common/utils/datoUtils';

import './situasjonOppsummering.less';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
    situasjon: Situasjon;
    antallBarn: number;
    familiehendelsesdato: Date;
    navnMor: string;
    navnFarMedmor?: string;
    valgtForelder?: Forelder;
    onRequestChange: () => void;
}

const bem = BEMHelper('situasjonOppsummering');

const Situasjonsoppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => (
    <OppsummeringBlokk onRequestChange={props.onRequestChange} tittel="Dere og barnet">
        <div className={bem.block}>
            <div className={bem.element('oppsummering')}>
                <SituasjonSirkel {...props} />
                <div className={bem.element('verdi')}>
                    <span className={bem.element('navn')}>{props.navnMor}</span>
                    {props.navnFarMedmor && <span className={bem.element('navn')}> og {props.navnFarMedmor}</span>}
                </div>
            </div>
            <div className={bem.element('oppsummering')}>
                <AntallBarnSirkel antallBarn={props.antallBarn} />
                <div className={bem.element('verdi')}>
                    {getMessage(props.intl, `antallBarn.alternativ.barn-${props.antallBarn}`)}
                </div>
            </div>
            <div className={bem.element('oppsummering')}>
                <SpebarnSirkel />
                <div className={bem.element('verdi')}>
                    <div>Termin</div>
                    {formaterDatoUtenDag(props.familiehendelsesdato)}
                </div>
            </div>
        </div>
    </OppsummeringBlokk>
);

export default injectIntl(Situasjonsoppsummering);
