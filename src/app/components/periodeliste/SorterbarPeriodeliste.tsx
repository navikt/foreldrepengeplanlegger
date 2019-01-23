import * as React from 'react';
import PeriodeElement from './PeriodeElement';
import { SortableElement, SortableContainer, SortEnd } from 'react-sortable-hoc';
import { Periode } from '../../types/periodetyper';
import { PeriodelisteProps, PeriodelisteElementProps } from './types';

import './periodeliste.less';
import { Undertittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';

const ElementWrapper = SortableElement((props: PeriodelisteElementProps) => (
    <li className="periodeliste__periode">
        <PeriodeElement {...props} />
    </li>
));

const ListContainer = SortableContainer((props: PeriodelisteProps) => {
    return (
        <ol className="periodeliste">
            {props.perioder.map((periode: Periode, index: number) => {
                return <ElementWrapper key={periode.id} index={index} {...props} periode={periode} />;
            })}
        </ol>
    );
});

const SorterbarPeriodeliste: React.StatelessComponent<PeriodelisteProps> = (props) => {
    const { perioder, onMove } = props;

    if (perioder.length === 0) {
        return <div>Ingen perioder registrert</div>;
    }
    return (
        <section>
            <Block margin="s">
                <Undertittel tag="h1">Perioder</Undertittel>
            </Block>
            <ListContainer
                {...props}
                useDragHandle={true}
                onSortEnd={
                    onMove ? (sortEnd: SortEnd) => onMove(perioder[sortEnd.oldIndex], sortEnd.newIndex) : undefined
                }
            />
        </section>
    );
};

export default SorterbarPeriodeliste;
