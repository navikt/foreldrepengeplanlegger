import * as React from 'react';
import { RegelAvvik, RegelAlvorlighet } from '../../utils/regler/types';
import BEMHelper from 'common/utils/bem';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder, { VeilederAnsiktstype } from 'common/components/veileder/Veileder';
import { AlertStripeAdvarsel, AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { trimRelaterteRegelAvvik } from '../../utils/regler/regelUtils';
import AriaText from 'common/components/aria/AriaText';
import { FormattedMessage } from 'react-intl';
import RegelAvvikFeilmelding from './RegelAvvikFeilmelding';

interface Props {
    avvik: RegelAvvik[];
}

const bem = BEMHelper('regelAvvik');

const RegelAvvik: React.StatelessComponent<Props> = ({ avvik }) => {
    const ulovlig = trimRelaterteRegelAvvik(avvik.filter((b) => b.alvorlighet === RegelAlvorlighet.FEIL));
    const viktig = trimRelaterteRegelAvvik(avvik.filter((b) => b.alvorlighet === RegelAlvorlighet.ADVARSEL));
    const info = trimRelaterteRegelAvvik(avvik.filter((b) => b.alvorlighet === RegelAlvorlighet.INFO));
    const harFeil = ulovlig.length > 0;

    let ansikt: VeilederAnsiktstype;
    if (ulovlig.length > 0) {
        ansikt = 'skeptisk';
    } else if (viktig.length > 0) {
        ansikt = 'undrende';
    } else {
        ansikt = 'glad';
    }

    return (
        <div>
            <AriaText tag="h2">
                <FormattedMessage id="regelAvvik.ariaTittel" />
            </AriaText>
            <Veilederpanel
                kompakt={true}
                fargetema={harFeil ? 'feilmelding' : 'normal'}
                svg={<Veileder farge="transparent" stil="iNavVeilederPanel" ansikt={ansikt} />}
                type="plakat">
                <div className={bem.block}>
                    {ulovlig.length > 0 && (
                        <>
                            {ulovlig.map((ulovligAvvik) => (
                                <AlertStripeFeil key={ulovligAvvik.key} className={'alertstripe--noBorder'}>
                                    <RegelAvvikFeilmelding info={ulovligAvvik.info} />
                                </AlertStripeFeil>
                            ))}
                        </>
                    )}
                    {viktig.length > 0 && (
                        <>
                            {viktig.map((advarselAvvik) => (
                                <AlertStripeAdvarsel key={advarselAvvik.key} className={'alertstripe--noBorder'}>
                                    <RegelAvvikFeilmelding info={advarselAvvik.info} />
                                </AlertStripeAdvarsel>
                            ))}
                        </>
                    )}
                    {info.length > 0 && (
                        <>
                            {info.map((infoAvvik) => (
                                <AlertStripeInfo key={infoAvvik.key} className={'alertstripe--noBorder'}>
                                    <RegelAvvikFeilmelding info={infoAvvik.info} />
                                </AlertStripeInfo>
                            ))}
                        </>
                    )}
                </div>
            </Veilederpanel>
        </div>
    );
};

export default RegelAvvik;