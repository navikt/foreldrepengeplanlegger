import * as React from 'react';
import { Utsettelsesårsak } from '../../../../../types';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Block from 'common/components/block/Block';
import Skjemablokk from '../../../../../components/skjemablokk/Skjemablokk';
import { getMedforelderNavn } from '../../../../../utils/common';
import RadioGroup, { RadioOption } from 'common/components/skjema/radioGroup/RadioGroup';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Lenker from '../../../../../lenker';
import { Forelder } from 'common/types';
import { OmForeldre } from 'shared/types';

export const getUlønnetPermisjonUtsettelseOptions = (intl: IntlShape): RadioOption[] => {
    return [
        {
            value: Utsettelsesårsak.ferie,
            label: getMessage(intl, `utsettelsesårsak.${Utsettelsesårsak.ferie}`),
        },
        {
            value: Utsettelsesårsak.arbeidHeltid,
            label: getMessage(intl, `utsettelsesårsak.${Utsettelsesårsak.arbeidHeltid}`),
        },
        {
            label: getMessage(intl, 'ulønnetPermisjonSkjema.alternativ.foreldrepenger'),
            value: Utsettelsesårsak.uttakForeldrepenger,
        },
    ];
};

interface Props {
    utsettelsesårsak?: Utsettelsesårsak;
    forelder: Forelder;
    omForeldre: OmForeldre;
    onChange: (utsettelsesårsak: Utsettelsesårsak) => void;
}

const UlønnetPermisjonSkjema: React.FunctionComponent<Props> = ({
    utsettelsesårsak,
    forelder,
    omForeldre,
    onChange,
}) => {
    const intl = useIntl();

    return (
        <div>
            <Block margin="xs">
                <Veilederinfo stil="normal" type="info">
                    <FormattedMessage
                        id="ulønnetPermisjonSkjema.info.html"
                        values={{
                            a: (msg: any) => (
                                <a
                                    href={Lenker.infolenkeUlønnetPermisjon}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="lenke">
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                </Veilederinfo>
            </Block>
            <Skjemablokk
                tittel={getMessage(intl, 'ulønnetPermisjonSkjema.tittel', {
                    navn: getMedforelderNavn(forelder, omForeldre),
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
};

export default UlønnetPermisjonSkjema;
