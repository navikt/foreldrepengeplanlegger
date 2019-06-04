import * as React from 'react';
import ForelderIkon from 'common/components/foreldrepar/ForelderIkon';
import { InjectedIntl, FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { getVarighetString } from 'common/utils/intlUtils';
import Varighet from 'app/components/varighet/Varighet';
import getMessage from 'common/utils/i18nUtils';
import Personkort from 'app/components/personkort/Personkort';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import { ForeldreparForelder } from 'app/types';
import { fordelingGrafBem } from '../FordelingGraf';

interface TittelProps {
    navn: string;
    ikon: React.ReactNode;
    dager: number;
    dagerForMye: number;
    dagerForLite: number;
    invertert?: boolean;
    intl: InjectedIntl;
}

const Tittel: React.StatelessComponent<TittelProps> = ({
    navn,
    ikon,
    dager,
    dagerForLite,
    dagerForMye,
    invertert,
    intl
}) => {
    const tittelBem = fordelingGrafBem.child('tittel');

    const getTittelVarighet = (): React.ReactNode => {
        if (dagerForLite > 0) {
            return (
                <FormattedMessage
                    id="fordeling.status.person.forLite"
                    values={{ dager: getVarighetString(dagerForLite, intl, 'full') }}
                />
            );
        }
        if (dagerForMye) {
            return (
                <FormattedMessage
                    id="fordeling.status.person.forMye"
                    values={{ dager: getVarighetString(dagerForMye, intl, 'full') }}
                />
            );
        }
        return <Varighet dager={Math.abs(dager | 0)} separator={` ${getMessage(intl, 'common.varighet.og')} `} />;
    };

    return (
        <Personkort ikon={ikon} tittel={navn} invertert={invertert}>
            <div
                className={tittelBem.classNames(
                    tittelBem.element('dager'),
                    tittelBem.modifierConditional('formangedager', dagerForMye > 0)
                )}>
                <HighlightContent watchValue={dager} invalid={dager < 0}>
                    {getTittelVarighet()}
                </HighlightContent>
            </div>
        </Personkort>
    );
};

interface Props {
    mor?: {
        navn: string;
        ikonRef: ForeldreparForelder;
        dagerTotalt: number;
        dagerForLite: number;
        dagerForMye: number;
    };
    farMedmor?: {
        navn: string;
        ikonRef: ForeldreparForelder;
        dagerTotalt: number;
        dagerForLite: number;
        dagerForMye: number;
    };
}

const FordelingTitler: React.StatelessComponent<Props & InjectedIntlProps> = ({ mor, farMedmor, intl }) => {
    return (
        <div className={fordelingGrafBem.element('titler')}>
            {mor && (
                <Tittel
                    navn={mor.navn}
                    ikon={<ForelderIkon forelder={mor.ikonRef} />}
                    dager={mor.dagerTotalt}
                    dagerForLite={mor.dagerForLite}
                    dagerForMye={mor.dagerForMye}
                    intl={intl}
                />
            )}
            {farMedmor && (
                <Tittel
                    navn={farMedmor.navn}
                    ikon={<ForelderIkon forelder={farMedmor.ikonRef} />}
                    dager={farMedmor.dagerTotalt}
                    dagerForLite={farMedmor.dagerForLite}
                    dagerForMye={farMedmor.dagerForMye}
                    invertert={!mor}
                    intl={intl}
                />
            )}
        </div>
    );
};

export default injectIntl(FordelingTitler);