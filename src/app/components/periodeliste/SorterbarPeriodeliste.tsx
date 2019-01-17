import * as React from 'react';
import PeriodeElement from './PeriodeElement';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';

import './periodeliste.less';
import { Periode } from '../../types/periodetyper';

type onDeleteEvent = (periode: Periode) => void;
type onUpdateEvent = (periode: Periode) => void;

interface OwnProps {
    perioder: Periode[];
    onUpdate: onUpdateEvent;
    onDelete: onDeleteEvent;
}

const SorterbarPeriode = SortableElement(
    ({ periode, onDelete, onUpdate }: { periode: Periode; onDelete: onDeleteEvent; onUpdate: onUpdateEvent }) => (
        <li className="periodeliste__periode">
            <PeriodeElement periode={periode} onDelete={onDelete} onChange={onUpdate} />
        </li>
    )
);

const SorterbarPeriodeliste = SortableContainer(({ perioder, onDelete, onUpdate }: OwnProps) => {
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

const Periodeliste: React.StatelessComponent<OwnProps> = ({ perioder, onDelete, onUpdate }) => {
    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return <SorterbarPeriodeliste perioder={perioder} onDelete={onDelete} onUpdate={onUpdate} />;
};

export default Periodeliste;
