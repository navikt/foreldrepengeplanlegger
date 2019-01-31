import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Periodetype, Periode } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import Periodeikon from '../../periodeikon/Periodeikon';
import getMessage from 'common/utils/i18nUtils';
import { Tidsperioden } from '../../../utils/Tidsperioden';
import DropdownDialogTittel from './DropdownDialogTittel';

interface OwnProps {
    periode: Periode;
    foreldernavn?: string;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getOptions = (intl: InjectedIntl): MenuButtonOption[] => [
    { value: Periodetype.Uttak, label: getMessage(intl, `periodetype.${Periodetype.Uttak}`) },
    { value: Periodetype.GradertUttak, label: getMessage(intl, `periodetype.${Periodetype.GradertUttak}`) },
    { value: Periodetype.Ferie, label: getMessage(intl, `periodetype.${Periodetype.Ferie}`) },
    { value: Periodetype.Arbeid, label: getMessage(intl, `periodetype.${Periodetype.Arbeid}`) }
    // { value: Periodetype.UbetaltPermisjon, label: getMessage(intl, `periodetype.${Periodetype.UbetaltPermisjon}`) },
];

const getPeriodetypeLabel = (periode: Periode, intl: InjectedIntl): string => {
    return `${getMessage(intl, `periodetype.${periode.type}`)}${
        periode.type === Periodetype.GradertUttak ? ` (${periode.gradering}%)` : ''
    }`;
};

const PeriodetypeMeny: React.StatelessComponent<Props> = ({ periode, foreldernavn, onChange, intl }) => {
    return (
        <MenuButton
            options={getOptions(intl)}
            onChange={(value) => onChange(value as Periodetype)}
            selectedValue={periode.type}
            iconRenderer={(option) => (
                <Periodeikon periodetype={option.value as Periodetype} forelder={periode.forelder} />
            )}
            dialogClassName={'periodetypeDialog'}
            headerRenderer={() => <DropdownDialogTittel>Velg type periode</DropdownDialogTittel>}
            labelRenderer={() => (
                <div className="periodetypeMenyLabel">
                    <div className="periodetypeMenyLabel__type">
                        {getPeriodetypeLabel(periode, intl)}
                        {foreldernavn && <span> - {foreldernavn}</span>}
                    </div>
                    {periode.tidsperiode && (
                        <div className="periodetypeMenyLabel__tidsperiode">
                            {Tidsperioden(periode.tidsperiode).formaterStringKort(intl)}
                        </div>
                    )}
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
