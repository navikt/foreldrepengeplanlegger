import * as React from 'react';
import InfoIkon from 'app/components/ikoner/InfoIkon';
import LukkInfoIkon from 'app/components/ikoner/LukkInfoIkon';
import Sirkelknapp from 'shared/components/sirkelknapp/Sirkelknapp';

export interface Props {}

export const InfotekstKnapp: React.StatelessComponent<{
	label: string;
	pressed: boolean;
	onClick: () => void;
}> = ({ label, pressed, onClick }) => (
	<Sirkelknapp
		label={label}
		ikon={!pressed ? <LukkInfoIkon /> : <InfoIkon />}
		toggle={{ pressed: pressed }}
		onClick={() => onClick()}
	/>
);

export default InfotekstKnapp;
