import * as React from 'react';

interface Props {}

const IntroSirkelSvg: React.StatelessComponent<Props> = (props) => (
    <svg width={100} height={100} {...props}>
        <g fill="none" fillRule="evenodd">
            <circle fill="#C1B5D0" cx={50} cy={50} r={50} />
            <path d="M80 68.75a7.5 7.5 0 0 1-7.5 7.5h-45a7.5 7.5 0 0 1-7.5-7.5V32.5h60v36.25z" fill="#FFF" />
            <path
                d="M27.5 23.75h45a7.5 7.5 0 0 1 7.5 7.5v5H20v-5a7.5 7.5 0 0 1 7.5-7.5zm36.875 8.75a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75zm-28.75 0a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75z"
                fill="#BA3A26"
            />
            <g transform="translate(28.75 43.75)">
                <rect fill="#C6C2BF" width={42.5} height={2.5} rx={1.25} />
                <rect fill="#C6C2BF" x={33.125} y={7.5} width={9.375} height={2.5} rx={1.25} />
                <rect fill="#C6C2BF" y={7.5} width={20.625} height={2.5} rx={1.25} />
                <rect fill="#C6C2BF" y={15} width={42.5} height={2.5} rx={1.25} />
                <rect fill="#C6C2BF" y={22.5} width={42.5} height={2.5} rx={1.25} />
                <circle fill="#FFA733" cx={26.875} cy={8.75} r={3.75} />
            </g>
        </g>
    </svg>
);

export default IntroSirkelSvg;
