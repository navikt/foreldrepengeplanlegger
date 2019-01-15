import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Periode, Periodetype, Forelder, UtsettelsesårsakType } from '../types';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Flatknapp } from 'nav-frontend-knapper';
import { Uttaksdagen } from '../utils/Uttaksdagen';
import { getTidsperiode } from '../utils/Tidsperioden';
import { guid } from 'nav-frontend-js-utils';

interface Props {
    perioder: Periode[];
    onAdd: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
    onUpdate: (periode: Periode) => void;
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
                type: Periodetype.Uttak,
                fixed: false
            });
        } else if (periodetype === Periodetype.Utsettelse) {
            this.props.onAdd({
                id,
                forelder,
                tidsperiode,
                type: Periodetype.Utsettelse,
                fixed: true,
                årsak: UtsettelsesårsakType.Ferie
            });
        }
    }
    render() {
        return (
            <Panel border={true}>
                <Knapperad>
                    <Flatknapp onClick={() => this.addAfter(Forelder.forelder1, Periodetype.Uttak, 20)}>
                        Uttak F1
                    </Flatknapp>
                    <Flatknapp onClick={() => this.addAfter(Forelder.forelder2, Periodetype.Uttak, 20)}>
                        Uttak F2
                    </Flatknapp>
                    <Flatknapp onClick={() => this.addAfter(Forelder.forelder1, Periodetype.Utsettelse, 5)}>
                        Ferie F1
                    </Flatknapp>
                    <Flatknapp onClick={() => this.addAfter(Forelder.forelder2, Periodetype.Utsettelse, 5)}>
                        Ferie F2
                    </Flatknapp>
                </Knapperad>
            </Panel>
        );
    }
}
export default PeriodeDevBar;
