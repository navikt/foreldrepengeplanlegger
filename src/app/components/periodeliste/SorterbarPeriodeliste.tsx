import * as React from 'react';
import { Periode } from '../../types';
import PeriodeElement from './PeriodeElement';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';

import './periodeliste.less';

type onDeleteEvent = (periode: Periode) => void;

export interface Props {
    perioder: Periode[];
    onDelete: onDeleteEvent;
}

const SorterbarPeriode = SortableElement(({ periode, onDelete }: { periode: Periode; onDelete: onDeleteEvent }) => (
    <li className="periodeliste__periode">
        <PeriodeElement periode={periode} onDelete={onDelete} />
    </li>
));

const SorterbarPeriodeliste = SortableContainer(({ perioder, onDelete }: Props) => {
    return (
        <ol className="periodeliste">
            {perioder.map((periode: Periode, index: number) => {
                return <SorterbarPeriode key={periode.id} index={index} periode={periode} onDelete={onDelete} />;
            })}
        </ol>
    );
});

const Periodeliste: React.StatelessComponent<Props> = ({ perioder, onDelete }) => {
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return <SorterbarPeriodeliste perioder={perioder} onDelete={onDelete} />;
};

export default Periodeliste;
