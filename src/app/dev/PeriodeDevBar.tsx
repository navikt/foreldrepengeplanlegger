import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Periode, Periodetype, Forelder } from '../types';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Flatknapp } from 'nav-frontend-knapper';
import { Uttaksdagen } from '../utils/Uttaksdagen';
import { getTidsperiode } from '../utils/Tidsperioden';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    perioder: Periode[];
    onAdd: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
    onChange: (periode: Periode) => void;
    onResetApp: () => void;
}

const defaultDag = new Date(2019, 0, 14);

const getNesteUttaksdag = (perioder: Periode[]) => {
    if (perioder.length > 0) {
        return Uttaksdagen(perioder[perioder.length - 1].tidsperiode.tom).neste();
    }
    return defaultDag;
};

class PeriodeDevBar extends React.Component<Props, {}> {
    addAfter(forelder: Forelder, periodetype: Periodetype, varighet: number = 10) {
        const id = guid();
        const tidsperiode = getTidsperiode(getNesteUttaksdag(this.props.perioder), varighet);
        if (periodetype === Periodetype.Uttak) {
            this.props.onAdd({
                id,
                forelder,
                tidsperiode,
                type: Periodetype.Uttak
            });
        } else if (periodetype === Periodetype.Ferie) {
            this.props.onAdd({
                id,
                forelder,
                tidsperiode,
                type: Periodetype.Ferie
            });
        }
    }
    render() {
        return (
            <div className="dev">
                <Panel border={true}>
                    <Knapperad>
                        <Flatknapp onClick={() => this.addAfter(Forelder.farMedmor, Periodetype.Uttak, 20)}>
                            Uttak F1
                        </Flatknapp>
                        <Flatknapp onClick={() => this.addAfter(Forelder.mor, Periodetype.Uttak, 20)}>
                            Uttak F2
                        </Flatknapp>
                        <Flatknapp onClick={() => this.addAfter(Forelder.farMedmor, Periodetype.Ferie, 5)}>
                            Ferie F1
                        </Flatknapp>
                        <Flatknapp onClick={() => this.addAfter(Forelder.mor, Periodetype.Ferie, 5)}>
                            Ferie F2
                        </Flatknapp>
                        <Flatknapp onClick={this.props.onResetApp}>Reset</Flatknapp>
                    </Knapperad>
                </Panel>
            </div>
        );
    }
}
export default PeriodeDevBar;
