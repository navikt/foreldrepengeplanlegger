import * as React from 'react';
import { RegelbruddFeil } from '../../utils/regler/types';

interface Props {
    feilmelding: RegelbruddFeil;
}

const RegelbruddFeilmelding: React.StatelessComponent<Props> = (props) => <div>RegelbruddFeilmelding</div>;

export default RegelbruddFeilmelding;
