import * as React from 'react';
import ForelderIkon from 'shared/components/foreldrepar/ForelderIkon';
import Personkort from 'shared/components/personkort/Personkort';
import HighlightContent from 'common/components/highlightContent/HighlightContent';
import { fordelingGrafBem } from '../FordelingGraf';
import { ForeldreparForelder } from 'shared/types';

export interface FordelingForelderInfoProps {
    tittel: string;
    forelderNavn: string;
    antallDager: number;
    harForMangeDager: boolean;
    ikonRef: ForeldreparForelder;
    invertert?: boolean;
    highlightChanges?: boolean;
}

const FordelingForelderInfo: React.StatelessComponent<FordelingForelderInfoProps> = ({
    antallDager,
    ikonRef,
    forelderNavn: navn,
    tittel,
    harForMangeDager,
    highlightChanges,
    invertert
}) => {
    const tittelBem = fordelingGrafBem.child('tittel');
    return (
        <Personkort ikon={<ForelderIkon forelder={ikonRef} />} tittel={navn} invertert={invertert}>
            <div
                className={tittelBem.classNames(
                    tittelBem.element('dager'),
                    tittelBem.modifierConditional('formangedager', harForMangeDager)
                )}>
                {highlightChanges ? (
                    <HighlightContent watchValue={antallDager} invalid={antallDager < 0}>
                        {tittel}sd
                    </HighlightContent>
                ) : (
                    { tittel }
                )}
            </div>
        </Personkort>
    );
};

export default FordelingForelderInfo;
