import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import AriaAlternative from 'common/components/aria/AriaAlternative';
import WorkIkon from 'common/components/ikoner/WorkIkon';
import DropdownForm, { DropdownFormStyle } from 'common/components/dropdownForm/DropdownForm';
import IconText from 'common/components/iconText/IconText';
import Block from 'common/components/block/Block';
import Varighet from '../../varighet/Varighet';

interface OwnProps {
    gradering?: number;
    uttaksdagerBrukt?: number;
    foreldernavn?: string;
    dropdownStyle?: DropdownFormStyle;
    onChange: (gradering: number | undefined) => void;
}

type Props = OwnProps & InjectedIntlProps;

const beregnGraderingUtFraArbeidsprosent = (arbeidsprosent: number | undefined): number | undefined => {
    if (arbeidsprosent !== undefined) {
        return Math.min(99, Math.max(1, 100 - arbeidsprosent));
    }
    return undefined;
};

const GraderingMeny: React.StatelessComponent<Props> = ({
    gradering,
    foreldernavn,
    uttaksdagerBrukt,
    onChange,
    dropdownStyle = 'filled'
}) => {
    const valgtGradering = gradering || 50;
    const label = `${100 - valgtGradering}%`;
    const arbeidsprosent = valgtGradering === undefined ? 100 : 100 - valgtGradering;
    return (
        <>
            <DropdownForm
                contentClassName="graderingDialog"
                dropdownPlacement="right"
                labelAlignment="center"
                style={dropdownStyle}
                labelRenderer={() => (
                    <div className="graderingLabel">
                        <IconText icon={<WorkIkon />} layout="vertical">
                            <AriaAlternative ariaText={`Jobber ${label}`} visibleText={label} />
                        </IconText>
                    </div>
                )}
                contentTitle="Velg stillingsprosent"
                contentRenderer={() => (
                    <>
                        <Block margin="xs">
                            <SkjemaNumberStepper
                                tittel={`Hvor mange prosent skal ${foreldernavn ? foreldernavn : 'du'} jobbe?`}
                                inputAriaLabel={'Prosent arbeid'}
                                min={1}
                                max={99}
                                stepSize={5}
                                value={arbeidsprosent}
                                onChange={(g) => onChange(beregnGraderingUtFraArbeidsprosent(g))}
                            />
                        </Block>
                        {uttaksdagerBrukt && (
                            <Block margin="xxs">
                                <strong>
                                    <Varighet dager={uttaksdagerBrukt} separator={' og '} />
                                </strong>{' '}
                                med foreldrepenger brukes.
                            </Block>
                        )}
                    </>
                )}
                renderCloseButton={true}
            />
        </>
    );
};

export default injectIntl(GraderingMeny);
