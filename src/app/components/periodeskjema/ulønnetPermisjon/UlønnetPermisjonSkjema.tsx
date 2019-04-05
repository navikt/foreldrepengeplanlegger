import * as React from 'react';
import { Utsettelsesårsak, Forelder, OmForeldre } from '../../../types';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Block from 'common/components/block/Block';
import Skjemablokk from '../../skjemablokk/Skjemablokk';
import { getMedforelderNavn } from '../../../utils/common';
import RadioGroup from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/utils/i18nUtils';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';

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
                <FormattedMessage
                    id="ulønnetPermisjonSkjema.info"
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
                        label: 'Ferie',
                        value: Utsettelsesårsak.ferie
                    },
                    {
                        label: 'Arbeid heltid',
                        value: Utsettelsesårsak.arbeidHeltid
                    }
                ]}
                onChange={(årsak) => onChange(årsak as Utsettelsesårsak)}
            />
        </Skjemablokk>
    </div>
);

export default injectIntl(UlønnetPermisjonSkjema);
