import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';

import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './periodeElement.less';

interface OwnProps {
    periode: Periode;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, intl }) => {
    return (
        <div className="periodeElement">
            <p>{periode.type}</p>
            {Tidsperioden(periode.tidsperiode).formaterString(intl)}
            <Lukknapp onClick={() => onDelete(periode)}>Slett</Lukknapp>
        </div>
    );
};

export default injectIntl(PeriodeElement);
