import React from 'react';
import { SvgIkonProps } from '../../../types';

const TidIkon = (props: SvgIkonProps) => (
    <svg width={32} height={32} viewBox="0 0 25 25" {...props}>
        <title>{'Group 29'}</title>
        <g stroke="#0067C5" fill="none" fillRule="evenodd" strokeLinejoin="round">
            <path
                d="M24 20c0 2.2-1.8 4-4 4H5c-2.2 0-4-1.8-4-4V5c0-2.199 1.8-4 4-4h15c2.2 0 4 1.801 4 4v15h0z"
                fill="#FFF"
            />
            <path strokeLinecap="round" d="M15.5 13H12V7.5" />
            <path d="M21 12.5a8.5 8.5 0 1 1-17.001-.001A8.5 8.5 0 0 1 21 12.5h0z" />
        </g>
    </svg>
);

export default TidIkon;
