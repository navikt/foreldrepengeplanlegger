import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import AriaText from 'common/components/aria/AriaText';
import StatusIkon, { StatusIkonStatus } from 'common/components/ikoner/StatusIkon';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

interface Props {
    ariaTitle: string;
    status: StatusIkonStatus;
    tittel: string;
    statusTekst: string;
}

const bem = BEMHelper('fordelingGraf');

const FordelingStatusHeader: React.StatelessComponent<Props> = ({ ariaTitle, status, tittel, statusTekst }) => {
    const bemHeader = bem.child('statusHeader');
    return (
        <div>
            <div className={bemHeader.block}>
                <AriaText tag="h2">{ariaTitle}</AriaText>
                <div className={bemHeader.element('ikon')}>
                    <StatusIkon status={status} size={32} />
                </div>
                <div className={bemHeader.element('statusBlokk')}>
                    <Normaltekst className={bemHeader.element('tittel')} tag="strong">
                        {tittel}
                    </Normaltekst>
                    <Undertittel className={bemHeader.element('statusTekst')} tag="h3">
                        {statusTekst}
                    </Undertittel>
                </div>
            </div>
        </div>
    );
};

export default FordelingStatusHeader;
