import * as React from 'react';
import { Utsettelsesårsak, Forelder, OmForeldre } from '../../../types';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Block from 'common/components/block/Block';
import Skjemablokk from '../../skjemablokk/Skjemablokk';
import { getMedforelderNavn } from '../../../utils/common';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/utils/i18nUtils';
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from 'react-intl';

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
                    values={{ antallForeldre: omForeldre.erDeltOmsorg ? 2 : 1 }}
                />
            </Veilederinfo>
        </Block>
        <Skjemablokk
            tittel={getMessage(intl, 'ulønnetPermisjonSkjema.tittel', {
                navn: getMedforelderNavn(forelder, omForeldre)
            })}>
            <RadioGroup
                name="ulønnetPermisjonUtsettelseÅrsak"
                checked={utsettelsesårsak}
                options={[
                    {
                        label: getMessage(intl, 'ulønnetPermisjonSkjema.alternativ.ferie'),
                        value: Utsettelsesårsak.ferie
                    },
                    {
                        label: getMessage(intl, 'ulønnetPermisjonSkjema.alternativ.arbeid'),
                        value: Utsettelsesårsak.arbeidHeltid
                    }
                ]}
                onChange={(årsak) => onChange(årsak as Utsettelsesårsak)}
            />
        </Skjemablokk>
    </div>
);

export default injectIntl(UlønnetPermisjonSkjema);
