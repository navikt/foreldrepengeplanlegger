import * as React from 'react';
import * as classnames from 'classnames';

import AriaText from 'shared/components/aria/AriaText';

export type Stil = 'hvit' | 'bla' | 'info';

export interface Props {
	/** Tekst som blir lest opp og satt som tittel på knappen */
	label: string;
	/** Ikon som brukes inne i knappen */
	ikon: React.ReactNode;
	/** Funksjon som kalles knappen klikkes på */
	onClick: () => void;
	/** Om knappen er disabled eller ikke. Default false. */
	disabled?: boolean;
	/** Om knappen skal ha tilstanded pressed/valgt. Default false. */
	toggle?: {
		pressed: boolean;
	};
	/** Layout varianter */
	stil?: Stil;
	/** Størrelse - default normal */
	size?: 'normal' | 'stor';
}

const Sirkelknapp: React.StatelessComponent<Props> = ({
	onClick,
	label,
	ikon,
	toggle,
	disabled,
	stil = 'info',
	size = 'normal'
}) => (
	<button
		type="button"
		onClick={() => onClick()}
		className={classnames(
			`sirkelknapp`,
			`sirkelknapp--${stil}`,
			`sirkelknapp--${size}`,
			{
				'sirkelknapp--pressed': toggle && toggle.pressed
			}
		)}
		disabled={disabled}
		aria-pressed={toggle ? toggle.pressed : undefined}
		title={label}>
		<span className="sirkelknapp__ikon">{ikon}</span>
		<AriaText>{label}</AriaText>
	</button>
);

export default Sirkelknapp;
