import * as React from 'react';
import { Periodetype } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';

interface Props {
    type: Periodetype;
    onChange: (type: Periodetype) => void;
}

const options: MenuButtonOption[] = [
    { value: Periodetype.Uttak, label: 'Uttak' },
    { value: Periodetype.Ferie, label: 'Ferie' },
    { value: Periodetype.Arbeid, label: 'Arbeid' },
    { value: Periodetype.UbetaltPermisjon, label: 'Ubetalt permisjon' }
];

const PeriodetypeMenu: React.StatelessComponent<Props> = ({ onChange, type }) => (
    <MenuButton onChange={onChange} options={options} selectedValue={type} />
);

export default PeriodetypeMenu;
