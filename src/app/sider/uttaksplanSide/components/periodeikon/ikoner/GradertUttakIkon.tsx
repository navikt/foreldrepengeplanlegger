import React from 'react';
import { SvgIkonProps } from '../../../../../types';
import { Forelder } from 'common/types';

interface OwnProps {
    forelder?: Forelder;
}

const color1 = '#3385D1';
const color2 = '#634689';

const GradertUttakIkon = (props: SvgIkonProps & OwnProps) => {
    const { title, forelder = Forelder.mor } = props;
    return (
        <svg role="presentation" focusable="false" width={32} height={32} {...props}>
            <title>{title}</title>
            <defs>
                <path
                    d="M2.94 29.06a9.187 9.187 0 0 1-1.605-2.175C.464 25.254 0 23.638 0 19.181v-6.362c0-4.457.464-6.074 1.336-7.703a9.086 9.086 0 0 1 3.78-3.78C6.746.464 8.362 0 12.819 0h6.362c4.457 0 6.074.464 7.703 1.336.8.424 1.534.965 2.176 1.604L2.94 29.06z"
                    id="prefix__a"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M12.82 0h6.36c4.458 0 6.075.464 7.704 1.336a9.086 9.086 0 0 1 3.78 3.78C31.536 6.746 32 8.362 32 12.819v6.362c0 4.457-.464 6.074-1.336 7.703a9.086 9.086 0 0 1-3.78 3.78c-1.63.872-3.246 1.336-7.703 1.336h-6.362c-4.457 0-6.074-.464-7.703-1.336a9.086 9.086 0 0 1-3.78-3.78C.464 25.254 0 23.638 0 19.181v-6.362c0-4.457.464-6.074 1.336-7.703a9.086 9.086 0 0 1 3.78-3.78C6.746.464 8.362 0 12.819 0h.001z"
                    fill={`#${forelder === Forelder.farMedmor ? color1 : color2}`}
                />
                <path
                    d="M14.967 19.897c-.189-1.245-.868-2.087-1.653-2.087A.321.321 0 0 1 13 17.48c0-.181.14-.328.314-.328 1.164 0 2.077 1.154 2.286 2.744 2.917 0 10.15-.004 12.4 0 0 2.719-1.504 4.947-4.207 4.947h-5.45c-1.948 0-3.526-1.74-3.526-3.887 0-.368.046-.723.132-1.06h.018zm9.007 8.228c-.56 0-1.078-.313-1.359-.82a1.706 1.706 0 0 1 0-1.641c.28-.508.799-.82 1.36-.82.866 0 1.569.734 1.569 1.64 0 .906-.703 1.641-1.57 1.641zm0-1.313a.31.31 0 0 0 .285-.159.341.341 0 0 0 0-.338.31.31 0 0 0-.285-.159.322.322 0 0 0-.298.328c0 .175.131.32.298.328zm-5.648 1.313c-.561 0-1.079-.313-1.36-.82a1.706 1.706 0 0 1 0-1.641c.281-.508.799-.82 1.36-.82.866 0 1.569.734 1.569 1.64 0 .906-.703 1.641-1.57 1.641zm0-1.313a.31.31 0 0 0 .284-.159.341.341 0 0 0 0-.338.31.31 0 0 0-.284-.159.322.322 0 0 0-.3.328c0 .175.132.32.3.328zM23.449 15C26.262 15 28 17.233 28 19.24c-1.382 0-3.653-.003-6.659-.003L23.451 15h-.002z"
                    fill="#FFF"
                    fillRule="nonzero"
                />
                <mask id="prefix__b" fill="#fff">
                    <use xlinkHref="#prefix__a" />
                </mask>
                <use fill="#06893A" xlinkHref="#prefix__a" />
                <g mask="url(#prefix__b)" fill="#FFF" fillRule="nonzero">
                    <path d="M16.163 6.283l-.001-.002-1.194-1.193a.296.296 0 0 0-.21-.088H6.992a.299.299 0 0 0-.212.088L5.587 6.281l-.001.002a.332.332 0 0 0-.086.21v12.541a.3.3 0 0 0 .299.3H9.68v-2.688a.3.3 0 0 1 .3-.299h1.79a.3.3 0 0 1 .3.299v2.687h3.881a.3.3 0 0 0 .299-.299V6.493a.33.33 0 0 0-.087-.21zm-7.677 8.87H6.695v-1.792h1.791v1.792zm0-2.986H6.695v-1.792h1.791v1.792zm0-2.987H6.695V7.39h1.791V9.18zm3.584 5.973H9.68v-1.792h2.39v1.792zm0-2.986H9.68v-1.792h2.39v1.792zm0-2.987H9.68V7.39h2.39V9.18zm2.985 5.973h-1.791v-1.792h1.791v1.792zm0-2.986h-1.791v-1.792h1.791v1.792zm0-2.987h-1.791V7.39h1.791V9.18zM6.52 6.195l.597-.598h7.516l.598.598H6.52z" />
                </g>
                <path d="M2.379 29.784L29.292 2.871" stroke="#FFF" strokeLinecap="square" fillRule="nonzero" />
            </g>
        </svg>
    );
};
export default GradertUttakIkon;
