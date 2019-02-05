import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import AriaAlternative from 'common/components/aria/AriaAlternative';
import WorkIkon from 'common/components/ikoner/WorkIkon';
import DropdownForm from 'common/components/dropdownForm/DropdownForm';
import IkonTekst from 'common/components/ikonTekst/IkonTekst';
import Block from 'common/components/block/Block';

interface OwnProps {
    gradering?: number;
    foreldernavn?: string;
    onChange: (gradering: number | undefined) => void;
}

type Props = OwnProps & InjectedIntlProps;

const beregnGraderingUtFraArbeidsprosent = (arbeidsprosent: number | undefined): number | undefined => {
    if (arbeidsprosent !== undefined) {
        return Math.max(0, 100 - arbeidsprosent);
    }
    return undefined;
};

const GraderingMeny: React.StatelessComponent<Props> = ({ gradering, foreldernavn, onChange }) => {
    const label = gradering === 100 || gradering === undefined ? '100%' : `${100 - gradering}%`;
    const arbeidsprosent = gradering === undefined ? 100 : 100 - gradering;
    return (
        <>
            <DropdownForm
                contentClassName="graderingDialog"
                dropdownPlacement="right"
                labelAlignment="center"
                labelRenderer={() => (
                    <div className="graderingLabel">
                        <IkonTekst ikon={<WorkIkon />} layout="vertikal">
                            <AriaAlternative ariaText={`Arbeider ${label}`} visibleText={label} />
                        </IkonTekst>
                    </div>
                )}
                contentTitle="Velg stillingsprosent"
                contentRenderer={() => (
                    <Block margin="xs">
                        <SkjemaNumberStepper
                            tittel={`Hvor mange prosent skal ${foreldernavn ? foreldernavn : 'du'} arbeide?`}
                            min={1}
                            max={100}
                            stepSize={5}
                            value={arbeidsprosent}
                            onChange={(g) => onChange(beregnGraderingUtFraArbeidsprosent(g))}
                        />
                    </Block>
                )}
            />
            {/* <DropdownButton
                dialogClassName="graderingDialog"
                label={() => (
                    <div className="graderingLabel">
                        <IkonLabel ikon={<WorkIkon />}>
                            <AriaAlternative ariaText={`Arbeider ${label}`} visibleText={label} />
                        </IkonLabel>
                    </div>
                )}>
                <div className={bem.block}>
                    <DropdownDialogTittel>Stillingsprosent</DropdownDialogTittel>
                    <SkjemaNumberStepper
                        tittel={`Velg hvor mye (i prosent) ${foreldernavn ? foreldernavn : 'du'} skal arbeide?`}
                        min={1}
                        max={100}
                        stepSize={5}
                        value={arbeidsprosent}
                        onChange={(g) => onChange(beregnGraderingUtFraArbeidsprosent(g))}
                    />
                </div>
            </DropdownButton> */}
        </>
    );
};

export default injectIntl(GraderingMeny);
