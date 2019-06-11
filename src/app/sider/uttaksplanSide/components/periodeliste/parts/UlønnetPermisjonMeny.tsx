import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Utsettelsesårsak } from '../../../../../types';
import getMessage from 'common/util/i18nUtils';
import DropdownFormMenu from 'common/components/dropdownForm/DropdownFormMenu';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import { getMedforelderNavn } from '../../../../../utils/common';
import IconText from 'common/components/iconText/IconText';
import AriaAlternative from 'common/components/aria/AriaAlternative';
import UlønnetPermisjonÅrsakIkon from '../../periodeikon/ikoner/UlønnetPermisjonÅrsakIkon';
import Tittel from 'common/components/tittel/Tittel';
import { Element } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import Lenker from '../../../../../lenker';
import { getUlønnetPermisjonUtsettelseOptions } from '../../periodeskjema/ulønnetPermisjon/UlønnetPermisjonSkjema';
import { Forelder } from 'common/types';
import { OmForeldre, Forelderinfo } from 'shared/types';

interface OwnProps {
    utsettelsesårsak?: Utsettelsesårsak;
    forelder: Forelder;
    omForeldre: OmForeldre;
    dropdownStyle?: DropdownFormStyle;
    disabled?: boolean;
    onChange: (utsettelsesårsak: Utsettelsesårsak) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getUtsettelsesårsakLabel = (type: Utsettelsesårsak | undefined, intl: InjectedIntl): string => {
    return getMessage(intl, `utsettelsesårsak.${type}`);
};

const getMedforelderinfo = (forelder: Forelder, omForeldre: OmForeldre): Forelderinfo | undefined => {
    if (omForeldre && omForeldre.farMedmor !== undefined) {
        return forelder === Forelder.mor ? omForeldre.farMedmor : omForeldre.mor;
    }
    return undefined;
};

const UlønnetPermisjonLabel: React.StatelessComponent<Props> = ({ utsettelsesårsak, forelder, omForeldre, intl }) => {
    const forelderInfo = getMedforelderinfo(forelder, omForeldre);
    return utsettelsesårsak && forelder && forelderInfo ? (
        <div className="ulonnetPermisjonMenyLabel">
            <div className="graderingLabel">
                <IconText
                    icon={<UlønnetPermisjonÅrsakIkon forelderinfo={forelderInfo} utsettelsesårsak={utsettelsesårsak} />}
                    layout="vertical">
                    <AriaAlternative
                        ariaText={getUtsettelsesårsakLabel(utsettelsesårsak, intl)}
                        visibleText={getMessage(intl, `utsettelsesårsak.${utsettelsesårsak}.kort`)}
                    />
                </IconText>
            </div>
        </div>
    ) : (
        <div className="ulonnetPermisjonMenyLabel">Velg utsettelse</div>
    );
};

const UlønnetPermisjonMeny: React.StatelessComponent<Props> = (props) => {
    const { intl, utsettelsesårsak, dropdownStyle = 'filled', onChange, forelder, omForeldre, disabled } = props;
    return (
        <DropdownForm
            disabled={disabled}
            onSelection={onChange}
            labelRenderer={() => <UlønnetPermisjonLabel {...props} />}
            contentClassName="ulonnetPermisjonDialog"
            contentTitle={getMessage(intl, 'periodeliste.velgUlønnetPermisjon', {
                navn: getMedforelderNavn(forelder, omForeldre)
            })}
            style={dropdownStyle}
            contentRenderer={() => (
                <DropdownFormMenu
                    options={getUlønnetPermisjonUtsettelseOptions(intl)}
                    selectedValue={utsettelsesårsak}
                    headerContent={
                        <Tittel
                            tittel={
                                <Block margin="xxs">
                                    <Element>{getMessage(intl, 'ulønnetPermisjonSkjema.velgUtsettelsesårsak')}</Element>
                                </Block>
                            }
                            info={{
                                tekst: getMessage(intl, 'ulønnetPermisjonSkjema.info.html', {
                                    lenke: Lenker.infolenkeUlønnetPermisjon
                                })
                            }}
                        />
                    }
                />
            )}
        />
    );
};

export default injectIntl(UlønnetPermisjonMeny);
