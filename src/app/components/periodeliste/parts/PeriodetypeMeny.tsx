import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Periodetype } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import Periodeikon from '../../periodeikon/Periodeikon';
import getMessage from 'common/utils/i18nUtils';

interface OwnProps {
    periodetype?: Periodetype;
    foreldernavn?: string;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const options: MenuButtonOption[] = [
    { value: Periodetype.Uttak, label: 'Uttak' },
    { value: Periodetype.Ferie, label: 'Ferie' },
    { value: Periodetype.Arbeid, label: 'Arbeid' },
    { value: Periodetype.UbetaltPermisjon, label: 'Ubetalt permisjon' }
];

const PeriodetypeMeny: React.StatelessComponent<Props> = ({ periodetype, onChange, foreldernavn, intl }) => {
    return (
        <MenuButton
            options={options}
            onChange={(value) => onChange(value as Periodetype)}
            selectedValue={periodetype}
            iconRenderer={(option) => <Periodeikon periodetype={option.value as Periodetype} />}
            labelRenderer={(option) => (
                <div>
                    {getMessage(intl, `periodetype.${option.value}`)}
                    {foreldernavn && <span> - {foreldernavn}</span>}
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
