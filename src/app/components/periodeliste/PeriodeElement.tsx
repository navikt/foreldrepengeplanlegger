import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';

import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './periodeElement.less';
import { getPeriodeUttaksinfo } from '../../utils/periodeinfo';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import BEMHelper from 'common/utils/bem';

interface OwnProps {
    periode: Periode;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, intl }) => {
    const periodeinfo = getPeriodeUttaksinfo(periode);
    return (
        <div className={bem.block}>
            <p>
                {periode.forelder} - {periode.type}
            </p>
            <p>{Tidsperioden(periode.tidsperiode).formaterStringMedDag(intl)}</p>
            {periodeinfo ? (
                <p>
                    uttaksdager: {periodeinfo.uttaksdager}, helligdager: {periodeinfo.helligdager}, dager brukt:{' '}
                    {periodeinfo.uttaksdagerBrukt}
                </p>
            ) : null}
            <div className={bem.element('delete')}>
                <Lukknapp onClick={() => onDelete(periode)}>Slett</Lukknapp>
            </div>
            {1 && false && <Periodeskjema periode={periode} onCancel={() => null} onSubmit={() => null} />}
        </div>
    );
};

export default injectIntl(PeriodeElement);
