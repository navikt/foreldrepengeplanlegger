import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import Sidebanner from './components/sidebanner/Sidebanner';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import UttaksplanSide from './sider/UttaksplanSide';
import Skjemaside from './sider/Skjemaside';

import 'common/styles/index.less';

const cls = BEMHelper('planlegger');

type Props = RouteComponentProps<any>;

class Uttaksplanlegger extends React.Component<Props> {
    render() {
        return (
            <div className={cls.block}>
                <Sidebanner text="common.sidebanner" />
                <div className={cls.element('container')}>
                    <div className={cls.element('wrapper')}>
                        <Breadcrumbs sti={'/foreldrepengeplanlegger'} />
                        <div className="content">
                            <Switch>
                                <Route exact={true} path="/plan" component={UttaksplanSide} />
                                <Route path="/" component={Skjemaside} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Uttaksplanlegger);
