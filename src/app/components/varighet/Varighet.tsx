import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getUkerOgDagerFromDager } from 'common/utils/datoUtils';
import getMessage from 'common/utils/i18nUtils';

interface OwnProps {
    dager: number;
}

const bem = BEMHelper('varighet');

type Props = OwnProps & InjectedIntlProps;

const Varighet: React.StatelessComponent<Props> = ({ dager, intl }) => {
    const ud = getUkerOgDagerFromDager(dager);
    return (
        <div className={bem.block}>
            {ud.uker > 0 && (
                <span className={bem.element('uker')}>
                    <span className={bem.element('value')}>{ud.uker}</span>
                    <span className={bem.element('title')}>
                        {getMessage(intl, 'common.varighet.ukerTekst', { uker: ud.uker })}
                    </span>
                </span>
            )}
            {ud.uker > 0 && ud.dager > 0 && <span className={bem.element('separator')}>{', '}</span>}
            {ud.dager > 0 ||
                (ud.uker === 0 && (
                    <span className={bem.element('dager')}>
                        <span className={bem.element('value')}>{ud.dager}</span>
                        <span className={bem.element('title')}>
                            {getMessage(intl, 'common.varighet.dagerTekst', { dager: ud.dager })}
                        </span>
                    </span>
                ))}
        </div>
    );
};

export default injectIntl(Varighet);
