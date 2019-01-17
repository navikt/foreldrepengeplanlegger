import * as React from 'react';
import { Periode } from '../../types';
import Lukknapp from 'nav-frontend-lukknapp';
import { Tidsperioden } from '../../utils/Tidsperioden';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getPeriodeUttaksinfo } from '../../utils/periodeinfo';
import Periodeskjema from '../periodeskjema/Periodeskjema';
import BEMHelper from 'common/utils/bem';
import Block from 'common/components/block/Block';
import { Perioden } from '../../utils/Perioden';
import SkjemaNumberStepper from 'common/components/skjema/skjemaNumberStepper/SkjemaNumberStepper';

import './periodeElement.less';
import { Row, Column } from 'nav-frontend-grid';

interface OwnProps {
    periode: Periode;
    onChange: (periode: Periode) => void;
    onDelete: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const bem = BEMHelper('periodeElement');

const PeriodeElement: React.StatelessComponent<Props> = ({ periode, onDelete, onChange, intl }) => {
    const periodeinfo = getPeriodeUttaksinfo(periode);

    if (periodeinfo === undefined) {
        return <div>Ingen periodeinfo</div>;
    }

    const { uker, dager } = periodeinfo.ukerOgDager;
    return (
        <div className={bem.block}>
            <p>
                {periode.forelder} - {periode.type}
            </p>
            <p>{Tidsperioden(periode.tidsperiode).formaterStringMedDag(intl)}</p>
            {periodeinfo ? (
                <p>
                    uttaksdager: {periodeinfo.uttaksdager}, helligdager: {periodeinfo.helligdager}, dager brukt:{' '}
                    {periodeinfo.uttaksdagerBrukt}
                </p>
            ) : null}
            <div className={bem.element('delete')}>
                <Lukknapp onClick={() => onDelete(periode)}>Slett</Lukknapp>
            </div>
            <Block>
                <Row>
                    <Column xs="12" sm="4">
                        <SkjemaNumberStepper
                            legend="Uker"
                            min={0}
                            value={uker}
                            onChange={(u) => onChange(Perioden(periode).setUkerOgDager(u, dager))}
                        />
                    </Column>
                    <Column xs="12" sm="4">
                        <SkjemaNumberStepper
                            legend="Dager"
                            min={uker > 0 ? -1 : 1}
                            value={dager}
                            onChange={(d) => onChange(Perioden(periode).setUkerOgDager(uker, d))}
                        />
                    </Column>
                </Row>
            </Block>

            {1 && false && <Periodeskjema periode={periode} onCancel={() => null} onSubmit={() => null} />}
        </div>
    );
};

export default injectIntl(PeriodeElement);
