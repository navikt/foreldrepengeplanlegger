import * as React from 'react';

interface Props {
    title: string;
    size: number;
    color?: 'white' | 'blue';
}

export default class PinIkon extends React.Component<Props> {
    render() {
        const { title, size = 24, color = 'white' } = this.props;

        return (
            <svg width={size} height={size} viewBox={`0 0 24 24`}>
                <title>{title}</title>
                <defs>
                    <path
                        d="M.146 23.855a.5.5 0 0 0 .707 0L9.5 15.207l4.146 4.146a.5.5 0 0 0 .708.002l1.5-1.5A.502.502 0 0 0 16 17.5v-3.793l4.5-4.5.646.646a.5.5 0 0 0 .707 0l2-2a.502.502 0 0 0 0-.707l-7-7a.502.502 0 0 0-.707 0l-2 2a.502.502 0 0 0 0 .708l.647.647-4.5 4.5H6.5a.505.505 0 0 0-.354.146l-1.5 1.5a.502.502 0 0 0 0 .707l4.147 4.147-8.646 8.646a.5.5 0 0 0 0 .708z"
                        id="pinPath"
                    />
                </defs>
                {color === 'white' ? (
                    <use fill="#ffffff" fillRule="nonzero" xlinkHref="#pinPath" />
                ) : (
                    // stroke="#b7b1a9" strokeWidth="1"
                    <use fill="#0067C5" fillRule="nonzero" xlinkHref="#pinPath" />
                )}
            </svg>
        );
    }
}
