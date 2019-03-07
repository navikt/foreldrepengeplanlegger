import * as React from 'react';
import { Dekningsgrad } from 'common/types';

import './dekningsgradInfo.less';
import BEMHelper from 'common/utils/bem';
import { Systemtittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';

interface Props {
    dekningsgrad: Dekningsgrad;
}

const bem = BEMHelper('dekningsgradInfo');

const DekningsgradInfo: React.StatelessComponent<Props> = ({ dekningsgrad }) => (
    <section className={bem.block}>
        <Block margin="xs">
            <Systemtittel tag="h1">49 uker med 100 prosent foreldrepenger</Systemtittel>
        </Block>
        <p>
            Når begge foreldrene har rett til foreldrepenger består foreldrepengeperioden av mødrekvoten, fedrekvoten og
            en fellesperiode som dere kan dele.
        </p>
    </section>
);

export default DekningsgradInfo;
