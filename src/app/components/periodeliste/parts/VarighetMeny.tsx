import * as React from 'react';
import { UkerOgDager } from '../../../types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
// import { Tidsperioden } from '../../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import BEMHelper from 'common/utils/bem';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import FomTomValg from '../../periodeskjema/parts/FomTomValg';

interface OwnProps {
    tidsperiode: Tidsperiode;
    uker: number;
    dager: number;
    onTidsperiodeChange: (tidsperiode: Tidsperiode) => void;
    onVarighetChange: (ukerOgDager: UkerOgDager) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('varighetDropdown');
const VarighetMeny: React.StatelessComponent<Props> = ({
    uker,
    dager,
    tidsperiode,
    onVarighetChange,
    onTidsperiodeChange,
    intl
}) => (
    <DropdownButton label={() => <Varighet dager={(uker * 5 + dager) | 0} />} dialogClassName={'varighetDialog'}>
        <Block margin="s">
            <Block margin="xxs">
                <FomTomValg onChange={onTidsperiodeChange} fom={tidsperiode.fom} tom={tidsperiode.tom} />
            </Block>
            {/* <div className={bem.element('tidsperiode')}>{Tidsperioden(tidsperiode).formaterStringMedDag(intl)}</div> */}
        </Block>
        <div className={bem.block}>
            <UkerOgDagerVelger
                tittel="Varighet"
                uker={uker}
                dager={dager}
                onChange={(ukerOgDager) => onVarighetChange(ukerOgDager)}
            />
        </div>
    </DropdownButton>
);

export default injectIntl(VarighetMeny);
