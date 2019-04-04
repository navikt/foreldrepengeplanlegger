import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Utsettelsesårsak, OmForeldre, Forelder } from '../../../types';
import getMessage from 'common/utils/i18nUtils';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import { getMedforelderNavn } from '../../../utils/common';

interface OwnProps {
    utsettelsesårsak?: Utsettelsesårsak;
    forelder: Forelder;
    omForeldre: OmForeldre;
    dropdownStyle?: DropdownFormStyle;
    onChange: (utsettelsesårsak: Utsettelsesårsak) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getOptions = (intl: InjectedIntl): DropdownFormMenuOption[] => {
    return [
        {
            value: Utsettelsesårsak.ferie,
            label: getMessage(intl, `utsettelsesårsak.${Utsettelsesårsak.ferie}`)
        },
        {
            value: Utsettelsesårsak.arbeidHeltid,
            label: getMessage(intl, `utsettelsesårsak.${Utsettelsesårsak.arbeidHeltid}`)
        }
    ];
};

const getUtsettelsesårsakLabel = (type: Utsettelsesårsak | undefined, intl: InjectedIntl): string => {
    return getMessage(intl, `utsettelsesårsak.${type}`);
};

const UlønnetPermisjonLabel: React.StatelessComponent<Props> = ({ utsettelsesårsak, forelder, omForeldre, intl }) => {
    return utsettelsesårsak ? (
        <div className="ulonnetPermisjonMenyLabel">{getUtsettelsesårsakLabel(utsettelsesårsak, intl)}</div>
    ) : (
        <div className="ulonnetPermisjonMenyLabel">Velg utsettelse</div>
    );
};

const UlønnetPermisjonMeny: React.StatelessComponent<Props> = (props) => {
    const { intl, utsettelsesårsak, dropdownStyle = 'filled', onChange, forelder, omForeldre } = props;
    return (
        <DropdownForm
            onSelection={onChange}
            labelRenderer={() => <UlønnetPermisjonLabel {...props} />}
            contentClassName="ulonnetPermisjonDialog"
            contentTitle={getMessage(intl, 'periodeliste.velgUlønnetPermisjon', {
                navn: getMedforelderNavn(forelder, omForeldre)
            })}
            style={dropdownStyle}
            contentRenderer={() => <DropdownFormMenu options={getOptions(intl)} selectedValue={utsettelsesårsak} />}
        />
    );
};

export default injectIntl(UlønnetPermisjonMeny);
