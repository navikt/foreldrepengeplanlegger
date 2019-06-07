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

import './fordelingGraf.less';
import GrafAleneomsorg from './components/GrafAleneomsorg';
import GrafDeltOmsorg from './components/GrafDeltOmsorg';

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
    morsDel?: {
        tittel: string;
        navn: string;
        ikonRef: ForeldreparForelder;
        pstTilgjengeligAvTotal: number;
        pstBrukt: number;
        pstForMye: number;
        antallDager: number;
    };
    farMedmorsDel?: {
        tittel: string;
        navn: string;
        ikonRef: ForeldreparForelder;
        pstTilgjengeligAvTotal: number;
        pstBrukt: number;
        pstForMye: number;
        antallDager: number;
    };
    fellesdel?: {
        pstTilgjengeligAvTotal: number;
        pstBruktFar: number;
        pstBruktMor: number;
        pstForMye: number;
    };
}

const FordelingGraf: React.StatelessComponent<Props & InjectedIntlProps> = ({
    tittel,
    ariaTittel,
    status,
    statusTekst,
    morsDel,
    farMedmorsDel,
    fellesdel
}) => {
    const bemHeader = fordelingGrafBem.child('statusHeader');

    const renderGraf = () => {
        if (morsDel && farMedmorsDel && fellesdel) {
            return (
                <GrafDeltOmsorg
                    farMedmor={{
                        pstAvTotal: farMedmorsDel.pstTilgjengeligAvTotal,
                        pstBrukt: farMedmorsDel.pstBrukt
                    }}
                    mor={{
                        pstAvTotal: morsDel.pstTilgjengeligAvTotal,
                        pstBrukt: morsDel.pstBrukt
                    }}
                    felles={{
                        pstAvTotal: fellesdel.pstTilgjengeligAvTotal,
                        pstBruktFar: fellesdel.pstBruktFar,
                        pstBruktMor: fellesdel.pstBruktMor,
                        pstForMye: fellesdel.pstForMye
                    }}
                />
            );
        }
        if (morsDel && !farMedmorsDel) {
            return (
                <GrafAleneomsorg forelder={Forelder.mor} pstBrukt={morsDel.pstBrukt} pstForMye={morsDel.pstForMye} />
            );
        }
        if (farMedmorsDel && !morsDel) {
            return (
                <GrafAleneomsorg
                    forelder={Forelder.farMedmor}
                    pstBrukt={farMedmorsDel.pstBrukt}
                    pstForMye={farMedmorsDel.pstForMye}
                />
            );
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
            {(morsDel || farMedmorsDel) && (
                <Block margin="s" screenOnly={true}>
                    {renderGraf()}
                </Block>
            )}
            <div className={fordelingGrafBem.element('titler')}>
                {morsDel && (
                    <FordelingForelderInfo
                        antallDager={morsDel.antallDager}
                        forelderNavn={morsDel.navn}
                        harForMangeDager={morsDel.pstForMye > 0}
                        highlightChanges={true}
                        ikonRef={morsDel.ikonRef}
                        tittel={morsDel.tittel}
                    />
                )}
                {farMedmorsDel && (
                    <FordelingForelderInfo
                        antallDager={farMedmorsDel.antallDager}
                        forelderNavn={farMedmorsDel.navn}
                        harForMangeDager={farMedmorsDel.pstForMye > 0}
                        highlightChanges={true}
                        ikonRef={farMedmorsDel.ikonRef}
                        tittel={farMedmorsDel.tittel}
                        invertert={morsDel !== undefined}
                    />
                )}
            </div>
        </section>
    );
};

export default injectIntl(FordelingGraf);
