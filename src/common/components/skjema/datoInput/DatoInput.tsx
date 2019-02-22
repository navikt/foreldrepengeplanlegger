import * as React from 'react';
import moment from 'moment';
import SkjemaInputElement from '../skjemaInputElement/SkjemaInputElement';
import { Feil } from '../skjemaInputElement/types';
import NavDatovelger from 'nav-datovelger';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { DatovelgerCommonProps } from 'nav-datovelger/dist/datovelger/Datovelger';
import AriaText from 'common/components/aria/AriaText';
import BEMHelper from 'common/utils/bem';
import { getAvgrensningerDescriptionForInput } from './datoInputDescription';

import './datoInput.less';
import FocusContainer from 'common/components/focusContainer/FocusContainer';

export interface DatoInputProps extends DatovelgerCommonProps {
    name: string;
    label: React.ReactNode;
    dato?: Date;
    postfix?: string;
    feil?: Feil;
    visÅrValger?: boolean;
    onChange: (dato?: Date) => void;
    onDisabledClick?: () => void;
}

export type Props = DatoInputProps & InjectedIntlProps;

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
            visÅrValger,
            onDisabledClick,
            ...rest
        } = this.props;
        const avgrensningerTekst = this.props.avgrensninger
            ? getAvgrensningerDescriptionForInput(intl, this.props.avgrensninger)
            : undefined;
        const ariaDescriptionId = avgrensningerTekst ? `${id}_ariaDesc` : undefined;

        return (
            <SkjemaInputElement id={this.props.id} feil={feil} label={label}>
                <div className={bem.block}>
                    <div className={bem.element('datovelger')}>
                        <FocusContainer
                            onClick={onDisabledClick ? () => onDisabledClick() : undefined}
                            active={rest.disabled === true}>
                            <NavDatovelger.Datovelger
                                {...rest}
                                id={id ? id : name}
                                locale={intl.locale}
                                kalender={kalender}
                                visÅrVelger={visÅrValger}
                                input={{
                                    id,
                                    placeholder: 'dd.mm.åååå',
                                    name,
                                    ariaDescribedby: ariaDescriptionId
                                }}
                                onChange={(dato) => {
                                    if (moment(dato).isSame(this.props.dato, 'day')) {
                                        return;
                                    }
                                    onChange(dato ? dato : undefined);
                                }}
                            />
                        </FocusContainer>
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
