import * as React from 'react';
import { useIntl } from 'react-intl';
import FordelingGraf from '../../../../../shared/components/fordelingGraf/FordelingGraf';
import { OmForeldre, Forbruk, TilgjengeligeDager, RegelAvvik } from 'shared/types';
import {
    getFordelingForbrukDeltOmsorg,
    getFordelingForbrukMor,
    getFordelingForbrukFarMedmor,
    getTittelVarighet,
} from 'app/utils/fordelingGrafUtils';
import { getFordelingStatus } from 'app/utils/fordelingStatusUtils';
import getMessage from 'common/util/i18nUtils';

interface Props {
    omForeldre: OmForeldre;
    forbruk: Forbruk;
    tilgjengeligeDager: TilgjengeligeDager;
    regelAvvik: RegelAvvik[];
}

const FordelingGrafWrapper: React.FunctionComponent<Props> = ({ omForeldre, forbruk, tilgjengeligeDager }) => {
    const intl = useIntl();
    const { mor, farMedmor } = forbruk;

    const fordelingStatus = getFordelingStatus(forbruk, omForeldre, intl);

    return (
        <FordelingGraf
            tittel={getMessage(intl, `fordeling.tittel.${omForeldre.erDeltOmsorg ? 'deres' : 'din'}`)}
            statusTekst={getMessage(intl, fordelingStatus.tittel.key, fordelingStatus.tittel.values)}
            status={fordelingStatus.status}
            fordeling={
                omForeldre.erDeltOmsorg
                    ? getFordelingForbrukDeltOmsorg(forbruk, tilgjengeligeDager)
                    : omForeldre.bareMor
                    ? getFordelingForbrukMor(forbruk.mor, tilgjengeligeDager)
                    : getFordelingForbrukFarMedmor(forbruk.farMedmor!, tilgjengeligeDager)
            }
            mor={
                omForeldre.erDeltOmsorg || (omForeldre.bareMor && mor)
                    ? {
                          antallDager: mor.dagerTotalt,
                          navn: omForeldre.mor.navn,
                          ikonRef: omForeldre.mor.ikonRef,
                          tittel: getTittelVarighet(intl, mor.dagerTotalt, mor.dagerForLite, mor.dagerForMye),
                          harForMangeDager: forbruk.mor.dagerForMye > 0,
                      }
                    : undefined
            }
            farMedmor={
                farMedmor &&
                omForeldre.farMedmor &&
                forbruk.farMedmor && {
                    antallDager: farMedmor.dagerTotalt,
                    ikonRef: omForeldre.farMedmor.ikonRef,
                    navn: omForeldre.farMedmor.navn,
                    tittel: getTittelVarighet(
                        intl,
                        farMedmor.dagerTotalt,
                        farMedmor.dagerForLite,
                        farMedmor.dagerForMye
                    ),
                    harForMangeDager: forbruk.farMedmor.dagerForMye > 0,
                }
            }
        />
    );
};

export default FordelingGrafWrapper;
