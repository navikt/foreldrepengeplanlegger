import * as React from 'react';

interface Props {
    color?: 'white' | 'green';
}

const colors = {
    green: '#06893a',
    white: '#ffffff'
};

const HolidayIkon: React.StatelessComponent<Props> = (props) => {
    const { color = 'green' } = props;
    return (
        <svg role="presentation" focusable="false" width={25} height={24} {...props}>
            <g stroke={colors[color]} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 17h-6c-2.451 0-4.62.789-5.99 2M18 17.017l-3.316-8.368m-2.58-6.507l-.368-.929" />
                <path
                    d="M12.105 2.14c-4.878 1.933-8.045 5.486-6.62 9.08l.367.93 2.324-.923.562-1.297 1.298.562 9.296-3.684.56-1.299 1.3.56 2.324-.921-.369-.93C21.722.624 16.982.208 12.105 2.141z"
                    fill={colors[color]}
                />
                <path d="M24 23.016c-1 0-2-.896-2-2 0 1.104-1 2-2 2s-2-.896-2-2c0 1.104-1 2-2 2s-2-.896-2-2c0 1.104-1 2-2 2s-2-.896-2-2c0 1.104-1 2-2 2s-2-.896-2-2c0 1.104-1 2-2 2s-2-.896-2-2c0 .69-.464 1.3-1 1.66" />
            </g>
        </svg>
    );
};

export default HolidayIkon;
