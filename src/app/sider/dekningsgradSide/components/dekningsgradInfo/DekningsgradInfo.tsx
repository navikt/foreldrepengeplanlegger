import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import BEMHelper from 'common/util/bem';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { TilgjengeligeDager, OmForeldre, Forelder } from '../../../../types';
import TilgjengeligeDagerGraf from '../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import PengerIkon from 'common/components/ikoner/PengerIkon';
import Situasjonsinfo from '../situasjonInfo/SituasjonInfo';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { ForeldreparSituasjon } from 'shared/types';

import './dekningsgradInfo.less';

interface Props {
    situasjon: ForeldreparSituasjon;
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
    flerbarnsdager: number;
}

const DekningsgradInfo: React.StatelessComponent<Props & InjectedIntlProps> = ({
    omForeldre,
    tilgjengeligeDager,
    dekningsgrad,
    situasjon,
    flerbarnsdager,
    intl
}) => {
    const bem = BEMHelper('dekningsgradInfo');
    const sum = dekningsgrad === '100' ? '22 000' : '17 600';
    const rolle = omForeldre.erDeltOmsorg ? undefined : omForeldre.bareMor ? Forelder.mor : Forelder.farMedmor;
    return (
        <div className={bem.block}>
            <Block margin="xs">
                <Undertittel tag="h3">
                    <FormattedMessage
                        id="dekningsgradInfo.tittel"
                        values={{ uker: tilgjengeligeDager.dagerTotalt / 5, dekningsgrad }}
                    />
                </Undertittel>
            </Block>
            <Block margin="s">
                <Situasjonsinfo situasjon={situasjon} forelder={rolle} flerbarnsdager={flerbarnsdager} />
            </Block>
            <Block margin="m">
                <TilgjengeligeDagerGraf omForeldre={omForeldre} tilgjengeligeDager={tilgjengeligeDager} />
                {tilgjengeligeDager.dagerForeldrepengerFørFødsel > 0 && (
                    <Block marginTop="xs">
                        <FormattedMessage
                            id="dekningsgradInfo.uttakFørTermin"
                            values={{ navn: omForeldre.erDeltOmsorg ? omForeldre.mor.navn : getMessage(intl, 'Du') }}
                        />
                    </Block>
                )}
            </Block>
            <Block margin="none">
                <Block margin="xs">
                    <Undertittel>
                        <FormattedMessage id="dekningsgradInfo.eksempel.tittel" />
                    </Undertittel>
                </Block>
                <p>
                    <FormattedMessage id="dekningsgradInfo.eksempel.beskrivelse" />
                </p>
                <div className={bem.element('utbetaling')}>
                    <div className={bem.child('utbetaling').element('ikon')}>
                        <PengerIkon />
                    </div>
                    <Ingress tag="p" className={bem.child('utbetaling').element('tekst')}>
                        <FormattedMessage id="dekningsgradInfo.eksempel.sum" values={{ sum }} />
                    </Ingress>
                </div>
            </Block>
        </div>
    );
};

export default injectIntl(DekningsgradInfo);
