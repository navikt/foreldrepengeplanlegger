import * as React from 'react';

interface Props {
    color?: 'white' | 'green';
}

const colors = {
    green: '#06893a',
    white: '#ffffff'
};

const WorkIkon: React.StatelessComponent<Props> = (props) => {
    const { color = 'green' } = props;
    return (
        <svg width={24} height={24}>
            <title>{'Icons/work/filled/white'}</title>
            <path
                d="M20.854 2.148l-.002-.002L18.853.147A.496.496 0 0 0 18.5 0h-13a.5.5 0 0 0-.354.147l-2 1.999-.002.002A.555.555 0 0 0 3 2.5v21a.5.5 0 0 0 .5.5H10v-4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V24h6.5a.5.5 0 0 0 .5-.5v-21a.552.552 0 0 0-.146-.352zM8 17H5v-3h3v3zm0-5H5V9h3v3zm0-5H5V4h3v3zm6 10h-4v-3h4v3zm0-5h-4V9h4v3zm0-5h-4V4h4v3zm5 10h-3v-3h3v3zm0-5h-3V9h3v3zm0-5h-3V4h3v3zM4.707 2l1-1h12.586l1 1H4.707z"
                fill={colors[color]}
                fillRule="evenodd"
            />
        </svg>
    );
};

export default WorkIkon;
