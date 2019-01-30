import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Periodetype } from '../../../types';
import MenuButton, { MenuButtonOption } from 'common/components/menuButton/MenuButton';
import Periodeikon from '../../periodeikon/Periodeikon';
import getMessage from 'common/utils/i18nUtils';
import { Tidsperiode } from 'common/types';
import { Tidsperioden } from '../../../utils/Tidsperioden';

interface OwnProps {
    periodetype?: Periodetype;
    tidsperiode?: Tidsperiode;
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

const PeriodetypeMeny: React.StatelessComponent<Props> = ({
    periodetype,
    tidsperiode,
    foreldernavn,
    onChange,
    intl
}) => {
    return (
        <MenuButton
            options={options}
            onChange={(value) => onChange(value as Periodetype)}
            selectedValue={periodetype}
            iconRenderer={(option) => <Periodeikon periodetype={option.value as Periodetype} />}
            labelRenderer={(option) => (
                <div className="periodetypeMenyLabel">
                    <div className="periodetypeMenyLabel__type">
                        {getMessage(intl, `periodetype.${option.value}`)}
                        {foreldernavn && <span> - {foreldernavn}</span>}
                    </div>
                    {tidsperiode && (
                        <div className="periodetypeMenyLabel__tidsperiode">
                            {Tidsperioden(tidsperiode).formaterStringKort(intl)}
                        </div>
                    )}
                </div>
            )}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
