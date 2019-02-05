import * as React from 'react';
import { Forelder, OmForeldre, ForeldreparForelder } from '../../../types';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';

interface Props {
    forelder?: Forelder;
    omForeldre: OmForeldre;
    erLåst?: boolean;
    onChange: (forelder: Forelder) => void;
}

const getForelderOptions = (omForeldre: OmForeldre): DropdownFormMenuOption[] => [
    { value: Forelder.farMedmor, label: omForeldre.farMedmor.navn },
    { value: Forelder.mor, label: omForeldre.mor!.navn }
];

const renderForelderIkon = (forelder: Forelder | undefined, omForeldre: OmForeldre): React.ReactNode | undefined => {
    const iconRef: ForeldreparForelder =
        forelder === Forelder.farMedmor ? omForeldre.farMedmor.ikonRef : omForeldre.mor!.ikonRef;
    return (
        <div className="forelderMenyIkon">
            <ForelderIkon forelder={iconRef} />
        </div>
    );
};

const ForelderMeny: React.StatelessComponent<Props> = ({ onChange, forelder, omForeldre, erLåst }) => {
    const options = getForelderOptions(omForeldre);
    const valgtOption = forelder ? options.find((f) => f.value === forelder) : undefined;
    const valgtForelderNavn = valgtOption ? valgtOption.label : undefined;
    return (
        <DropdownForm
            disabled={erLåst}
            onSelection={(value) => onChange(value as Forelder)}
            contentClassName="forelderMenyDialog"
            contentTitle="Hvem gjelder perioden?"
            labelRenderer={() => (
                <IkonTekst ikon={renderForelderIkon(forelder, omForeldre)} kunIkon={true}>
                    {valgtForelderNavn}
                </IkonTekst>
            )}
            contentRenderer={() => <DropdownFormMenu options={options} selectedValue={forelder} />}
            labelAlignment="center"
            dropdownPlacement="right"
        />
    );
};

export default ForelderMeny;
