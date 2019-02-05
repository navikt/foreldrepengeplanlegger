import * as React from 'react';
import { UkerOgDager } from '../../../types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import UkerOgDagerVelger from 'common/components/ukerOgDagerVelger/UkerOgDagerVelger';
import { Tidsperiode } from 'nav-datovelger';
import Varighet from '../../varighet/Varighet';
import Block from 'common/components/block/Block';
import FomTomValg from './FomTomValg';
import { Checkbox } from 'nav-frontend-skjema';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import { formaterDato } from 'common/utils/datoUtils';

export interface VarighetChangeEvent {
    ukerOgDager: UkerOgDager;
    ingenVarighet?: boolean;
}

interface OwnProps {
    uker: number;
    dager: number;
    fom?: Date;
    tom?: Date;
    startdatoErLåst?: boolean;
    sluttdatoErLåst?: boolean;
    ingenVarighet?: boolean;
    minDager?: number;
    onTidsperiodeChange: (tidsperiode: Tidsperiode) => void;
    onVarighetChange?: (evt: VarighetChangeEvent) => void;
}

type Props = OwnProps & InjectedIntlProps;

const DatoValg: React.StatelessComponent<Props> = (props) => {
    const { fom, tom, onTidsperiodeChange, sluttdatoErLåst, startdatoErLåst, ingenVarighet } = props;
    return (
        <FomTomValg
            onChange={onTidsperiodeChange}
            fom={fom}
            tom={tom}
            låstFomDato={startdatoErLåst}
            låstTomDato={sluttdatoErLåst}
            disabled={ingenVarighet}
            footer={<Footer {...props} />}
            tomLabel={startdatoErLåst ? 'Velg sluttdato' : undefined}
            fomLabel={sluttdatoErLåst ? 'Velg startdato' : undefined}
        />
    );
};

const Footer: React.StatelessComponent<Props> = (props) => {
    const { fom } = props;
    if (!fom) {
        return null;
    }
    switch (getVariant(props)) {
        case 'låstStartdato':
            return (
                <div className="comment">
                    Perioden starter <strong>{formaterDato(fom)}</strong> (første dag etter foregående periode). For å
                    endre når denne perioden starter, må du endre sluttdato på foregående periode.
                </div>
            );

        default:
            return null;
    }
};

const VarighetValg: React.StatelessComponent<Props> = ({ uker, dager, minDager, ingenVarighet, onVarighetChange }) => {
    return onVarighetChange ? (
        <UkerOgDagerVelger
            tittel="Velg varighet"
            uker={uker}
            dager={dager}
            disabled={ingenVarighet}
            minDager={minDager}
            onChange={(ukerOgDager) => onVarighetChange({ ukerOgDager })}
        />
    ) : null;
};

const VarighetMenyInnhold: React.StatelessComponent<Props> = (props) => {
    const { uker, dager, onVarighetChange, ingenVarighet } = props;
    const variant = getVariant(props);
    if (variant === 'låstStartdato') {
        return (
            <>
                {onVarighetChange && (
                    <>
                        <Block margin="xs">
                            <VarighetValg {...props} />
                        </Block>
                        <Block margin="m">eller</Block>
                    </>
                )}
                <Block>
                    <DatoValg {...props} />
                </Block>
            </>
        );
    } else if (variant === 'kunFomTom') {
        return (
            <Block margin="xs">
                <DatoValg {...props} />
            </Block>
        );
    } else if (variant === 'foreldrepengerFørTermin') {
        return (
            <>
                <Block animated={true} visible={ingenVarighet !== true}>
                    <Block>
                        <DatoValg {...props} />
                    </Block>
                    {onVarighetChange && (
                        <>
                            <Block margin="m">eller</Block>
                            <Block margin="xs">
                                <VarighetValg {...props} />
                            </Block>
                        </>
                    )}
                </Block>
                {onVarighetChange && (
                    <Block>
                        <Checkbox
                            label="Jeg skal ikke ha uttak før termin"
                            checked={ingenVarighet === true || false}
                            onChange={(evt) =>
                                onVarighetChange({ ukerOgDager: { uker, dager }, ingenVarighet: evt.target.checked })
                            }
                        />
                    </Block>
                )}
            </>
        );
    }
    return (
        <>
            <Block margin="xs">
                <DatoValg {...props} />
            </Block>
            <Block>
                <VarighetValg {...props} />
            </Block>
        </>
    );
};

type VarighetVariant = 'foreldrepengerFørTermin' | 'låstStartdato' | 'kunFomTom';

const getVariant = (props: Props): VarighetVariant => {
    const { sluttdatoErLåst, startdatoErLåst, onVarighetChange } = props;
    if (startdatoErLåst === true && sluttdatoErLåst !== true) {
        return 'låstStartdato';
    } else if (onVarighetChange === undefined) {
        return 'kunFomTom';
    }
    return 'foreldrepengerFørTermin';
};

const getTittel = (variant: VarighetVariant): string => {
    switch (variant) {
        case 'foreldrepengerFørTermin':
            return 'Når ønsker du å starte uttaket før termin?';
        case 'kunFomTom':
            return 'Velg når perioden skal starte og slutte';
        default:
            return 'Hvor lenge skal perioden vare?';
    }
};

const VarighetMeny: React.StatelessComponent<Props> = (props) => {
    const { uker, dager, ingenVarighet } = props;
    const variant = getVariant(props);
    return (
        <>
            <DropdownForm
                labelRenderer={() => (
                    <Block align="center" margin="none">
                        <Varighet dager={ingenVarighet ? 0 : (uker * 5 + dager) | 0} />
                    </Block>
                )}
                contentClassName="varighetDialog"
                contentTitle={getTittel(variant)}
                contentRenderer={() => <VarighetMenyInnhold {...props} />}
                dropdownPlacement="right"
            />
        </>
    );
};

export default injectIntl(VarighetMeny);
