import * as React from 'react';
import { UkerOgDager } from '../../../types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Tidsperiode } from 'nav-datovelger';
import BEMHelper from 'common/utils/bem';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import FomTomValg from '../../periodeskjema/parts/FomTomValg';
import DropdownDialogTittel from './DropdownDialogTittel';
import { Checkbox } from 'nav-frontend-skjema';

interface OwnProps {
    uker: number;
    dager: number;
    tidsperiode: Tidsperiode;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    ingenVarighet?: boolean;
    minDager?: number;
    onTidsperiodeChange: (tidsperiode: Tidsperiode) => void;
    onVarighetChange: (ukerOgDager: UkerOgDager, skalIkkeHa?: boolean) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('varighetDropdown');

const DatoValg: React.StatelessComponent<Props> = ({
    tidsperiode,
    onTidsperiodeChange,
    sluttdatoErLåst,
    startdatoErLåst,
    ingenVarighet
}) => {
    return (
        <FomTomValg
            onChange={onTidsperiodeChange}
            fom={tidsperiode.fom}
            tom={tidsperiode.tom}
            låstFomDato={startdatoErLåst}
            låstTomDato={sluttdatoErLåst}
            disabled={ingenVarighet}
            tomLabel={startdatoErLåst ? 'Velg sluttdato' : undefined}
            fomLabel={sluttdatoErLåst ? 'Velg startdato' : undefined}
        />
    );
};

const VarighetValg: React.StatelessComponent<Props> = ({ uker, dager, minDager, ingenVarighet, onVarighetChange }) => {
    return (
        <UkerOgDagerVelger
            tittel="Velg varighet"
            uker={uker}
            dager={dager}
            disabled={ingenVarighet}
            minDager={minDager}
            onChange={(ukerOgDager) => onVarighetChange(ukerOgDager)}
        />
    );
};

const VarighetMenyInnhold: React.StatelessComponent<Props> = (props) => {
    const { uker, dager, sluttdatoErLåst, startdatoErLåst, onVarighetChange } = props;
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
        /** Foreldrepenger før termin */
        return (
            <>
                <DropdownDialogTittel>Når ønsker du å starte uttaket før termin?</DropdownDialogTittel>
                <Block>
                    <DatoValg {...props} />
                </Block>
                <Block margin="m">eller</Block>
                <Block margin="xs">
                    <VarighetValg {...props} />
                </Block>
                <Block>
                    <Checkbox
                        label="Jeg skal ikke ha uttak før termin"
                        onChange={(evt) => onVarighetChange({ uker, dager }, true)}
                    />
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
