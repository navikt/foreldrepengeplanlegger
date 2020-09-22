import * as React from 'react';
const { guid } = require('nav-frontend-js-utils');
import classNames from 'classnames';
import { Feil } from './types';

export interface Props {
    label: string | React.ReactNode;
    feil?: Feil;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.FunctionComponent<Props> = (props: Props) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classNames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined,
            })}>
            {typeof label === 'string' ? (
                <label className="skjemaelement__label" htmlFor={inputId}>
                    {label}
                </label>
            ) : (
                label
            )}
            <div
                className={classNames({
                    'skjema__feilomrade--harFeil': feil !== undefined,
                })}>
                {children}
            </div>
            {feil ? feil.feilmelding : null}
        </div>
    );
};

export default SkjemaInputElement;
