import * as React from 'react';
import { Forelder, ForeldreparForelder, Forelderinfo } from '../../../types';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';

interface Props {
    forelder?: Forelder;
    mor: Forelderinfo;
    farMedmor: Forelderinfo;
    erLåst?: boolean;
    onChange: (forelder: Forelder) => void;
}

const getForelderOptions = (navnMor: string, navnFarMedmor: string): DropdownFormMenuOption[] => [
    { value: Forelder.farMedmor, label: navnFarMedmor },
    { value: Forelder.mor, label: navnMor }
];

const renderForelderIkon = (
    forelder: Forelder | undefined,
    mor: Forelderinfo,
    farMedmor: Forelderinfo
): React.ReactNode | undefined => {
    const iconRef: ForeldreparForelder = forelder === Forelder.farMedmor ? farMedmor.ikonRef : mor.ikonRef;
    return (
        <div className="forelderMenyIkon">
            <ForelderIkon forelder={iconRef} />
        </div>
    );
};

const ForelderMeny: React.StatelessComponent<Props> = ({ onChange, forelder, mor, farMedmor, erLåst }) => {
    const options = getForelderOptions(mor.navn, farMedmor!.navn);
    const valgtOption = forelder ? options.find((f) => f.value === forelder) : undefined;
    const valgtForelderNavn = valgtOption ? valgtOption.label : undefined;
    return (
        <DropdownForm
            disabled={erLåst}
            onSelection={(value) => onChange(value as Forelder)}
            contentClassName="forelderMenyDialog"
            contentTitle="Hvem gjelder perioden?"
            labelRenderer={() => (
                <IkonTekst ikon={renderForelderIkon(forelder, mor, farMedmor)} kunIkon={true}>
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
