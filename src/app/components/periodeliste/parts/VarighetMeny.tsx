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
import KalenderIkon from 'common/components/ikoner/KalenderIkon';
import IkonLabel from './IkonLabel';

interface OwnProps {
    uker: number;
    dager: number;
    tidsperiode: Tidsperiode;
    låstStartdato?: boolean;
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
    låstStartdato,
    intl
}) => {
    const datovalg = (
        <FomTomValg
            onChange={onTidsperiodeChange}
            fom={tidsperiode.fom}
            tom={tidsperiode.tom}
            låstFomDato={låstStartdato}
            tomLabel={låstStartdato ? 'Velg sluttdato' : undefined}
        />
    );
    const varighetsvalg = (
        <UkerOgDagerVelger
            tittel="Velg varighet"
            uker={uker}
            dager={dager}
            onChange={(ukerOgDager) => onVarighetChange(ukerOgDager)}
        />
    );

    return (
        <DropdownButton
            label={() => (
                <IkonLabel ikon={<KalenderIkon />}>
                    <Varighet dager={(uker * 5 + dager) | 0} />
                </IkonLabel>
            )}
            dialogClassName={'varighetDialog'}>
            <div className={bem.block}>
                {låstStartdato ? (
                    <>
                        <DropdownDialogTittel>Hvor lang skal periode være?</DropdownDialogTittel>
                        <Block margin="xs">{varighetsvalg}</Block>
                        <Block margin="m">eller</Block>
                        <Block>{datovalg}</Block>
                    </>
                ) : (
                    <>
                        <DropdownDialogTittel>Velg tidsperiode</DropdownDialogTittel>
                        <Block margin="xs">{datovalg}</Block>
                        <Block>{varighetsvalg}</Block>
                    </>
                )}
            </div>
        </DropdownButton>
    );
};

export default injectIntl(VarighetMeny);
