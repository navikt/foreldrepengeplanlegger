import React from 'react';

export interface OwnProps {
    status: 'advarsel' | 'feil' | 'ok';
    title?: string;
    size?: number;
}

type Props = OwnProps;

const FeilSirkelFyll: React.StatelessComponent<Props> = (props) => {
    return (
        <svg viewBox="0 0 24 24" width={props.size} height={props.size}>
            {props.title && <title>{props.title}</title>}
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-16.000000, -20.000000)">
                    <g transform="translate(16.000000, 20.000000)">
                        <g stroke-width="1" fill-rule="evenodd" fill="#A13A28">
                            <path
                                d="M11.9989565,0 C5.39478261,0 0.0125217391,5.37182609 8.24610291e-16,11.976 C-0.00626086957,15.1815652 1.23547826,18.1972174 3.49773913,20.4688696 C5.76,22.7394783 8.77147826,23.9937391 11.9770435,24 L12,24 C18.6031304,24 23.9864348,18.6271304 24,12.021913 C24.0125217,5.40626087 18.6396522,0.0125217391 11.9989565,0 Z"
                                fill-rule="nonzero"
                            />
                        </g>
                        <path
                            d="M12,10.6512393 L15.3719018,7.27933749 C15.7443518,6.9068875 16.3482125,6.9068875 16.7206625,7.27933749 C17.0931125,7.65178748 17.0931125,8.25564822 16.7206625,8.62809821 L13.3487607,12 L16.7206625,15.3719018 C17.0931125,15.7443518 17.0931125,16.3482125 16.7206625,16.7206625 C16.3482125,17.0931125 15.7443518,17.0931125 15.3719018,16.7206625 L12,13.3487607 L8.62809821,16.7206625 C8.25564822,17.0931125 7.65178748,17.0931125 7.27933749,16.7206625 C6.9068875,16.3482125 6.9068875,15.7443518 7.27933749,15.3719018 L10.6512393,12 L7.27933749,8.62809821 C6.9068875,8.25564822 6.9068875,7.65178748 7.27933749,7.27933749 C7.65178748,6.9068875 8.25564822,6.9068875 8.62809821,7.27933749 L12,10.6512393 Z"
                            fill="#FFFFFF"
                            fill-rule="nonzero"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

const InfoSirkelFyll: React.StatelessComponent<Props> = (props) => {
    return (
        <svg viewBox="0 0 24 24" width={props.size} height={props.size}>
            {props.title && <title>{props.title}</title>}
            <g fill="none" fillRule="evenodd">
                <path
                    d="M12.205-.004l-.214.002a12.225 12.225 0 0 0-8.517 3.659C1.179 5.977-.053 9.013.002 12.208c.115 6.613 5.296 11.793 11.795 11.793l.212-.002c6.726-.116 12.105-5.595 11.99-12.21C23.883 5.178 18.702-.003 12.204-.003z"
                    fill="#FFA733"
                    fillRule="nonzero"
                />
                <path d="M12.027 19H12A1.499 1.499 0 0 1 11.973 16L12 16a1.501 1.501 0 0 1 .027 3z" fill="#3E3832" />
                <path d="M12 5a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1z" fill="#3E3832" fillRule="nonzero" />
            </g>
        </svg>
    );
};

const OkSirkelFyll: React.StatelessComponent<Props> = (props) => {
    return (
        <svg viewBox="0 0 24 24" width={props.size} height={props.size}>
            {props.title && <title>{props.title}</title>}
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-16.000000, -20.000000)">
                    <g transform="translate(16.000000, 20.000000)">
                        <g>
                            <path
                                d="M12,0 C5.383,0 0,5.384 0,12 C0,18.616 5.383,24 12,24 C18.616,24 24,18.616 24,12 C24,5.384 18.616,0 12,0 Z"
                                fill="#1C6937"
                                fill-rule="nonzero"
                            />
                            <path
                                d="M9.63993168,14.4414307 L16.0998211,8.60231554 C16.4920344,8.24700834 17.1087604,8.26567481 17.4763929,8.64623502 C17.8442028,9.02697893 17.8231421,9.62435747 17.430152,9.98049024 L10.2805711,16.4435337 C10.0985537,16.6069711 9.8612111,16.6956522 9.61751913,16.6956522 C9.36153632,16.6956522 9.11545171,16.5990262 8.92853154,16.419824 L6.54589388,14.1121315 C6.16586146,13.7440529 6.16586146,13.1465019 6.54589388,12.7784232 C6.92592631,12.4103446 7.54288359,12.4103446 7.92291602,12.7784232 L9.63993168,14.4414307 Z"
                                fill="#FFFFFF"
                                fill-rule="nonzero"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

const StatusIkon = (props: Props) => {
    const { size = 24 } = props;
    switch (props.status) {
        case 'ok':
            return <OkSirkelFyll {...props} size={size} />;
        case 'feil':
            return <FeilSirkelFyll {...props} size={size} />;
        case 'advarsel':
            return <InfoSirkelFyll {...props} size={size} />;
    }
};

export default StatusIkon;
