import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import BEMHelper from 'common/utils/bem';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import AriaAlternative from 'common/components/aria/AriaAlternative';
import DropdownDialogTittel from './DropdownDialogTittel';
import IkonLabel from './IkonLabel';
import WorkIkon from 'common/components/ikoner/WorkIkon';

interface OwnProps {
    gradering?: number;
    foreldernavn?: string;
    onChange: (gradering: number | undefined) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('graderingDropdown');

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
        <DropdownButton
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
        </DropdownButton>
    );
};

export default injectIntl(GraderingMeny);
