import * as React from 'react';
import { Regelbrudd, RegelAlvorlighet } from '../../utils/regler/types';
import BEMHelper from 'common/utils/bem';
import RegelbruddFeilmelding from './RegelbruddFeilmelding';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder, { VeilederAnsiktstype } from 'common/components/veileder/Veileder';
import { AlertStripeAdvarsel, AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { trimRelaterteRegelbrudd } from '../../utils/regler/regelUtils';

interface Props {
    regelbrudd: Regelbrudd[];
}

const bem = BEMHelper('regelbrudd');

const Regelbrudd: React.StatelessComponent<Props> = ({ regelbrudd }) => {
    const ulovlig = trimRelaterteRegelbrudd(regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.ULOVLIG));
    const viktig = trimRelaterteRegelbrudd(regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.VIKTIG));
    const info = trimRelaterteRegelbrudd(regelbrudd.filter((b) => b.alvorlighet === RegelAlvorlighet.INFO));
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
        <Veilederpanel
            kompakt={true}
            fargetema={harFeil ? 'feilmelding' : 'normal'}
            svg={<Veileder farge="transparent" stil="iNavVeilederPanel" ansikt={ansikt} />}
            type="plakat">
            <section className={bem.block}>
                {ulovlig.length > 0 && (
                    <>
                        {ulovlig.map((brudd) => (
                            <AlertStripeFeil key={brudd.key} className={'alertstripe--noBorder'}>
                                <RegelbruddFeilmelding feilmelding={brudd.feilmelding} />
                            </AlertStripeFeil>
                        ))}
                    </>
                )}
                {viktig.length > 0 && (
                    <>
                        {viktig.map((brudd) => (
                            <AlertStripeAdvarsel key={brudd.key} className={'alertstripe--noBorder'}>
                                <RegelbruddFeilmelding feilmelding={brudd.feilmelding} />
                            </AlertStripeAdvarsel>
                        ))}
                    </>
                )}
                {info.length > 0 && (
                    <>
                        {info.map((brudd) => (
                            <AlertStripeInfo key={brudd.key} className={'alertstripe--noBorder'}>
                                <RegelbruddFeilmelding feilmelding={brudd.feilmelding} />
                            </AlertStripeInfo>
                        ))}
                    </>
                )}
            </section>
        </Veilederpanel>
    );
};

export default Regelbrudd;
