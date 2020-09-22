import * as React from 'react';
import { RegelAvvik, RegelAlvorlighet } from '../../../../../shared/types';
import BEMHelper from 'common/util/bem';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder, { VeilederAnsiktstype } from 'common/components/veileder/Veileder';
import AlertStripe from 'nav-frontend-alertstriper';
import { trimRelaterteRegelAvvik } from '../../../../../shared/regler/regelUtils';
import AriaText from 'common/components/aria/AriaText';
import { FormattedMessage } from 'react-intl';
import RegelAvvikFeilmelding from './RegelAvvikFeilmelding';

interface Props {
    avvik: RegelAvvik[];
}

const bem = BEMHelper('regelAvvik');

const RegelAvvikListe: React.FunctionComponent<Props> = ({ avvik }) => {
    const ulovlig = trimRelaterteRegelAvvik(avvik.filter((b) => b.regel.alvorlighet === RegelAlvorlighet.FEIL));
    const viktig = trimRelaterteRegelAvvik(avvik.filter((b) => b.regel.alvorlighet === RegelAlvorlighet.ADVARSEL));
    const info = trimRelaterteRegelAvvik(avvik.filter((b) => b.regel.alvorlighet === RegelAlvorlighet.INFO));
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
                                <>
                                    <AlertStripe type="feil" form="inline" key={ulovligAvvik.id}>
                                        <RegelAvvikFeilmelding info={ulovligAvvik.info} />
                                    </AlertStripe>
                                    <br />
                                </>
                            ))}
                        </>
                    )}
                    {viktig.length > 0 && (
                        <>
                            {viktig.map((advarselAvvik) => (
                                <>
                                    <AlertStripe type="advarsel" form="inline" key={advarselAvvik.id}>
                                        <RegelAvvikFeilmelding info={advarselAvvik.info} />
                                    </AlertStripe>
                                    <br />
                                </>
                            ))}
                        </>
                    )}
                    {info.length > 0 && (
                        <>
                            {info.map((infoAvvik) => (
                                <>
                                    <AlertStripe type="info" form="inline" key={infoAvvik.id}>
                                        <RegelAvvikFeilmelding info={infoAvvik.info} />
                                    </AlertStripe>
                                    <br />
                                </>
                            ))}
                        </>
                    )}
                </div>
            </Veilederpanel>
        </div>
    );
};

export default RegelAvvikListe;
