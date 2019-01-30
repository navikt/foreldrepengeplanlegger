import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';
import BEMHelper from 'common/utils/bem';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';
import ArbeidIkon from '../../periodeikon/ikoner/ArbeidIkon';
import AriaAlternative from 'common/components/aria/AriaAlternative';
import './varighetMeny.less';

interface OwnProps {
    gradering?: number;
    onChange: (gradering: number | undefined) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('varighetDropdown');
const GraderingMeny: React.StatelessComponent<Props> = ({ gradering, onChange, intl }) => {
    const label = gradering === 100 || gradering === undefined ? '100%' : `${100 - gradering}%`;
    return (
        <DropdownButton
            label={label}
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
                    tittel="Velg hvor mye foreldrepenger du skal ta ut"
                    min={1}
                    max={100}
                    stepSize={5}
                    value={gradering}
                    onChange={(g) => onChange(g)}
                />
            </div>
        </DropdownButton>
    );
};

export default injectIntl(GraderingMeny);
