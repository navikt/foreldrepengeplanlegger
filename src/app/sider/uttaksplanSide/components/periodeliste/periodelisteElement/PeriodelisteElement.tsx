import classNames from 'classnames';
import Block from 'common/components/block/Block';
import IkonKnapp from 'common/components/ikonKnapp/IkonKnapp';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';
import BEMHelper from 'common/util/bem';
import AlertStripe from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import * as React from 'react';
import { RegelAvvik, RegelAlvorlighet } from '../../../../../../shared/types';
import { getAlertstripeTypeFromRegelAvvik } from '../periodelisteUtils';
import RegelAvvikFeilmelding from '../../regelAvvikListe/RegelAvvikFeilmelding';
import InfoIkonFylt from 'common/components/ikoner/InfoIkonFylt';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, IntlShape } from 'react-intl';
import StatusIkon from 'common/components/ikoner/StatusIkon';

import './periodelisteElement.less';

interface OwnProps {
    menyer: PeriodeElementMeny[];
    slett?: {
        onRemove: () => void;
        ariaLabel: string;
    };
    info?: string[];
    regelAvvik?: RegelAvvik[];
}

interface State {
    infoVisible?: boolean;
    regelInfoVisible?: boolean;
}

interface PeriodeElementMeny {
    id: string;
    className?: string;
    render: () => React.ReactNode;
    isVisibleCheck?: () => boolean;
}
const bem = BEMHelper('periodelisteElement');

const PeriodeElementMenyWrapper: React.FunctionComponent<{ meny: PeriodeElementMeny }> = ({ meny }) => {
    return (
        <div className={classNames(bem.element('menyWrapper'), meny.className)} id={meny.id}>
            {meny.render()}
        </div>
    );
};

interface IntlProp {
    intl: IntlShape;
}

type Props = OwnProps & IntlProp;

class PeriodelisteElement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            infoVisible: true,
            regelInfoVisible: false,
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        if (this.props.info === undefined && nextProps.info !== undefined) {
            this.setState({ infoVisible: true });
        }
    }
    render() {
        const { menyer, slett, info, regelAvvik, intl } = this.props;
        const infoId = guid();
        const regelId = guid();
        const { regelInfoVisible, infoVisible } = this.state;
        return (
            <div className={bem.block}>
                <div className={bem.element('mainContent')}>
                    {menyer
                        .filter((meny: any) => (meny.isVisibleCheck ? meny.isVisibleCheck() : true))
                        .map((meny: any) => (
                            <PeriodeElementMenyWrapper meny={meny} key={meny.id} />
                        ))}

                    {(slett || regelAvvik) && (
                        <div className={bem.classNames(bem.element('tools'), 'no-print')}>
                            {slett && (
                                <div className={bem.element('tool')}>
                                    <SlettKnapp
                                        onClick={() => slett.onRemove()}
                                        ariaLabel={slett.ariaLabel}
                                        title={slett.ariaLabel}
                                    />
                                </div>
                            )}
                            {regelAvvik && regelAvvik.length > 0 && (
                                <div className={bem.element('tool')}>
                                    {
                                        <IkonKnapp
                                            onClick={() => this.setState({ regelInfoVisible: !regelInfoVisible })}
                                            ikon={
                                                regelAvvik[0].regel.alvorlighet === RegelAlvorlighet.FEIL ? (
                                                    <StatusIkon status="feil" />
                                                ) : (
                                                    <InfoIkonFylt />
                                                )
                                            }
                                            ariaLabel={getMessage(intl, 'periodeliste.ariatekst.periodenHarRegelAvvik')}
                                        />
                                    }
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {info && (
                    <div className={bem.element('info', infoVisible ? 'open' : undefined)} id={infoId}>
                        <Block visible={infoVisible} style="info" margin="none">
                            {info.map((i: any, idx: number) => (
                                <p key={idx} className={bem.element('infoText')}>
                                    {i}
                                </p>
                            ))}
                        </Block>
                    </div>
                )}
                {regelAvvik && regelAvvik.length > 0 && regelInfoVisible && (
                    <div className={bem.element('regelavvik', regelInfoVisible ? 'open' : undefined)} id={regelId}>
                        <Block visible={regelInfoVisible} margin="none">
                            <AlertStripe type={getAlertstripeTypeFromRegelAvvik(regelAvvik[0])}>
                                <ul className={bem.element('regelavvikListe')}>
                                    {regelAvvik.map((a: any, idx: number) => (
                                        <li className={bem.element('regelavvikListe__brudd')} key={idx}>
                                            <RegelAvvikFeilmelding info={a.info} />
                                        </li>
                                    ))}
                                </ul>
                            </AlertStripe>
                        </Block>
                    </div>
                )}
            </div>
        );
    }
}

export default injectIntl(PeriodelisteElement);
