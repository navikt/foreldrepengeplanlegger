import * as React from 'react';

export interface OwnProps {
    size?: number;
}

const HuskestativIkon = (props: OwnProps) => {
    const ratio = 66 / 65;
    return (
        <svg role="presentation" focusable="false" viewBox="0 0 65 66" width={props.size} height={props.size ? props.size * ratio : undefined}>
            <title>{'Huskestativ'}</title>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M57.993 53.123h-5.551V7.136h-40.36v45.987H6.444V7.929a6.344 6.344 0 0 1 6.344-6.343h38.86a6.344 6.344 0 0 1 6.345 6.343v45.194z"
                    fill="#3E3832"
                />
                <rect fill="#C6C2BF" x={20.137} width={3.222} height={38.058} rx={1.611} />
                <rect fill="#C6C2BF" x={41.079} width={3.222} height={38.058} rx={1.611} />
                <rect fill="#5C4378" x={16.915} y={34.887} width={30.608} height={4.757} rx={2.379} />
                <path fill="#38A161" d="M0 52.33h64.437v12.686H0z" />
            </g>
        </svg>
    );
};

export default HuskestativIkon;
