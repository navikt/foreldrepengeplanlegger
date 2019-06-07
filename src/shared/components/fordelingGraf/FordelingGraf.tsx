import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import FordelingForelderInfo from './components/FordelingForelderInfo';
import AriaText from 'common/components/aria/AriaText';
import StatusIkon, { StatusIkonStatus } from 'common/components/ikoner/StatusIkon';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FordelingStatusVerdi } from 'app/utils/fordelingStatusUtils';
import { ForeldreparForelder, Forelder } from 'app/types';
import GrafAleneomsorg from './components/GrafAleneomsorg';
import GrafDeltOmsorg from './components/GrafDeltOmsorg';
import { FordelingForbrukGrafData, FordelingForbrukDeltOmsorg, FordelingForbrukIkkeDeltOmsorg } from './types';

import './fordelingGraf.less';

export const fordelingGrafBem = BEMHelper('fordelingGraf');

export interface FordelingGrafHeaderProps {
    ariaTitle: string;
    status: StatusIkonStatus;
    tittel: string;
    statusTekst: string;
}

interface Props {
    ariaTittel: string;
    status: FordelingStatusVerdi;
    tittel: string;
    statusTekst: string;
    fordeling: FordelingForbrukGrafData;
    mor?: {
        tittel: string;
        navn: string;
        ikonRef: ForeldreparForelder;
        antallDager: number;
        harForMangeDager: boolean;
    };
    farMedmor?: {
        tittel: string;
        navn: string;
        ikonRef: ForeldreparForelder;
        antallDager: number;
        harForMangeDager: boolean;
    };
}

const FordelingGraf: React.StatelessComponent<Props & InjectedIntlProps> = ({
    tittel,
    ariaTittel,
    status,
    statusTekst,
    fordeling,
    mor,
    farMedmor
}) => {
    const bemHeader = fordelingGrafBem.child('statusHeader');

    const renderGraf = () => {
        if (mor && farMedmor) {
            const data = fordeling as FordelingForbrukDeltOmsorg;
            return <GrafDeltOmsorg {...data} />;
        } else {
            const data = fordeling as FordelingForbrukIkkeDeltOmsorg;
            return <GrafAleneomsorg forelder={mor ? Forelder.mor : Forelder.farMedmor} {...data} />;
        }
        return null;
    };
    return (
        <section className={fordelingGrafBem.block}>
            <Block margin="s" screenOnly={true}>
                <div>
                    <div className={bemHeader.block}>
                        <AriaText tag="h2">{ariaTittel}</AriaText>
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
            </Block>
            {fordeling && (
                <Block margin="s" screenOnly={true}>
                    {renderGraf()}
                </Block>
            )}
            <div className={fordelingGrafBem.element('titler')}>
                {mor && (
                    <FordelingForelderInfo
                        forelderNavn={mor.navn}
                        ikonRef={mor.ikonRef}
                        tittel={mor.tittel}
                        antallDager={mor.antallDager}
                        harForMangeDager={mor.harForMangeDager}
                        highlightChanges={true}
                    />
                )}
                {farMedmor && (
                    <FordelingForelderInfo
                        forelderNavn={farMedmor.navn}
                        ikonRef={farMedmor.ikonRef}
                        tittel={farMedmor.tittel}
                        antallDager={farMedmor.antallDager}
                        harForMangeDager={farMedmor.harForMangeDager}
                        highlightChanges={true}
                        invertert={mor !== undefined}
                    />
                )}
            </div>
        </section>
    );
};

export default injectIntl(FordelingGraf);
