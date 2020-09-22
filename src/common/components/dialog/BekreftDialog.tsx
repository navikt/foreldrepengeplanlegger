import * as React from 'react';
import classnames from 'classnames';
import Modal from 'nav-frontend-modal';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { injectIntl, IntlShape } from 'react-intl';

import Knapperad from 'common/components/knapperad/Knapperad';
import { Systemtittel } from 'nav-frontend-typografi';

import './dialog.less';
import BEMHelper from 'common/util/bem';

export interface Props {
    tittel: string;
    isOpen?: boolean;
    onBekreft: () => void;
    onAvbryt: () => void;
    bekreftLabel?: string;
    avbrytLabel?: string;
    størrelse?: undefined | '30';
}

interface IntlProp {
    intl: IntlShape;
}

const bem = BEMHelper('bekreftDialog');

class BekreftDialog extends React.Component<Props & IntlProp, {}> {
    render() {
        const {
            tittel,
            onAvbryt,
            onBekreft,
            avbrytLabel,
            bekreftLabel,
            intl,
            children,
            størrelse,
            isOpen,
        } = this.props;
        return (
            <Modal
                isOpen={isOpen === true}
                contentLabel={tittel}
                onRequestClose={() => onAvbryt()}
                className={classnames(bem.block, størrelse ? bem.modifier(`size-${størrelse}`) : undefined)}>
                {this.props.isOpen && (
                    <>
                        {tittel && <Systemtittel className="blokk-s">{tittel}</Systemtittel>}
                        <div className="blokk-m">{children}</div>
                        <Knapperad>
                            <Hovedknapp onClick={() => onBekreft()} className="bekreftDialog__bekreftKnapp">
                                {bekreftLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.bekreftDialog.bekreftLabel',
                                    })}
                            </Hovedknapp>
                            <Knapp onClick={() => onAvbryt()} className="bekreftDialog__avbrytKnapp">
                                {avbrytLabel ||
                                    intl.formatMessage({
                                        id: 'komponent.bekreftDialog.avbrytLabel',
                                    })}
                            </Knapp>
                        </Knapperad>
                    </>
                )}
            </Modal>
        );
    }
}
export default injectIntl(BekreftDialog);
