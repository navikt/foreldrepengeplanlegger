import * as React from 'react';
import { HistoryProps } from 'common/types';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Situasjonsskjema from '../components/situasjonsskjema/Situasjonsskjema';

type Props = RouteComponentProps<any> & HistoryProps;

class Skjemaside extends React.Component<Props, {}> {
    render() {
        return (
            <>
                <Situasjonsskjema />
                <Link to="/plan">Gå til plan</Link>
            </>
        );
    }
}
export default withRouter(Skjemaside);
