import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/utils/bem';
import Block from 'common/components/block/Block';
import FordelingStatusHeader from './components/FordelingStatusHeader';
import GrafDeltOmsorg from './components/GrafDeltOmsorg';
import FordelingTitler from './components/FordelingTitler';
import GrafAleneomsorg from './components/GrafAleneomsorg';
import { OmForeldre, TilgjengeligeDager, Forbruk } from '../../types';
import { RegelAvvik } from 'app/utils/regler/types';
import {
    getGrafDeltOmsorgProps,
    getGrafAleneomsorgMorProps,
    getGrafAleneomsorgFarMedmorProps,
    getFordelingStatusHeaderProps
} from './fordelingGrafUtils';

import './fordelingGraf.less';

export const fordelingGrafBem = BEMHelper('fordelingGraf');

interface Props {
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    regelAvvik: RegelAvvik[];
}

const FordelingGraf: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { omForeldre, forbruk, tilgjengeligeDager, regelAvvik, intl } = props;
    const { mor, farMedmor } = forbruk;
    return (
        <section className={fordelingGrafBem.block}>
            <Block margin="s" screenOnly={true}>
                <FordelingStatusHeader {...getFordelingStatusHeaderProps(regelAvvik, forbruk, omForeldre, intl)} />
            </Block>
            <Block margin="s" screenOnly={true}>
                {omForeldre.erDeltOmsorg && forbruk.farMedmor && (
                    <GrafDeltOmsorg
                        {...getGrafDeltOmsorgProps(
                            forbruk.mor,
                            forbruk.farMedmor,
                            forbruk.dagerForeldrepengerFørFødsel,
                            forbruk.ekstradagerFørTermin,
                            tilgjengeligeDager
                        )}
                    />
                )}
                {omForeldre.bareMor && (
                    <GrafAleneomsorg
                        {...getGrafAleneomsorgMorProps(
                            forbruk.dagerTotalt,
                            forbruk.dagerForeldrepengerFørFødsel,
                            forbruk.ekstradagerFørTermin,
                            forbruk.mor,
                            tilgjengeligeDager
                        )}
                    />
                )}
                {omForeldre.bareFar && forbruk.farMedmor && (
                    <GrafAleneomsorg
                        {...getGrafAleneomsorgFarMedmorProps(
                            forbruk.dagerTotalt,
                            forbruk.farMedmor,
                            tilgjengeligeDager
                        )}
                    />
                )}
            </Block>
            <FordelingTitler
                mor={
                    !omForeldre.farMedmor && farMedmor !== undefined
                        ? {
                              navn: omForeldre.mor.navn,
                              ikonRef: omForeldre.mor.ikonRef,
                              dagerTotalt: mor.dagerTotalt,
                              dagerForLite: mor.dagerForLite,
                              dagerForMye: mor.dagerForMye
                          }
                        : undefined
                }
                farMedmor={
                    farMedmor && omForeldre.farMedmor
                        ? {
                              navn: omForeldre.farMedmor.navn,
                              ikonRef: omForeldre.farMedmor.ikonRef,
                              dagerTotalt: farMedmor.dagerTotalt,
                              dagerForLite: farMedmor.dagerForLite,
                              dagerForMye: farMedmor.dagerForMye
                          }
                        : undefined
                }
            />
        </section>
    );
};

export default injectIntl(FordelingGraf);
