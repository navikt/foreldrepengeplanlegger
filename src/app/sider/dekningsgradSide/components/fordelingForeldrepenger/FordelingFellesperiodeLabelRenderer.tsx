import * as React from 'react';
import { RangeInputElementRendererOptions } from 'common/components/skjema/rangeInput/RangeInput';
import { FormattedMessage } from 'react-intl';

export interface Props {
    options: RangeInputElementRendererOptions;
    navnMor: string;
    navnFarMedmor: string;
    introRenderer?: () => React.ReactNode;
}

const FordelingFellesperiodeLabelRenderer: React.FunctionComponent<Props> = ({
    options,
    navnMor,
    navnFarMedmor,
    introRenderer,
}) => {
    const ukerMor = options.value || 0;
    const ukerFarMedmor = options.max - (options.value || 0);
    return (
        <div>
            {introRenderer && introRenderer()}
            <div className="skjema_fordelingFellesperiode">
                <div className="skjema_fordelingFellesperiode__mor">
                    <div className="skjema_fordelingFellesperiode__forelderNavn block--xxxs">{navnMor}</div>
                    <div className="skjema_fordelingFellesperiode__uker">
                        <FormattedMessage
                            id="skjema.fordeling.uker"
                            values={{
                                uker: ukerMor,
                            }}
                        />
                    </div>
                </div>
                <div className="skjema_fordelingFellesperiode__farMedmor">
                    <div className="skjema_fordelingFellesperiode__forelderNavn block--xxxs">{navnFarMedmor}</div>
                    <div className="skjema_fordelingFellesperiode__uker">
                        <FormattedMessage
                            id="skjema.fordeling.uker"
                            values={{
                                uker: ukerFarMedmor,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FordelingFellesperiodeLabelRenderer;
