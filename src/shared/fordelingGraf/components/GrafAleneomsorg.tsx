import * as React from 'react';
import Multibar from 'app/components/multibar/Multibar';
import { UttaksplanHexFarge } from 'common/util/colors';
import { Forelder } from 'app/types';
import { fordelingGrafBem } from '../FordelingGraf';

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
