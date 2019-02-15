import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import Sidebanner from './components/sidebanner/Sidebanner';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import { Route, Switch, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import UttaksplanSide from './sider/UttaksplanSide';
import Skjemaside from './sider/Skjemaside';
import Block from 'common/components/block/Block';
import VelkommenTekst from './components/content/VelkommenTekst';
import { Pages } from './routes';

import 'common/styles/index.less';
import DevSide from './sider/DevSide';

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
                            <Block>
                                <VelkommenTekst />
                            </Block>
                            <Switch>
                                <Route exact={true} path={Pages.planPage} component={UttaksplanSide} />
                                <Route exact={true} path={Pages.startPage} component={Skjemaside} />
                                <Route exact={true} path={Pages.dev} component={DevSide} />
                                <Redirect to={Pages.startPage} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Uttaksplanlegger);
