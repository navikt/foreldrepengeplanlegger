import * as React from 'react';

const KalenderIkon = (props: {}) => (
    <svg width={24} height={24} {...props}>
        <title>{'Icons/calendar/blue'}</title>
        <defs>
            <path d="M4.333 9h15.334" id="kalender_prefix__a" />
        </defs>
        <g fill="none" fillRule="evenodd" stroke="#0067C5">
            <path d="M7 5.667H4.333v14h15.334v-14H17" />
            <path d="M7 4.333h2V7H7zM15 4.333h2V7h-2zM9 5h6" />
            <use xlinkHref="#kalender_prefix__a" />
        </g>
    </svg>
);

export default KalenderIkon;
