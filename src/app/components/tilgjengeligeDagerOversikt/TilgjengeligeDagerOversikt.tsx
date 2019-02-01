import * as React from 'react';
import { TilgjengeligeDager, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import { Dekningsgrad } from 'common/types';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './tilgjengeligeDagerOversikt.less';
import { Systemtittel, Ingress, Undertittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import UtvidetInformasjon from 'common/components/utvidetInformasjon/UtvidetInformasjon';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    dekningsgrad: Dekningsgrad;
    omForeldre: OmForeldre;
    visKontoliste?: boolean;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('tilgjengeligeDagerOversikt');

const ListeElement: React.StatelessComponent<{ tittel: string; verdi: React.ReactNode }> = ({ tittel, verdi }) => (
    <div className={bem.element('listeElement')} key={tittel}>
        <div className={bem.element('tittel')}>{tittel}</div>
        <div className={bem.element('dager')}>{verdi}</div>
    </div>
);

const Kontoliste: React.StatelessComponent<Props> = ({ tilgjengeligeDager, intl }: Props) => {
    return (
        <Block margin="xs">
            <Block margin="xs">
                <Undertittel tag="div">Slik er dagene fordelt:</Undertittel>
            </Block>
            {tilgjengeligeDager.stønadskontoer.map((konto) => (
                <ListeElement
                    key={konto.stønadskontoType}
                    verdi={getVarighetString(konto.dager, intl)}
                    tittel={intl.formatMessage({ id: `stønadskontotype.${konto.stønadskontoType}` })}
                />
            ))}
        </Block>
    );
};

const Fordelingsliste: React.StatelessComponent<Props> = ({ tilgjengeligeDager, omForeldre, intl }: Props) => {
    const { dagerFelles, dagerForbeholdtFar, dagerForbeholdtMor } = tilgjengeligeDager;
    if (omForeldre.forelder2 === undefined) {
        return null;
    }
    return (
        <Ingress tag="p">
            {omForeldre.forelder1.navn} må ta ut <strong>{getVarighetString(dagerForbeholdtFar, intl)}</strong> og{' '}
            {omForeldre.forelder2.navn} må ta ut <strong>{getVarighetString(dagerForbeholdtMor, intl)}</strong>. Dere
            har <strong>{getVarighetString(dagerFelles, intl)}</strong> som dere kan fordele som dere ønsker.
        </Ingress>
    );
};

const TilgjengeligeDagerOversikt: React.StatelessComponent<Props> = (props: Props) => {
    const { tilgjengeligeDager, intl, omForeldre } = props;
    return (
        <section className={bem.block}>
            <Block visible={false}>
                <Block margin="xxs">
                    <Systemtittel tag="h1">
                        {omForeldre.antallForeldre === 2 ? 'Dere' : 'Du '} har rett på{' '}
                        {getVarighetString(tilgjengeligeDager.dagerTotalt, intl)} med foreldrepenger
                    </Systemtittel>
                </Block>
                <Block margin="xs" visible={omForeldre.antallForeldre === 2}>
                    <Fordelingsliste {...props} />
                </Block>
            </Block>
            <UtvidetInformasjon erApen={false} apneLabel="Se detaljert fordeling" lukkLabel="Lukk informasjon">
                <Kontoliste {...props} />
            </UtvidetInformasjon>
        </section>
    );
};

export default injectIntl(TilgjengeligeDagerOversikt);
