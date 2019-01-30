import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Periodetype } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import Periodeikon from '../../periodeikon/Periodeikon';

interface OwnProps {
    periodetype?: Periodetype;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const options: MenuButtonOption[] = [
    { value: Periodetype.Uttak, label: 'Uttak' },
    { value: Periodetype.Ferie, label: 'Ferie' },
    { value: Periodetype.Arbeid, label: 'Arbeid' },
    { value: Periodetype.UbetaltPermisjon, label: 'Ubetalt permisjon' }
];
const PeriodetypeMeny: React.StatelessComponent<Props> = ({ periodetype, onChange, intl }) => {
    return (
        <MenuButton
            options={options}
            onChange={(value) => onChange(value as Periodetype)}
            selectedValue={periodetype}
            iconRenderer={(option) => <Periodeikon periodetype={option.value as Periodetype} />}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
