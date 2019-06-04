import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Tabs from 'nav-frontend-tabs';

import './tabPanel.less';

interface TabPanelContent {
    label: string;
    contentRenderer: () => React.ReactNode;
}

interface Props {
    tabs: TabPanelContent[];
}

interface State {
    activePanelIndex: number;
}

const bem = BEMHelper('tabPanel');

class TabPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            activePanelIndex: 0
        };
    }
    render() {
        const { tabs } = this.props;
        const { activePanelIndex = 0 } = this.state;
        const activePanelRenderer = tabs[activePanelIndex].contentRenderer;
        return (
            <div className={bem.block}>
                <div className={bem.element('tabs')}>
                    <Tabs
                        defaultAktiv={activePanelIndex}
                        tabs={tabs.map((tab) => ({
                            label: tab.label
                        }))}
                        onChange={(evt, index: number) => {
                            this.setState({
                                activePanelIndex: index
                            });
                        }}
                    />
                </div>
                <div className={bem.element('panels')}>{activePanelRenderer()}</div>
            </div>
        );
    }
}
export default TabPanel;
