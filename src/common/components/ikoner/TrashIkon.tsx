import * as React from 'react';

interface Props {}

const TrashIkon: React.StatelessComponent<Props> = (props) => (
    <svg width={20} height={21} {...props}>
        <path
            d="M3.45 3.883v15.712h12.281V3.883H3.451zm2.463-.81V1c0-.224.182-.405.405-.405h6.546c.223 0 .405.181.405.405v2.073H19c.54 0 .54.81 0 .81h-2.459V20a.405.405 0 0 1-.405.405H3.046A.405.405 0 0 1 2.64 20V3.883H1c-.54 0-.54-.81 0-.81h4.913zm.81 0h5.736V1.405H6.723v1.668zm0 3.297c0-.54-.81-.54-.81 0v9.913c0 .54.81.54.81 0V6.37zm3.273 0c0-.54-.81-.54-.81 0v9.913c0 .54.81.54.81 0V6.37zm3.273 0c0-.54-.81-.54-.81 0v9.913c0 .54.81.54.81 0V6.37z"
            fill="#0067C5"
            fillRule="evenodd"
        />
    </svg>
);

export default TrashIkon;
