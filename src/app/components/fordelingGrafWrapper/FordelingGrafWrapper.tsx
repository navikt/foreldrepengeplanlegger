import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { OmForeldre, TilgjengeligeDager, Forbruk } from '../../types';
import { RegelAvvik } from 'shared/types/regelTypes';
import {
    getGrafDeltOmsorgProps,
    getGrafAleneomsorgMorProps,
    getGrafAleneomsorgFarMedmorProps,
    getFordelingStatusHeaderProps,
    getGrafFordelingTitler
} from '../../../shared/fordelingGraf/fordelingGrafUtils';
import FordelingGraf from '../../../shared/fordelingGraf/FordelingGraf';

interface Props {
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    regelAvvik: RegelAvvik[];
}

const FordelingGrafWrapper: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { omForeldre, forbruk, tilgjengeligeDager, regelAvvik, intl } = props;
    const { mor, farMedmor } = forbruk;
    return (
        <FordelingGraf
            headerProps={getFordelingStatusHeaderProps(regelAvvik, forbruk, omForeldre, intl)}
            deltOmsorgProps={
                omForeldre.erDeltOmsorg && forbruk.farMedmor
                    ? getGrafDeltOmsorgProps(
                          forbruk.mor,
                          forbruk.farMedmor,
                          forbruk.dagerForeldrepengerFørFødsel,
                          forbruk.ekstradagerFørTermin,
                          tilgjengeligeDager
                      )
                    : undefined
            }
            omsorgMorProps={
                omForeldre.bareMor
                    ? getGrafAleneomsorgMorProps(
                          forbruk.dagerTotalt,
                          forbruk.dagerForeldrepengerFørFødsel,
                          forbruk.ekstradagerFørTermin,
                          forbruk.mor,
                          tilgjengeligeDager
                      )
                    : undefined
            }
            omsorgFarMedmorProps={
                omForeldre.bareFar && forbruk.farMedmor
                    ? getGrafAleneomsorgFarMedmorProps(forbruk.dagerTotalt, forbruk.farMedmor, tilgjengeligeDager)
                    : undefined
            }
            titlerProps={getGrafFordelingTitler(omForeldre, mor, farMedmor)}
        />
    );
};

export default injectIntl(FordelingGrafWrapper);
