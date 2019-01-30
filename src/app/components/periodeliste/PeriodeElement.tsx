import * as React from 'react';
import Lukknapp from 'nav-frontend-lukknapp';
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
import { OmForeldre, Forelder, Periodetype } from '../../types';

import './periodeElement.less';

type Props = PeriodelisteElementProps;

const bem = BEMHelper('periodeElement');

const DragHandle = SortableHandle(() => (
    <span className="dragHandle">
        <span className="dragHandle__content">::</span>
    </span>
));

const getForelderNavn = (forelder: Forelder | undefined, omForeldre: OmForeldre): string | undefined => {
    if (forelder === undefined || omForeldre === undefined) {
        return;
    }
    if (forelder === Forelder.forelder1) {
        return omForeldre.forelder1.navn;
    } else {
        return omForeldre.forelder2 ? omForeldre.forelder2.navn : undefined;
    }
};

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, sortable, omForeldre, onRemove, onUpdate }) => {
    const { uttaksinfo } = periode;

    if (uttaksinfo === undefined) {
        return <div>Ingen periodeinfo</div>;
    }

    const { uker, dager } = uttaksinfo.ukerOgDager;
    const foreldernavn = getForelderNavn(periode.forelder, omForeldre);
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
                    foreldernavn={foreldernavn}
                    forelder={periode.forelder}
                    tidsperiode={periode.tidsperiode}
                    onChange={(periodetype) => onUpdate(changePeriodeType(periode, periodetype))}
                />
            </div>
            {periode.type === Periodetype.GradertUttak && (
                <div className={bem.element('gradering')}>
                    <GraderingMeny
                        gradering={periode.gradering}
                        onChange={(gradering) => onUpdate({ ...periode, gradering })}
                    />
                </div>
            )}
            <div className={bem.element('forelder')}>
                <ForelderMeny
                    forelder={periode.forelder}
                    omForeldre={omForeldre}
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
        </div>
    );
};

export default PeriodeElement;
