import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Periodetype, Forelder } from '../../../types';
import getMessage from 'common/utils/i18nUtils';
import { Tidsperioden } from '../../../utils/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import DropdownFormMenu, { DropdownFormMenuOption } from 'common/components/dropdownForm/DropdownFormMenu';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';
import Periodeikon from '../../periodeikon/Periodeikon';

interface OwnProps {
    type?: Periodetype;
    tidsperiode?: Tidsperiode;
    forelder?: Forelder;
    flereForeldre: boolean;
    foreldernavn?: string;
    erLåst?: boolean;
    onChange: (periodetype: Periodetype) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getOptions = (intl: InjectedIntl): DropdownFormMenuOption[] => [
    {
        value: Periodetype.UttakFørTermin,
        label: getMessage(intl, `periodetype.${Periodetype.UttakFørTermin}`),
        hidden: true
    },
    { value: Periodetype.Uttak, label: getMessage(intl, `periodetype.${Periodetype.Uttak}`) },
    { value: Periodetype.GradertUttak, label: getMessage(intl, `periodetype.${Periodetype.GradertUttak}`) },
    { value: Periodetype.Ferie, label: getMessage(intl, `periodetype.${Periodetype.Ferie}`) },
    { value: Periodetype.Arbeid, label: getMessage(intl, `periodetype.${Periodetype.Arbeid}`) }
];

const getPeriodetypeLabel = (type: Periodetype | undefined, intl: InjectedIntl): string => {
    return getMessage(intl, `periodetype.${type}`);
};

const PeriodetypeMenyLabel: React.StatelessComponent<Props> = ({
    type,
    tidsperiode,
    forelder,
    flereForeldre,
    foreldernavn,
    intl
}) => {
    return (
        <IkonTekst ikon={<Periodeikon periodetype={type} forelder={forelder} />}>
            <div className="periodetypeMenyLabel">
                <div className="periodetypeMenyLabel__type">
                    {getPeriodetypeLabel(type, intl)}
                    {flereForeldre && foreldernavn && <span> - {foreldernavn}</span>}
                </div>
                {tidsperiode && (
                    <div className="periodetypeMenyLabel__tidsperiode">
                        {Tidsperioden(tidsperiode).formaterStringKort(intl)}
                    </div>
                )}
            </div>
        </IkonTekst>
    );
};

const PeriodetypeMeny: React.StatelessComponent<Props> = (props) => {
    const { erLåst, intl, type, onChange } = props;
    return (
        <DropdownForm
            disabled={erLåst}
            onSelection={onChange}
            labelRenderer={() => <PeriodetypeMenyLabel {...props} />}
            contentClassName="periodetypeDialog"
            contentRenderer={() => <DropdownFormMenu options={getOptions(intl)} selectedValue={type} />}
        />
    );
};

export default injectIntl(PeriodetypeMeny);
