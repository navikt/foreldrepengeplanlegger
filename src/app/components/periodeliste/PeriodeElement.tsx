import * as React from 'react';
import { Periodetype } from '../../types';
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
import { SortableHandle } from 'react-sortable-hoc';
import { PeriodelisteElementProps } from './types';
import GraderingMeny from './parts/GraderingMeny';
import PeriodeFargestrek from './parts/periodeFargestrek/periodeFargestrek';
import { getPeriodetypeFarge } from '../../utils/styleutils';

type Props = PeriodelisteElementProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const DragHandle = SortableHandle(() => (
    <span className="dragHandle">
        <span className="dragHandle__content">::</span>
    </span>
));

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, sortable, lockable, onRemove, onUpdate, intl }) => {
    const { uttaksinfo } = periode;

    if (uttaksinfo === undefined) {
        return <div>Ingen periodeinfo</div>;
    }

    const { uker, dager } = uttaksinfo.ukerOgDager;
    return (
        <div className={bem.block}>
            <PeriodeFargestrek farge={getPeriodetypeFarge(periode.type, periode.forelder)} />
            <div className={bem.element('tools')}>
                {sortable && (
                    <div className={bem.element('tool')}>
                        <DragHandle />
                    </div>
                )}
                <div className={bem.element('tool')}>
                    <Lukknapp onClick={() => onRemove(periode)} ariaLabel="Slett periode">
                        Slett periode
                    </Lukknapp>
                </div>
            </div>
            <Block margin="xxs">
                <ForelderMeny
                    forelder={periode.forelder}
                    onChange={(forelder) =>
                        onUpdate({
                            ...periode,
                            forelder
                        })
                    }
                />
                {' - '}
                <PeriodetypeMeny
                    type={periode.type}
                    onChange={(type: Periodetype) => onUpdate(changePeriodeType(periode, type))}
                />
                {' - '}
                <VarighetMeny
                    tidsperiode={periode.tidsperiode}
                    uker={uker}
                    dager={dager}
                    onChange={(ukerOgDager) =>
                        onUpdate(Perioden(periode).setUkerOgDager(ukerOgDager.uker, ukerOgDager.dager))
                    }
                />
                {' - '}
                <GraderingMeny
                    gradering={periode.gradering}
                    onChange={(gradering) => onUpdate({ ...periode, gradering })}
                />
            </Block>
            <Block margin="xxs">
                {lockable && (
                    <>
                        <PinKnapp
                            size="normal"
                            label="Lås tidsperiode"
                            pressed={periode.fixed === true}
                            onClick={(pressed) => onUpdate({ ...periode, fixed: pressed })}
                        />
                        {' - '}
                    </>
                )}
                {Tidsperioden(periode.tidsperiode).formaterStringMedDag(intl)}
            </Block>
        </div>
    );
};

export default injectIntl(PeriodeElement);
