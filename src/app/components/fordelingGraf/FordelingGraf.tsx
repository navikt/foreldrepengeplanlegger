import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { Fordeling, OmForeldre, TilgjengeligeDager } from '../../types';
import Varighet from '../varighet/Varighet';
import HighlightContent from 'common/components/highlightContent/HighlightContent';

import './fordelingGraf.less';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import Block from 'common/components/block/Block';
import { Ingress } from 'nav-frontend-typografi';

interface OwnProps {
    fordeling: Fordeling;
    tilgjengeligeDager: TilgjengeligeDager;
    omForeldre: OmForeldre;
}

type Props = OwnProps;

const bem = BEMHelper('fordelingGraf');

interface TittelProps {
    navn: string;
    ikon?: React.ReactNode;
    dager?: number;
    maksDager?: number;
}
const Tittel: React.StatelessComponent<TittelProps> = ({ navn, ikon, dager, maksDager }) => {
    if (dager === undefined) {
        return null;
    }
    const forMangeDager = maksDager && maksDager < dager;
    const tittelBem = bem.child('tittel');
    const forbrukBem = bem.child('forbruk');
    return (
        <div className={bem.classNames(tittelBem.block, { [`${tittelBem.modifier('error')}`]: dager < 0 })}>
            {ikon && <div className={bem.child('tittel').element('ikon')}>{ikon}</div>}
            <div
                className={bem.classNames(forbrukBem.block, forMangeDager ? forbrukBem.modifier('formye') : undefined)}>
                <div className={forbrukBem.element('navn')}>{navn}</div>
                <div className={forbrukBem.element('dager')}>
                    <HighlightContent watchValue={dager} invalid={dager < 0}>
                        <Varighet dager={Math.abs(dager | 0)} />
                    </HighlightContent>
                </div>
            </div>
        </div>
    );
};

const FordelingTitler: React.StatelessComponent<Props> = ({ fordeling, omForeldre, tilgjengeligeDager }) => {
    const { farMedmor, mor, overforbruk } = fordeling;
    const dagerTotalt =
        mor.uttaksdager + (farMedmor ? farMedmor.uttaksdager : 0) + (overforbruk ? overforbruk.uttaksdager : 0);
    return (
        <div className={bem.element('titler')}>
            <Tittel
                navn={omForeldre.mor.navn}
                ikon={<ForelderIkon forelder={omForeldre.mor.ikonRef} />}
                dager={mor.uttaksdager}
                maksDager={tilgjengeligeDager.maksDagerTilgjengeligMor}
            />
            {omForeldre.farMedmor && (
                <Tittel
                    navn={omForeldre.farMedmor.navn}
                    ikon={<ForelderIkon forelder={omForeldre.farMedmor.ikonRef} />}
                    dager={farMedmor ? farMedmor.uttaksdager : undefined}
                    maksDager={tilgjengeligeDager.maksDagerTilgjengeligFar}
                />
            )}
            <Tittel navn="Totalt" dager={dagerTotalt} maksDager={dagerTotalt} />
        </div>
    );
};

const FordelingBars: React.StatelessComponent<Props> = ({ fordeling }) => {
    const { farMedmor, mor, overforbruk } = fordeling;
    return (
        <div className={bem.element('graf')} role="presentation">
            <div className={bem.element('graf__bar bkg-mor')} style={{ width: `${mor.pst}%` }} />
            {farMedmor && (
                <div className={bem.element('graf__bar bkg-farMedmor')} style={{ width: `${farMedmor.pst}%` }} />
            )}
            {overforbruk && (
                <div className={bem.element('graf__bar bkg-overforbruk')} style={{ width: `${overforbruk.pst}%` }} />
            )}
        </div>
    );
};

const FordelingGraf: React.StatelessComponent<Props> = (props) => {
    const { tilgjengeligeDager } = props;
    if (!tilgjengeligeDager) {
        return null;
    }
    return (
        <div className={bem.block}>
            <Block margin="xs">
                <Ingress>Deres fordeling</Ingress>
            </Block>
            <Block margin="m">
                <FordelingBars {...props} />
            </Block>
            <FordelingTitler {...props} />
        </div>
    );
};

export default FordelingGraf;
