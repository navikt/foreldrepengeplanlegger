import * as React from 'react';
import { TilgjengeligeDager, OmForeldre } from '../../types';
import BEMHelper from 'common/utils/bem';
import { Dekningsgrad } from 'common/types';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';

import './tilgjengeligeDagerOversikt.less';
import { Systemtittel, Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import UtvidetInformasjon from 'common/components/utvidetInformasjon/UtvidetInformasjon';
import HighlightContent from 'common/components/highlightContent/HighlightContent';

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

interface FordelingslisteProps {
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
    intl: InjectedIntl;
}

const Fordelingsliste: React.StatelessComponent<FordelingslisteProps> = ({ tilgjengeligeDager, omForeldre, intl }) => {
    const { dagerFelles, dagerFar, dagerMor, flerbarnsdager } = tilgjengeligeDager;
    if (omForeldre.mor === undefined) {
        return null;
    }
    return (
        <Normaltekst tag="p">
            {omForeldre.mor.navn} må ta ut <strong>{getVarighetString(dagerMor, intl)}</strong> og{' '}
            {omForeldre.farMedmor!.navn} må ta ut <strong>{getVarighetString(dagerFar, intl)}</strong>. Dere har{' '}
            <HighlightContent watchValue={dagerFelles}>
                <strong>{getVarighetString(dagerFelles, intl)}</strong>
            </HighlightContent>{' '}
            fellesperiode som dere kan fordele som dere ønsker.
            {flerbarnsdager > 0 && (
                <span> Av fellesperioden er {getVarighetString(flerbarnsdager, intl)} flerbarnsdager.</span>
            )}
        </Normaltekst>
    );
};

const TilgjengeligeDagerOversikt: React.StatelessComponent<Props> = (props: Props) => {
    const { tilgjengeligeDager, intl, omForeldre } = props;
    return (
        <section className={bem.block}>
            <Block margin="none">
                <Block margin="xxs">
                    <Systemtittel tag="h1">
                        {omForeldre.erDeltOmsorg ? 'Dere' : 'Du '} har rett på{' '}
                        {getVarighetString(tilgjengeligeDager.dagerEtterTermin, intl)} med foreldrepenger
                    </Systemtittel>
                </Block>
                <Block margin="xs" visible={omForeldre.erDeltOmsorg}>
                    <Fordelingsliste tilgjengeligeDager={tilgjengeligeDager} intl={intl} omForeldre={omForeldre} />
                </Block>
            </Block>
            <Block visible={false}>
                <UtvidetInformasjon erApen={false} apneLabel="Se detaljert fordeling" lukkLabel="Lukk informasjon">
                    <Kontoliste {...props} />
                </UtvidetInformasjon>
            </Block>
        </section>
    );
};

export default injectIntl(TilgjengeligeDagerOversikt);
