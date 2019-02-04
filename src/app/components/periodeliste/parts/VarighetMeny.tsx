import * as React from 'react';
import { UkerOgDager } from '../../../types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Tidsperiode } from 'nav-datovelger';
import BEMHelper from 'common/utils/bem';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import TomValg from '../../periodeskjema/parts/FomTomValg';
import DropdownDialogTittel from './DropdownDialogTittel';

interface OwnProps {
    uker: number;
    dager: number;
    tidsperiode: Tidsperiode;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    onTidsperiodeChange: (tidsperiode: Tidsperiode) => void;
    onVarighetChange: (ukerOgDager: UkerOgDager) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('varighetDropdown');

const DatoValg: React.StatelessComponent<Props> = ({
    tidsperiode,
    onTidsperiodeChange,
    sluttdatoErLåst,
    startdatoErLåst
}) => {
    return (
        <TomValg
            onChange={onTidsperiodeChange}
            fom={tidsperiode.fom}
            tom={tidsperiode.tom}
            låstFomDato={startdatoErLåst}
            låstTomDato={sluttdatoErLåst}
            tomLabel={startdatoErLåst ? 'Velg sluttdato' : undefined}
            fomLabel={sluttdatoErLåst ? 'Velg startdato' : undefined}
        />
    );
};

const VarighetValg: React.StatelessComponent<Props> = ({ uker, dager, onVarighetChange }) => {
    return (
        <UkerOgDagerVelger
            tittel="Velg varighet"
            uker={uker}
            dager={dager}
            onChange={(ukerOgDager) => onVarighetChange(ukerOgDager)}
        />
    );
};

const VarighetMenyInnhold: React.StatelessComponent<Props> = (props) => {
    const { sluttdatoErLåst, startdatoErLåst } = props;
    if (startdatoErLåst === true && sluttdatoErLåst !== true) {
        return (
            <>
                <DropdownDialogTittel>Hvor lang skal periode være?</DropdownDialogTittel>
                <Block margin="xs">
                    <VarighetValg {...props} />
                </Block>
                <Block margin="m">eller</Block>
                <Block>
                    <DatoValg {...props} />
                </Block>
            </>
        );
    } else if (startdatoErLåst !== true && sluttdatoErLåst === true) {
        return (
            <>
                <DropdownDialogTittel>Når ønsker du å starte perioden?</DropdownDialogTittel>
                <Block margin="xs">
                    <VarighetValg {...props} />
                </Block>
                <Block margin="m">eller</Block>
                <Block>
                    <DatoValg {...props} />
                </Block>
            </>
        );
    }
    return (
        <>
            <DropdownDialogTittel>Velg tidsperiode</DropdownDialogTittel>
            <Block margin="xs">
                <DatoValg {...props} />
            </Block>
            <Block>
                <VarighetValg {...props} />
            </Block>
        </>
    );
};

const VarighetMeny: React.StatelessComponent<Props> = (props) => {
    const { uker, dager } = props;
    return (
        <DropdownButton
            label={() => (
                <Block align="center" margin="none">
                    <Varighet dager={(uker * 5 + dager) | 0} />
                </Block>
            )}
            dialogClassName={'varighetDialog'}>
            <div className={bem.block}>
                <VarighetMenyInnhold {...props} />
            </div>
        </DropdownButton>
    );
};

export default injectIntl(VarighetMeny);
