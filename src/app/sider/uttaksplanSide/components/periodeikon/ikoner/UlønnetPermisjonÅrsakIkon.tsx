import * as React from 'react';
import { Utsettelsesårsak } from '../../../../../types';
import BEMHelper from 'common/util/bem';
import ForelderIkon from 'shared/components/foreldrepar/ForelderIkon';
import WorkIkon from 'common/components/ikoner/WorkIkon';
import HolidayIkon from 'common/components/ikoner/HolidayIkon';
import { Forelderinfo } from 'shared/types';

interface Props {
    forelderinfo: Forelderinfo;
    utsettelsesårsak: Utsettelsesårsak;
}

const bem = BEMHelper('ulonnetPermisjonArsakIkon');

const UlønnetPermisjonÅrsakIkon: React.StatelessComponent<Props> = ({ forelderinfo, utsettelsesårsak }) => (
    <div className={bem.block}>
        <div className={bem.element('forelder')}>
            <ForelderIkon forelder={forelderinfo.ikonRef} />
        </div>
        <div className={bem.element('utsettelsesarsak')}>
            {utsettelsesårsak === Utsettelsesårsak.arbeidHeltid && <WorkIkon />}
            {utsettelsesårsak === Utsettelsesårsak.ferie && <HolidayIkon />}
        </div>
    </div>
);

export default UlønnetPermisjonÅrsakIkon;
