import * as React from 'react';

interface Props {
    flip?: boolean;
}

const UndoIkon: React.FunctionComponent<Props> = (props) => {
    const { flip, ...rest } = props;
    return (
        <svg
            role="presentation"
            focusable="false"
            width={17}
            height={15}
            {...rest}
            style={flip ? { transform: 'scaleX(-1)' } : undefined}>
            <g stroke="#0067C5" fill="none" fillRule="evenodd">
                <path d="M8.216 14h3.637C14.143 14 16 11.985 16 9.5S14.143 5 11.853 5H1.627" />
                <path strokeLinecap="square" d="M5.243 9.334L1.16 5.098 5.243.848" />
            </g>
        </svg>
    );
};

export default UndoIkon;
