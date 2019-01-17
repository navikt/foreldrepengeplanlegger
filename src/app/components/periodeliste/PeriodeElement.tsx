import * as React from 'react';
import { Periode, Periodetype } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import BEMHelper from 'common/utils/bem';
import Block from 'common/components/block/Block';
import { Perioden } from '../../utils/Perioden';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { CheckboksPanel } from 'nav-frontend-skjema';
import ForelderMenu from './parts/ForelderMenu';
import PeriodetypeMenu from './parts/PeriodetypeMenu';

import './periodeElement.less';
import { changePeriodeType } from '../../utils/typeUtils';

interface OwnProps {
    periode: Periode;
    onChange: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, onChange, intl }) => {
    const { uttaksinfo } = periode;
    if (uttaksinfo === undefined) {
        return <div>Ingen periodeinfo</div>;
    }

    const { uker, dager } = uttaksinfo.ukerOgDager;
    return (
        <div className={bem.block}>
            <div className={bem.element('delete')}>
                <Lukknapp onClick={() => onDelete(periode)}>Slett</Lukknapp>
            </div>
            <p>
                <ForelderMenu
                    forelder={periode.forelder}
                    onChange={(forelder) =>
                        onChange({
                            ...periode,
                            forelder
                        })
                    }
                />
                <PeriodetypeMenu
                    type={periode.type}
                    onChange={(type: Periodetype) => onChange(changePeriodeType(periode, type))}
                />
            </p>
            <p>{Tidsperioden(periode.tidsperiode).formaterStringMedDag(intl)}</p>
            {uttaksinfo ? (
                <p>
                    uttaksdager: {uttaksinfo.uttaksdager}, helligdager: {uttaksinfo.helligdager}, dager brukt:{' '}
                    {uttaksinfo.uttaksdagerBrukt}
                </p>
            ) : null}
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
