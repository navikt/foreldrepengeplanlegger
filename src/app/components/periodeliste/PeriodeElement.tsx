import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getPeriodeUttaksinfo } from '../../utils/periodeinfo';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import BEMHelper from 'common/utils/bem';
import Block from 'common/components/block/Block';
import { Perioden } from '../../utils/Perioden';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';

import './periodeElement.less';
import { CheckboksPanel } from 'nav-frontend-skjema';

interface OwnProps {
    periode: Periode;
    onChange: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, onChange, intl }) => {
    const periodeinfo = getPeriodeUttaksinfo(periode);

    if (periodeinfo === undefined) {
        return <div>Ingen periodeinfo</div>;
    }

    const { uker, dager } = periodeinfo.ukerOgDager;
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
            <Block>
                <UkerOgDagerVelger
                    tittel="Hvor lenge skal perioden vare?"
                    uker={uker}
                    dager={dager}
                    onChange={(ukerOgDager) =>
                        onChange(Perioden(periode).setUkerOgDager(ukerOgDager.uker, ukerOgDager.dager))
                    }
                />
            </Block>
            <CheckboksPanel
                label="Låst periode"
                checked={periode.fixed || false}
                onChange={(evt) => onChange({ ...periode, fixed: (evt.target as any).checked })}
            />

            {1 && false && <Periodeskjema periode={periode} onCancel={() => null} onSubmit={() => null} />}
        </div>
    );
};

export default injectIntl(PeriodeElement);
