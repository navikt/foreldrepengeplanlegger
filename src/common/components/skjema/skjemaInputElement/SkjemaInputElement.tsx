import * as React from 'react';
const { guid } = require('nav-frontend-js-utils');
import classNames from 'classnames';
import { SkjemaelementFeil } from 'nav-frontend-skjema/src/skjemaelement-feilmelding';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export interface Props {
    label: string | React.ReactNode;
    feil?: SkjemaelementFeil;
    id?: string;
    children: React.ReactNode;
}

const SkjemaInputElement: React.StatelessComponent<Props> = (props: Props) => {
    const { label, id, feil, children } = props;
    const inputId = id || guid();
    return (
        <div
            className={classNames('skjemaelement', {
                'skjemaelement--harFeil': feil !== undefined
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
                    'skjema__feilomrade--harFeil': feil !== undefined
                })}>
                {children}
            </div>
            <SkjemaelementFeilmelding feil={feil} />
        </div>
    );
};

export default SkjemaInputElement;
