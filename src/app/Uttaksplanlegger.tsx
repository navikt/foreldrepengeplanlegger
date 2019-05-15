import * as React from 'react';
import BEMHelper from 'common/utils/bem';
import Sidebanner from './components/sidebanner/Sidebanner';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import { Route, Switch, RouteComponentProps, withRouter, Redirect } from 'react-router-dom';
import UttaksplanSide from './sider/UttaksplanSide';
import Skjemaside from './sider/Skjemaside';
import Block from 'common/components/block/Block';
import VelkommenTekst from './components/content/VelkommenTekst';
import { AppRoutes } from './routes';
import DekningsgradSide from './sider/DekningsgradSide';

import 'common/styles/index.less';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Språkvelger from './components/språkvelger/Språkvelger';

const cls = BEMHelper('planlegger');

type Props = RouteComponentProps<any> & InjectedIntlProps;

class Uttaksplanlegger extends React.Component<Props> {
    render() {
        const { intl } = this.props;
        return (
            <div className={cls.block}>
                <Språkvelger>
                    <div lang={intl.locale}>
                        <Sidebanner text="common.sidebanner" />
                        <div className={cls.element('container')}>
                            <div className={cls.element('wrapper')}>
                                <Breadcrumbs sti={'/foreldrepengeplanlegger'} />
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
