import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';

import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './periodeElement.less';
import { getPeriodeUttaksinfo } from '../../utils/periodeinfo';

interface OwnProps {
    periode: Periode;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, intl }) => {
    const periodeinfo = getPeriodeUttaksinfo(periode);
    return (
        <div className="periodeElement">
            <p>
                {periode.forelder} - {periode.type}
            </p>
            <p>{Tidsperioden(periode.tidsperiode).formaterString(intl)}</p>
            {periodeinfo ? (
                <p>
                    uttaksdager: {periodeinfo.uttaksdager}, helligdager: {periodeinfo.helligdager}, dager brukt:{' '}
                    {periodeinfo.uttaksdagerBrukt}
                </p>
            ) : null}
            <Lukknapp onClick={() => onDelete(periode)}>Slett</Lukknapp>
        </div>
    );
};

export default injectIntl(PeriodeElement);
