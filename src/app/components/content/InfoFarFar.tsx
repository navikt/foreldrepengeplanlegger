import * as React from 'react';
import Block from 'common/components/block/Block';
import { Undertittel, Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

interface Props {}

const InfoFarFar: React.StatelessComponent<Props> = (props) => (
    <>
        <Block margin="s">
            <Undertittel>
                <FormattedMessage id="farogfar.tittel" />
            </Undertittel>
        </Block>
        <p>
            <FormattedMessage id="farogfar.tekst" />
        </p>
        <Element>
            <FormattedMessage id="farogfar.surrogati.tittel" />
        </Element>
        <p>
            <FormattedMessage id="farogfar.surrogati.tekst" />
        </p>
        <Element>
            <FormattedMessage id="farogfar.adoptivforeldre.tittel" />
        </Element>
        <p>
            <FormattedMessage id="farogfar.adoptivforeldre.tekst" />
        </p>
    </>
);

export default InfoFarFar;
