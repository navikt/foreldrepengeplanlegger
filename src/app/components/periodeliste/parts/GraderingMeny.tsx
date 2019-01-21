import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DropdownButton from 'common/components/dropdownButton/DropdownButton';

import './varighetMeny.less';
import BEMHelper from 'common/utils/bem';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';

interface OwnProps {
    gradering?: number;
    onChange: (gradering: number | undefined) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('varighetDropdown');
const GraderingMeny: React.StatelessComponent<Props> = ({ gradering, onChange, intl }) => {
    const label = gradering === 100 || gradering === undefined ? '100%' : `Gradert ${gradering}%`;
    return (
        <DropdownButton label={label} onClose={() => null}>
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
