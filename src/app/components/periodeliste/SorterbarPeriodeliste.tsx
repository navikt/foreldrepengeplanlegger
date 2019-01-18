import * as React from 'react';
import PeriodeElement from './PeriodeElement';
import { SortableElement, SortableContainer, SortEnd } from 'react-sortable-hoc';

import './periodeliste.less';
import { Periode } from '../../types/periodetyper';

type onDeleteEvent = (periode: Periode) => void;
type onUpdateEvent = (periode: Periode) => void;
type onMoveEvent = (periode: Periode, toIndex: number) => void;

interface ContainerProps {
    perioder: Periode[];
    onUpdate: onUpdateEvent;
    onDelete: onDeleteEvent;
}

interface OwnProps extends ContainerProps {
    onMove: onMoveEvent;
}

const SorterbarPeriode = SortableElement(
    ({ periode, onDelete, onUpdate }: { periode: Periode; onDelete: onDeleteEvent; onUpdate: onUpdateEvent }) => (
        <li className="periodeliste__periode">
            <PeriodeElement periode={periode} onDelete={onDelete} onChange={onUpdate} />
        </li>
    )
);

const SorterbarPeriodelisteContainer = SortableContainer(({ perioder, onDelete, onUpdate }: ContainerProps) => {
    return (
        <ol className="periodeliste">
            {perioder.map((periode: Periode, index: number) => {
                return (
                    <SorterbarPeriode
                        key={periode.id}
                        index={index}
                        periode={periode}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                );
            })}
        </ol>
    );
});

const SorterbarPeriodeliste: React.StatelessComponent<OwnProps> = ({ perioder, onDelete, onUpdate, onMove }) => {
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return (
        <SorterbarPeriodelisteContainer
            useDragHandle={true}
            perioder={perioder}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onSortEnd={(sortEnd: SortEnd) => onMove(perioder[sortEnd.oldIndex], sortEnd.newIndex)}
        />
    );
};

export default SorterbarPeriodeliste;
