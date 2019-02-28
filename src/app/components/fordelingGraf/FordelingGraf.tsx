import * as React from 'react';
import classNames from 'classnames';
import BEMHelper from 'common/utils/bem';
import { Fordeling, OmForeldre, TilgjengeligeDager } from '../../types';
import Varighet from '../varighet/Varighet';
import HighlightContent from 'common/components/highlightContent/HighlightContent';

import './fordelingGraf.less';

interface OwnProps {
    fordeling: Fordeling;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps;

const bem = BEMHelper('fordelingGraf');

const Tittel: React.StatelessComponent<{ navn: string; dager?: number; maksDager?: number }> = ({
    navn,
    dager,
    maksDager
}) => {
    if (dager === undefined) {
        return null;
    }
    const forMangeDager = maksDager && maksDager < dager;
    return (
        <div className={classNames(bem.element('tittel'), { [`${bem.element('tittel', 'error')}`]: dager < 0 })}>
            <div
                className={bem.classNames(
                    bem.element('forbruk'),
                    forMangeDager ? bem.element('forbruk', 'formye') : undefined
                )}>
                <div className={bem.element('forbruk__navn')}>{navn}</div>
                <div className={bem.element('forbruk__dager')}>
                    <HighlightContent watchValue={dager} invalid={dager < 0}>
                        <Varighet dager={Math.abs(dager | 0)} />
                    </HighlightContent>
                </div>
            </div>
        </div>
    );
};

const FordelingGraf: React.StatelessComponent<Props> = ({ fordeling, omForeldre, tilgjengeligeDager }) => {
    const { farMedmor, mor, dagerTotalt, overforbruk } = fordeling;
    const dagerTotaltMedOverforbruk = dagerTotalt + (overforbruk ? overforbruk.uttaksdager : 0);
    if (!tilgjengeligeDager) {
        return null;
    }
    return (
        <div className={bem.block}>
            <div className={bem.element('titler')}>
                <Tittel
                    navn={omForeldre.mor ? omForeldre.mor.navn : 'Brukt'}
                    dager={mor.uttaksdager}
                    maksDager={tilgjengeligeDager.maksDagerTilgjengeligMor}
                />
                {omForeldre.farMedmor && (
                    <Tittel
                        navn={omForeldre.farMedmor.navn}
                        dager={farMedmor ? farMedmor.uttaksdager : undefined}
                        maksDager={tilgjengeligeDager.maksDagerTilgjengeligFar}
                    />
                )}
                <Tittel navn="Totalt registrert" dager={dagerTotaltMedOverforbruk} maksDager={dagerTotalt} />
            </div>
            <div className={bem.element('graf')} role="presentation">
                <div className={bem.element('graf__bar bkg-mor')} style={{ width: `${mor.pst}%` }} />
                {farMedmor && (
                    <div className={bem.element('graf__bar bkg-farMedmor')} style={{ width: `${farMedmor.pst}%` }} />
                )}
                {overforbruk && (
                    <div
                        className={bem.element('graf__bar bkg-overforbruk')}
                        style={{ width: `${overforbruk.pst}%` }}
                    />
                )}
            </div>
        </div>
    );
};

export default FordelingGraf;
