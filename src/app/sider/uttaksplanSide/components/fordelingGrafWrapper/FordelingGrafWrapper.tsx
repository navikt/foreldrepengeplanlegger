import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { OmForeldre, TilgjengeligeDager, Forbruk } from '../../../../types';
import { RegelAvvik } from 'shared/types';
// import {
//     getGrafDeltOmsorgProps,
//     getGrafAleneomsorgMorProps,
//     getGrafAleneomsorgFarMedmorProps
// } from '../../../../utils/fordelingGrafUtils';
import FordelingGraf from '../../../../../shared/components/fordelingGraf/FordelingGraf';
import { getGrafDeltOmsorgProps } from 'app/utils/fordelingGrafUtils';
// import { getProsentFordelingPerDel } from 'app/utils/fordelingGrafUtils';

interface Props {
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    regelAvvik: RegelAvvik[];
}

const FordelingGrafWrapper: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { omForeldre, forbruk } = props;
    const { mor, farMedmor } = forbruk;

    if (omForeldre.erDeltOmsorg && farMedmor && omForeldre.farMedmor) {
        const data = getGrafDeltOmsorgProps(
            mor,
            farMedmor,
            forbruk.dagerForeldrepengerFørFødsel,
            forbruk.ekstradagerFørTermin,
            props.tilgjengeligeDager
        );

        return (
            <FordelingGraf
                tittel="Tittel her"
                statusTekst="Tja, fungferer "
                ariaTittel="sdf"
                status="advarsel"
                morsDel={{
                    antallDager: mor.dagerTotalt,
                    navn: omForeldre.mor.navn,
                    ikonRef: omForeldre.mor.ikonRef,
                    pstBrukt: data.mor.pstBrukt,
                    pstTilgjengeligAvTotal: data.mor.pstAvTotal,
                    pstForMye: 0,
                    tittel: 'whoa'
                }}
                farMedmorsDel={{
                    antallDager: farMedmor.dagerTotalt,
                    ikonRef: omForeldre.farMedmor.ikonRef,
                    navn: omForeldre.farMedmor.navn,
                    pstBrukt: data.farMedmor.pstBrukt,
                    pstTilgjengeligAvTotal: data.farMedmor.pstAvTotal,
                    pstForMye: 0,
                    tittel: 'Neida'
                }}
                fellesdel={{
                    pstForMye: data.felles.pstForMye,
                    pstTilgjengeligAvTotal: data.felles.pstAvTotal,
                    pstBruktFar: data.felles.pstBruktFar,
                    pstBruktMor: data.felles.pstBruktMor
                }}
            />
        );
    }
    return null;
};

export default injectIntl(FordelingGrafWrapper);
