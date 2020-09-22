import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import AriaAlternative from 'common/components/aria/AriaAlternative';
import WorkIkon from 'common/components/ikoner/WorkIkon';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import IconText from 'common/components/iconText/IconText';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { getVarighetString } from 'common/util/intlUtils';

interface Props {
    gradering?: number;
    uttaksdagerBrukt?: number;
    foreldernavn?: string;
    dropdownStyle?: DropdownFormStyle;
    disabled?: boolean;
    onChange: (gradering: number | undefined) => void;
}

const beregnGraderingUtFraArbeidsprosent = (arbeidsprosent: number | undefined): number | undefined => {
    if (arbeidsprosent !== undefined) {
        return Math.min(99, Math.max(1, 100 - arbeidsprosent));
    }
    return undefined;
};

const GraderingMeny: React.FunctionComponent<Props> = ({
    gradering,
    foreldernavn,
    uttaksdagerBrukt,
    onChange,
    disabled,
    dropdownStyle = 'filled',
}) => {
    const intl = useIntl();
    const valgtGradering = gradering || 50;
    const arbeidsprosent = valgtGradering === undefined ? 100 : 100 - valgtGradering;
    return (
        <>
            <DropdownForm
                disabled={disabled}
                contentClassName="graderingDialog"
                dropdownPlacement="right"
                labelAlignment="center"
                style={dropdownStyle}
                labelRenderer={() => (
                    <div className="graderingLabel">
                        <IconText icon={<WorkIkon />} layout="vertical">
                            <AriaAlternative
                                ariaText={getMessage(intl, 'periodeliste.arbeidOgUttak.ariatekst.jobber', {
                                    arbeidsprosent,
                                })}
                                visibleText={`${arbeidsprosent} %`}
                            />
                        </IconText>
                    </div>
                )}
                contentTitle={getMessage(intl, 'periodeliste.arbeidOgUttak.tittel')}
                contentRenderer={() => (
                    <>
                        <Block margin="xs">
                            <SkjemaNumberStepper
                                tittel={getMessage(intl, 'periodeliste.arbeidOgUttak.spørsmål', {
                                    navn: foreldernavn || 'du',
                                })}
                                inputAriaLabel={getMessage(intl, 'periodeliste.arbeidOgUttak.label.ariaTekst')}
                                min={1}
                                max={99}
                                stepSize={5}
                                value={arbeidsprosent}
                                onChange={(g) => onChange(beregnGraderingUtFraArbeidsprosent(g))}
                            />
                        </Block>
                        {uttaksdagerBrukt !== undefined && uttaksdagerBrukt > 0 && (
                            <Block margin="xxs">
                                <FormattedMessage
                                    id="periodeliste.arbeidOgUttak.uttaksdager"
                                    values={{
                                        dager: getVarighetString(uttaksdagerBrukt, intl),
                                        strong: (msg: any) => <strong>{msg}</strong>,
                                    }}
                                />
                            </Block>
                        )}
                    </>
                )}
                renderCloseButton={true}
            />
        </>
    );
};

export default GraderingMeny;
