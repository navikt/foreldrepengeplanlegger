import * as React from 'react';
import { Forelder } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';

interface Props {
    forelder: Forelder;
    onChange: (forelder: Forelder) => void;
}

const forelderOptions: MenuButtonOption[] = [
    { value: Forelder.forelder1, label: 'Forelder 1' },
    { value: Forelder.forelder2, label: 'Forelder 2' }
];

const ForelderMenu: React.StatelessComponent<Props> = ({ onChange, forelder }) => (
    <MenuButton onChange={onChange} options={forelderOptions} selectedValue={forelder} />
);

export default ForelderMenu;
