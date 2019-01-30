import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/utils/bem';
import { Perioden } from '../../utils/Perioden';
import ForelderMeny from './parts/ForelderMeny';
import PeriodetypeMeny from './parts/PeriodetypeMeny';
import { changePeriodeType } from '../../utils/typeUtils';
import VarighetMeny from './parts/VarighetMeny';

import { SortableHandle } from 'react-sortable-hoc';
import { PeriodelisteElementProps } from './types';
import GraderingMeny from './parts/GraderingMeny';
import PeriodeFargestrek from './parts/periodeFargestrek/periodeFargestrek';
import { getPeriodetypeFarge } from '../../utils/styleutils';
import Block from 'common/components/block/Block';

import './periodeElement.less';

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
                <Block visible={false}>
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
                </Block>
            </div>
            <div className={bem.element('periode')}>
                <PeriodetypeMeny
                    periodetype={periode.type}
                    onChange={(periodetype) => onUpdate(changePeriodeType(periode, periodetype))}
                />
            </div>
            <div className={bem.element('forelder')}>
                <ForelderMeny
                    forelder={periode.forelder}
                    onChange={(forelder) =>
                        onUpdate({
                            ...periode,
                            forelder
                        })
                    }
                />
            </div>
            <div className={bem.element('tidsperiode')}>
                <VarighetMeny
                    tidsperiode={periode.tidsperiode}
                    uker={uker}
                    dager={dager}
                    onChange={(ukerOgDager) =>
                        onUpdate(Perioden(periode).setUkerOgDager(ukerOgDager.uker, ukerOgDager.dager))
                    }
                />
            </div>
            {1 + 1 === 3 && (
                <>
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
                </>
            )}
        </div>
    );
};

export default injectIntl(PeriodeElement);
