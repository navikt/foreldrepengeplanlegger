import * as React from 'react';
import { UkerOgDager } from '../../../types';
import { getVarighetString } from 'common/utils/intlUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Tidsperioden } from '../../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';

import './varighetMenu.less';
import BEMHelper from 'common/utils/bem';

interface OwnProps {
    tidsperiode: Tidsperiode;
    uker: number;
    dager: number;
    onChange: (ukerOgDager: UkerOgDager) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('varighetDropdown');
const VarighetMeny: React.StatelessComponent<Props> = ({ uker, dager, tidsperiode, onChange, intl }) => (
    <DropdownButton label={getVarighetString(uker * 5 + dager, intl)} onClose={() => null}>
        <div className={bem.block}>
            <UkerOgDagerVelger
                tittel="Velg uker og dager"
                uker={uker}
                dager={dager}
                onChange={(ukerOgDager) => onChange(ukerOgDager)}
            />
            <div className={bem.element('tidsperiode')}>{Tidsperioden(tidsperiode).formaterStringMedDag(intl)}</div>
        </div>
    </DropdownButton>
);

export default injectIntl(VarighetMeny);
