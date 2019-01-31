import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import BEMHelper from 'common/utils/bem';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import ArbeidIkon from '../../periodeikon/ikoner/ArbeidIkon';
import AriaAlternative from 'common/components/aria/AriaAlternative';

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
            label={label}
            dialogClassName="graderingDialog"
            labelRenderer={() => (
                <div className="graderingLabel">
                    <div className="graderingLabel__ikon" role="presentation">
                        <ArbeidIkon title="Arbeidsikon" />
                    </div>
                    <div className="graderingLabel__label">
                        <AriaAlternative ariaText={`Arbeider ${label}`} visibleText={label} />
                    </div>
                </div>
            )}>
            <div className={bem.block}>
                <SkjemaNumberStepper
                    tittel={`Velg hvor mye skal ${foreldernavn ? foreldernavn : 'du'} arbeide (prosent)?`}
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
