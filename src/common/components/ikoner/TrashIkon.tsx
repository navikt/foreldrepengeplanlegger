import * as React from 'react';

interface Props {}

const TrashIkon: React.StatelessComponent<Props> = (props) => (
    <svg role="presentation" focusable="false" width={26} height={27} {...props} viewBox="0 0 22 23">
        <g fill="none" fillRule="evenodd">
            <path fill="#FFF" fillRule="nonzero" d="M0 0h22v23H0z" />
            <path
                d="M18.652 6a.34.34 0 0 1 .348.333.34.34 0 0 1-.348.334h-2.087v13a.34.34 0 0 1-.348.333H5.087a.34.34 0 0 1-.348-.333v-13H3.348A.34.34 0 0 1 3 6.333.34.34 0 0 1 3.348 6h4.174V4.333A.34.34 0 0 1 7.87 4h5.565a.34.34 0 0 1 .348.333V6h4.869zM8.217 4.667V6h4.87V4.667h-4.87zm7.653 14.666V6.667H5.435v12.666H15.87zm-8-11a.34.34 0 0 1 .347.334v8A.34.34 0 0 1 7.87 17a.34.34 0 0 1-.348-.333v-8a.34.34 0 0 1 .348-.334zm2.782 0a.34.34 0 0 1 .348.334v8a.34.34 0 0 1-.348.333.34.34 0 0 1-.348-.333v-8a.34.34 0 0 1 .348-.334zm2.435.334a.34.34 0 0 1 .348-.334.34.34 0 0 1 .348.334v8a.34.34 0 0 1-.348.333.34.34 0 0 1-.348-.333v-8z"
                fill="#0067c5"
            />
        </g>
    </svg>
);

export default TrashIkon;
