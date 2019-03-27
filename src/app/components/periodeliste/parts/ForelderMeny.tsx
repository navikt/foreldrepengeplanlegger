import * as React from 'react';
import { Forelder, Forelderinfo } from '../../../types';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import IconText from 'common/components/iconText/IconText';
import getMessage from 'common/utils/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Foreldrepar from 'common/components/foreldrepar/Foreldrepar';

interface Props {
    forelder?: Forelder;
    medforelder?: Forelder;
    mor: Forelderinfo;
    farMedmor: Forelderinfo;
    erLåst?: boolean;
    dropdownStyle?: DropdownFormStyle;
    kanVelgeBeggeForeldre?: boolean;
    onChange: (forelder: Forelder, medforelder: Forelder | undefined) => void;
}

export const BEGGE_FORELDRE = 'begge';

const getForelderOptions = (
    navnMor: string,
    navnFarMedmor: string,
    kanVelgeBeggeForeldre: boolean
): DropdownFormMenuOption[] => [
    { value: Forelder.mor, label: navnMor },
    { value: Forelder.farMedmor, label: navnFarMedmor },
    ...(kanVelgeBeggeForeldre ? [{ value: BEGGE_FORELDRE, label: `Begge` }] : [])
];

const renderForelderIkon = (
    forelder: Forelder | undefined,
    mor: Forelderinfo,
    farMedmor: Forelderinfo,
    medforelder?: Forelder
): React.ReactNode | undefined => {
    return forelder ? (
        <div className="forelderMenyIkon">
            <Foreldrepar
                forelder1={forelder === Forelder.farMedmor ? farMedmor.ikonRef : mor.ikonRef}
                forelder2={
                    medforelder ? (medforelder === Forelder.farMedmor ? farMedmor.ikonRef : mor.ikonRef) : undefined
                }
            />
        </div>
    ) : (
        <span>Velg forelder</span>
    );
};

const renderLabel = (props: Props, options: DropdownFormMenuOption[]): React.ReactNode => {
    const { forelder, medforelder, mor, farMedmor } = props;
    if (forelder) {
        const valgtOption = forelder ? options.find((f) => f.value === forelder) : undefined;
        const navn = valgtOption ? valgtOption.label : undefined;
        return (
            <IconText
                layout="vertical"
                icon={renderForelderIkon(forelder, mor, farMedmor, medforelder)}
                iconOnly={true}>
                {navn}
            </IconText>
        );
    }
    return (
        <span>
            <FormattedMessage id="periodeliste.forelder.tittel" />
        </span>
    );
};

const ForelderMeny: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const {
        onChange,
        forelder,
        medforelder,
        mor,
        farMedmor,
        erLåst,
        dropdownStyle = 'filled',
        kanVelgeBeggeForeldre,
        intl
    } = props;
    const options = getForelderOptions(mor.navn, farMedmor.navn, kanVelgeBeggeForeldre === true);
    return (
        <DropdownForm
            disabled={erLåst}
            disabledButtonClassName="forelderMenyDisabled"
            onSelection={(value) => {
                if (value === BEGGE_FORELDRE) {
                    onChange(Forelder.mor, Forelder.farMedmor);
                } else {
                    onChange(value as Forelder, undefined);
                }
            }}
            contentClassName="forelderDialog"
            contentTitle={getMessage(intl, 'periodeliste.forelder.spørsmål')}
            labelRenderer={() => renderLabel(props, options)}
            labelAlignment="center"
            style={dropdownStyle}
            contentRenderer={() => (
                <DropdownFormMenu options={options} selectedValue={!!medforelder ? BEGGE_FORELDRE : forelder} />
            )}
            dropdownPlacement="right"
        />
    );
};

export default injectIntl(ForelderMeny);
