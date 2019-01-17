import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';
import { Tidsperioden, getTidsperiode } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getPeriodeUttaksinfo } from '../../utils/periodeinfo';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import BEMHelper from 'common/utils/bem';
import NumberStepper from '../numberStepper/NumberStepper';
import Block from 'common/components/block/Block';

import './periodeElement.less';
import { Tidsperiode } from 'common/types';

interface OwnProps {
    periode: Periode;
    onChange: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const getTidsperiodeFromUkerOgDager = (fom: Date, uker: number, dager: number): Tidsperiode => {
    const dagerTotalt = uker * 5 + dager;
    return getTidsperiode(fom, dagerTotalt);
};

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, onChange, intl }) => {
    const periodeinfo = getPeriodeUttaksinfo(periode);
    if (periodeinfo === undefined) {
        return <div>Ingen periodeinfo</div>;
    }

    const setDager = (dager: number) => {
        onChange({
            ...periode,
            tidsperiode: getTidsperiodeFromUkerOgDager(periode.tidsperiode.fom, periodeinfo.ukerOgDager.uker, dager)
        });
    };
    const setUker = (uker: number) => {
        onChange({
            ...periode,
            tidsperiode: getTidsperiodeFromUkerOgDager(periode.tidsperiode.fom, uker, periodeinfo.ukerOgDager.dager)
        });
    };

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
            <div>
                <Block margin="s">
                    Uker:
                    <NumberStepper value={periodeinfo.ukerOgDager.uker} onChange={setUker} />
                </Block>
                <Block margin="s">
                    Dager:
                    <NumberStepper value={periodeinfo.ukerOgDager.dager} onChange={setDager} />
                </Block>
            </div>
            {1 && false && <Periodeskjema periode={periode} onCancel={() => null} onSubmit={() => null} />}
        </div>
    );
};

export default injectIntl(PeriodeElement);
