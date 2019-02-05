import * as React from 'react';
import { Forelder, Forelderinfo } from '../../../types';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import IconText from 'common/components/iconText/IconText';

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
    return forelder ? (
        <div className="forelderMenyIkon">
            <ForelderIkon forelder={forelder === Forelder.farMedmor ? farMedmor.ikonRef : mor.ikonRef} />
        </div>
    ) : (
        <span>Velg forelder</span>
    );
};

const renderLabel = (props: Props, options: DropdownFormMenuOption[]): React.ReactNode => {
    const { forelder, mor, farMedmor } = props;
    if (forelder) {
        const valgtOption = forelder ? options.find((f) => f.value === forelder) : undefined;
        const navn = valgtOption ? valgtOption.label : undefined;
        return (
            <IconText icon={renderForelderIkon(forelder, mor, farMedmor)} iconOnly={true}>
                {navn}
            </IconText>
        );
    }
    return <span>Velg forelder</span>;
};

const ForelderMeny: React.StatelessComponent<Props> = (props) => {
    const { onChange, forelder, mor, farMedmor, erLåst } = props;
    const options = getForelderOptions(mor.navn, farMedmor!.navn);
    return (
        <DropdownForm
            disabled={erLåst}
            onSelection={(value) => onChange(value as Forelder)}
            contentClassName="forelderMenyDialog"
            contentTitle="Hvem gjelder perioden?"
            labelRenderer={() => renderLabel(props, options)}
            labelAlignment="center"
            contentRenderer={() => <DropdownFormMenu options={options} selectedValue={forelder} />}
            dropdownPlacement="right"
        />
    );
};

export default ForelderMeny;
