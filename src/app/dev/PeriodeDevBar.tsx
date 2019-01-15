import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Periode, Uttaksperiode, Periodetype, Forelder } from '../types';
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
    addAfter(forelder: Forelder, uttaksdager: number = 10) {
        const periode: Uttaksperiode = {
            id: guid(),
            type: Periodetype.Uttak,
            fixed: false,
            forelder,
            tidsperiode: getTidsperiode(getNesteUttaksdag(this.props.perioder), uttaksdager)
        };
        this.props.onAdd(periode);
    }
    render() {
        return (
            <Panel border={true}>
                <Knapperad>
                    <Flatknapp onClick={() => this.addAfter(Forelder.forelder1, 20)}>F1</Flatknapp>
                    <Flatknapp onClick={() => this.addAfter(Forelder.forelder2, 20)}>F2</Flatknapp>
                </Knapperad>
            </Panel>
        );
    }
}
export default PeriodeDevBar;
