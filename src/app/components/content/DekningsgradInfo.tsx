import * as React from 'react';
import { Dekningsgrad } from 'common/types';
import BEMHelper from 'common/utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import { TilgjengeligeDager, OmForeldre } from '../../types';

import './dekningsgradInfo.less';
import TilgjengeligeDagerGraf from '../tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';

interface Props {
    dekningsgrad: Dekningsgrad;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

const DekningsgradInfo: React.StatelessComponent<Props> = ({ omForeldre, tilgjengeligeDager }) => {
    const bem = BEMHelper('dekningsgradInfo');
    return (
        <section className={bem.block}>
            <Block margin="xs">
                <Undertittel tag="h1">49 uker med 100 prosent foreldrepenger</Undertittel>
            </Block>
            <p>
                Når begge foreldrene har rett til foreldrepenger består foreldrepengeperioden av mødrekvoten,
                fedrekvoten og en fellesperiode som dere kan dele.
            </p>

            <TilgjengeligeDagerGraf omForeldre={omForeldre} tilgjengeligeDager={tilgjengeligeDager} />
        </section>
    );
};

export default DekningsgradInfo;
