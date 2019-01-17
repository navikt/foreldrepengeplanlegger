import * as React from 'react';
import { Periode, Periodetype } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/utils/bem';
import { Perioden } from '../../utils/Perioden';
import ForelderMeny from './parts/ForelderMeny';
import PeriodetypeMeny from './parts/PeriodetypeMeny';
import { changePeriodeType } from '../../utils/typeUtils';
import VarighetMeny from './parts/VarighetMeny';
import PinKnapp from '../pinKnapp/PinKnapp';
import Block from 'common/components/block/Block';

import './periodeElement.less';

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
            <div className={bem.element('tools')}>
                <div className={bem.element('tool')}>
                    <Lukknapp onClick={() => onDelete(periode)} ariaLabel="Slett periode">
                        Slett periode
                    </Lukknapp>
                </div>
            </div>
            <Block margin="xxs">
                <ForelderMeny
                    forelder={periode.forelder}
                    onChange={(forelder) =>
                        onChange({
                            ...periode,
                            forelder
                        })
                    }
                />
                {' - '}
                <PeriodetypeMeny
                    type={periode.type}
                    onChange={(type: Periodetype) => onChange(changePeriodeType(periode, type))}
                />
                {' - '}
                <VarighetMeny
                    tidsperiode={periode.tidsperiode}
                    uker={uker}
                    dager={dager}
                    onChange={(ukerOgDager) =>
                        onChange(Perioden(periode).setUkerOgDager(ukerOgDager.uker, ukerOgDager.dager))
                    }
                />
            </Block>
            <Block margin="xxs">
                <PinKnapp
                    size="normal"
                    label="Lås tidsperiode"
                    pressed={periode.fixed === true}
                    onClick={(pressed) => onChange({ ...periode, fixed: pressed })}
                />
                {' - '}
                {Tidsperioden(periode.tidsperiode).formaterStringMedDag(intl)}
            </Block>
        </div>
    );
};

export default injectIntl(PeriodeElement);
