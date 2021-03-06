import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Sidebanner from './components/sidebanner/Sidebanner';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import { Route, Switch, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import UttaksplanSide from './sider/uttaksplanSide/UttaksplanSide';
import Skjemaside from './sider/velkommen/VelkommenSide';
import Block from 'common/components/block/Block';
import VelkommenTekst from './sider/velkommen/components/velkommenTekst/VelkommenTekst';
import { AppRoutes } from './routes';
import DekningsgradSide from './sider/dekningsgradSide/DekningsgradSide';

import 'common/styles/index.less';
import { injectIntl, IntlShape } from 'react-intl';
import Språkvelger from './components/språkvelger/Språkvelger';

const cls = BEMHelper('planlegger');

interface IntlProp {
    intl: IntlShape;
}

type Props = RouteComponentProps<any> & IntlProp;

class Uttaksplanlegger extends React.Component<Props> {
    render() {
        const { location, intl } = this.props;
        const path = location.pathname;
        return (
            <div className={cls.block}>
                <Språkvelger>
                    <div lang={intl.locale}>
                        <Sidebanner text="common.sidebanner" />
                        <div className={cls.element('container')}>
                            <div className={cls.element('wrapper')}>
                                <div className="no-print">
                                    <Breadcrumbs sti={path} />
                                </div>
                                <div className="content">
                                    <Block>
                                        <VelkommenTekst />
                                    </Block>
                                    <Switch>
                                        <Route
                                            exact={true}
                                            path={AppRoutes.uttaksplanside}
                                            component={UttaksplanSide}
                                        />
                                        <Route
                                            exact={true}
                                            path={AppRoutes.dekningsgradside}
                                            component={DekningsgradSide}
                                        />
                                        <Route exact={true} path={AppRoutes.startside} component={Skjemaside} />
                                        <Redirect to={AppRoutes.startside} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                </Språkvelger>
            </div>
        );
    }
}

export default withRouter(injectIntl(Uttaksplanlegger));
