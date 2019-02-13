import * as React from 'react';
import classnames from 'classnames';
import Modal from 'nav-frontend-modal';
import { Hovedknapp } from 'nav-frontend-knapper';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import Knapperad from 'common/components/knapperad/Knapperad';
import { Systemtittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/utils/bem';

import './dialog.less';

export interface Props {
    tittel: string;
    isOpen?: boolean;
    onOk: () => void;
    okLabel?: string;
    avbrytLabel?: string;
    størrelse?: undefined | '30';
}

const bem = BEMHelper('infoDialog');

class InfoDialog extends React.Component<Props & InjectedIntlProps, {}> {
    render() {
        const { tittel, onOk, okLabel, children, størrelse, isOpen, intl } = this.props;
        return (
            <Modal
                isOpen={isOpen === true}
                contentLabel={tittel}
                onRequestClose={() => onOk()}
                className={classnames(bem.block, størrelse ? bem.modifier(`size-${størrelse}`) : undefined)}>
                {this.props.isOpen && (
                    <>
                        {tittel && <Systemtittel className="blokk-s">{tittel}</Systemtittel>}
                        <div className="blokk-m">{children}</div>
                        <Knapperad>
                            <Hovedknapp onClick={() => onOk()}>
                                {okLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.infoDialog.okLabel'
                                    })}
                            </Hovedknapp>
                        </Knapperad>
                    </>
                )}
            </Modal>
        );
    }
}
export default injectIntl(InfoDialog);
