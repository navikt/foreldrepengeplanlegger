import * as React from 'react';
import NavDatovelger from 'nav-datovelger';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Fieldset } from 'nav-frontend-skjema';

interface TidsperiodeChangeEvent {
    fom?: Date;
    tom?: Date;
}

interface OwnProps {
    fom: Date | undefined;
    tom: Date | undefined;
    onChange: (evt: TidsperiodeChangeEvent) => void;
    onSetVarighet?: (dager: number) => void;
}

type Props = OwnProps & InjectedIntlProps;

const TidsperiodeValg: React.StatelessComponent<Props> = ({ intl, onChange, fom, tom }) => {
    return (
        <Fieldset legend="Velg tidsperiode">
            <NavDatovelger.Periodevelger
                id="tidsperiodeFra"
                locale={intl.locale}
                startdato={fom}
                sluttdato={tom}
                kalender={{ visUkenumre: true }}
                startInputProps={{
                    id: 'tidsperiodeFraInput',
                    placeholder: 'dd.mm.åååå',
                    name
                }}
                sluttInputProps={{
                    id: 'tidsperiodeFraInput',
                    placeholder: 'dd.mm.åååå',
                    name
                }}
                onChange={(fra, til) =>
                    onChange({
                        fom: fra,
                        tom: til
                    })
                }
            />
        </Fieldset>
    );
};

export default injectIntl(TidsperiodeValg);
