import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import { Stil } from 'common/components/sirkelknapp/Sirkelknapp';
import BEMHelper from 'common/utils/bem';

import './tittel.less';

export interface Props {
    tittel: string | React.ReactNode;
    info?: {
        tekst: string | React.ReactNode;
        stil?: Stil;
    };
}

const bem = BEMHelper('tekstMedInfotekst');

const Tittel: React.StatelessComponent<Props> = ({ tittel, info }) => {
    return (
        <div className={bem.block}>
            <div className={bem.element('tekst')}>{tittel}</div>
            {info && (
                <div className={bem.element('infotekst')}>
                    <Infoboks tekst={info.tekst} stil={info.stil} />
                </div>
            )}
        </div>
    );
};

export default Tittel;
