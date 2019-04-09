import * as React from 'react';

import NavDatovelger, { DatovelgerAvgrensninger } from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DatovelgerCommonProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import AriaText from 'common/components/aria/AriaText';
import moment from 'moment';
import { Avgrensninger, Tidsperiode } from 'common/types';
import './datoInput.less';
import { Feil } from 'common/components/skjema/skjemaInputElement/types';
import { dateToISOFormattedDateString } from 'common/utils/datoUtils';
import BEMHelper from 'common/utils/bem';
import { getAvgrensningerDescriptionForInput } from 'common/components/skjema/datoInput/datoInputDescription';
import SkjemaInputElement from 'common/components/skjema/skjemaInputElement/SkjemaInputElement';

interface ComponentWithAriaLabel {
    label: React.ReactNode;
    ariaLabel: string;
}

export interface DatoInputProps extends DatovelgerCommonProps {
    name: string;
    label: string | ComponentWithAriaLabel;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    visÅrVelger?: boolean;
    onChange: (dato?: Date) => void;
    datoAvgrensninger?: Avgrensninger;
}

export type Props = DatoInputProps & InjectedIntlProps;

const parseAvgrensinger = (avgrensinger: Avgrensninger): DatovelgerAvgrensninger => {
    return {
        maksDato: dateToISOFormattedDateString(avgrensinger.maksDato),
        minDato: dateToISOFormattedDateString(avgrensinger.minDato),
        helgedagerIkkeTillatt: avgrensinger.helgedagerIkkeTillatt,
        ugyldigeTidsperioder:
            avgrensinger.ugyldigeTidsperioder &&
            avgrensinger.ugyldigeTidsperioder.map((t: Tidsperiode) => ({
                fom: dateToISOFormattedDateString(t.fom)!,
                tom: dateToISOFormattedDateString(t.tom)!
            }))
    };
};

const bem = BEMHelper('datoInput');
class DatoInput extends React.Component<Props, {}> {
    render() {
        const {
            id,
            label,
            postfix,
            feil,
            intl,
            onChange,
            kalender,
            name,

            dato,
            visÅrVelger,
            datoAvgrensninger,
            ...rest
        } = this.props;
        const avgrensningerTekst = this.props.avgrensninger
            ? getAvgrensningerDescriptionForInput(intl, this.props.avgrensninger)
            : undefined;
        const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;
        const compLabel = typeof label === 'string' ? undefined : (label as ComponentWithAriaLabel);

        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={compLabel ? compLabel.ariaLabel : label}>
                <div className={bem.block}>
                    <div className={bem.element('datovelger')}>
                        <NavDatovelger.Datovelger
                            {...rest}
                            valgtDato={dato ? moment.utc(dato).format('YYYY-MM-DD') : undefined}
                            id={id ? id : name}
                            locale={intl.locale}
                            kalender={kalender}
                            visÅrVelger={visÅrVelger}
                            input={{
                                id,
                                placeholder: 'dd.mm.åååå',
                                name,
                                ariaDescribedby: ariaDescriptionId,
                                ariaLabel: compLabel ? compLabel.ariaLabel : undefined
                            }}
                            onChange={(datoString: string) => {
                                const nyDato =
                                    datoString && datoString !== 'Invalid date' ? new Date(datoString) : undefined;
                                if (dato !== nyDato) {
                                    onChange(nyDato);
                                }
                            }}
                            avgrensninger={datoAvgrensninger ? parseAvgrensinger(datoAvgrensninger) : undefined}
                        />
                        {ariaDescriptionId && (
                            <AriaText id={ariaDescriptionId} aria-role="presentation" aria-hidden="true">
                                {avgrensningerTekst}
                            </AriaText>
                        )}
                    </div>
                    {postfix ? <div className={bem.element('postfix')}>{postfix}</div> : undefined}
                </div>
            </SkjemaInputElement>
        );
    }
}

export default injectIntl(DatoInput);
