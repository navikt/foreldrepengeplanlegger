import * as React from 'react';
import { TilgjengeligeDager } from '../../types';
import BEMHelper from 'common/utils/bem';
import { Dekningsgrad } from 'common/types';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './tilgjengeligeDagerOversikt.less';
import { Systemtittel, Ingress } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';

interface OwnProps {
    tilgjengeligeDager: TilgjengeligeDager;
    dekningsgrad: Dekningsgrad;
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
        <>
            {tilgjengeligeDager.stønadskontoer.map((konto) => (
                <ListeElement
                    verdi={getVarighetString(konto.dager, intl)}
                    tittel={intl.formatMessage({ id: `stønadskontotype.${konto.stønadskontoType}` })}
                />
            ))}
        </>
    );
};

const Fordelingsliste: React.StatelessComponent<Props> = ({ tilgjengeligeDager, intl }: Props) => {
    const { dagerFelles, dagerForbeholdtFar, dagerForbeholdtMor } = tilgjengeligeDager;
    return (
        <Ingress tag="p">
            Far må ta ut <strong>{getVarighetString(dagerForbeholdtFar, intl)}</strong> og mor må ta ut{' '}
            <strong>{getVarighetString(dagerForbeholdtMor, intl)}</strong>. Dere har{' '}
            <strong>{getVarighetString(dagerFelles, intl)}</strong> som dere kan fordele som dere ønsker.
        </Ingress>
    );
};

const TilgjengeligeDagerOversikt: React.StatelessComponent<Props> = (props: Props) => {
    const { tilgjengeligeDager, visKontoliste, intl } = props;
    return (
        <section className={bem.block}>
            <Block margin="xxs">
                <Systemtittel tag="h1">
                    Dere har rett på {getVarighetString(tilgjengeligeDager.dagerTotalt, intl)} med foreldrepenger
                </Systemtittel>
            </Block>
            <Block margin="xs">
                <Fordelingsliste {...props} />
            </Block>
            {visKontoliste && <Kontoliste {...props} />}
        </section>
    );
};

export default injectIntl(TilgjengeligeDagerOversikt);
