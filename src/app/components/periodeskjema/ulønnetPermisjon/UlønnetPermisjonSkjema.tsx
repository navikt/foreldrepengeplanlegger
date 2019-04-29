import * as React from 'react';
import { Utsettelsesårsak, Forelder, OmForeldre } from '../../../types';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Block from 'common/components/block/Block';
import Skjemablokk from '../../skjemablokk/Skjemablokk';
import { getMedforelderNavn } from '../../../utils/common';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/utils/i18nUtils';
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage, InjectedIntl } from 'react-intl';
import Lenker from '../../../lenker';

export const getUlønnetPermisjonUtsettelseOptions = (intl: InjectedIntl): RadioOption[] => {
    return [
        {
            value: Utsettelsesårsak.ferie,
            label: getMessage(intl, `utsettelsesårsak.${Utsettelsesårsak.ferie}`)
        },
        {
            value: Utsettelsesårsak.arbeidHeltid,
            label: getMessage(intl, `utsettelsesårsak.${Utsettelsesårsak.arbeidHeltid}`)
        },
        {
            label: getMessage(intl, 'ulønnetPermisjonSkjema.alternativ.foreldrepenger'),
            value: Utsettelsesårsak.uttakForeldrepenger
        }
    ];
};

interface Props {
    utsettelsesårsak?: Utsettelsesårsak;
    forelder: Forelder;
    omForeldre: OmForeldre;
    onChange: (utsettelsesårsak: Utsettelsesårsak) => void;
}

const UlønnetPermisjonSkjema: React.StatelessComponent<Props & InjectedIntlProps> = ({
    utsettelsesårsak,
    forelder,
    omForeldre,
    onChange,
    intl
}) => (
    <div>
        <Block margin="xs">
            <Veilederinfo stil="normal" type="info">
                <FormattedHTMLMessage
                    id="ulønnetPermisjonSkjema.info.html"
                    values={{
                        lenke: Lenker.infolenkeUlønnetPermisjon
                    }}
                />
            </Veilederinfo>
        </Block>
        <Skjemablokk
            tittel={getMessage(intl, 'ulønnetPermisjonSkjema.tittel', {
                navn: getMedforelderNavn(forelder, omForeldre)
            })}>
            <RadioGroup
                name="ulønnetPermisjonUtsettelseÅrsak"
                columns={2}
                checked={utsettelsesårsak}
                options={getUlønnetPermisjonUtsettelseOptions(intl)}
                onChange={(årsak) => onChange(årsak as Utsettelsesårsak)}
            />
        </Skjemablokk>
    </div>
);

export default injectIntl(UlønnetPermisjonSkjema);
