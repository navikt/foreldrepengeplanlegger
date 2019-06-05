import * as React from 'react';
import Multibar from 'shared/multibar/Multibar';
import { UttaksplanHexFarge } from 'common/util/colors';
import { fordelingGrafBem } from '../FordelingGraf';
import { Forelder } from 'shared/types';

export interface GrafAleneomsorgProps {
    forelder: Forelder;
    pstBrukt: number;
    pstForMye?: number;
}

const GrafAleneomsorg: React.StatelessComponent<GrafAleneomsorgProps> = ({ forelder, pstBrukt, pstForMye }) => {
    const childBem = fordelingGrafBem.child('graf');
    const farge = forelder === Forelder.mor ? UttaksplanHexFarge.lilla : UttaksplanHexFarge.blaa;
    return (
        <div className={childBem.block}>
            <Multibar
                borderColor={farge}
                leftBar={{
                    width: pstBrukt,
                    color: farge
                }}
                centerBar={
                    pstForMye
                        ? {
                              width: pstForMye,
                              color: UttaksplanHexFarge.rod
                          }
                        : undefined
                }
            />
        </div>
    );
};

export default GrafAleneomsorg;
