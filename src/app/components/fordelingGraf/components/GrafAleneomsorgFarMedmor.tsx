import * as React from 'react';
import Multibar from 'app/components/multibar/Multibar';
import { UttaksplanHexFarge } from 'common/utils/colors';
import { fordelingGrafBem } from '../FordelingGraf';

interface Props {
    pstBrukt: number;
    pstForMye?: number;
}

const GrafAleneomsorgMor: React.StatelessComponent<Props> = ({ pstBrukt, pstForMye }) => {
    const childBem = fordelingGrafBem.child('graf');
    return (
        <div className={childBem.block}>
            <Multibar
                borderColor={UttaksplanHexFarge.lilla}
                leftBar={{
                    width: pstBrukt,
                    color: UttaksplanHexFarge.lilla
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

export default GrafAleneomsorgMor;
