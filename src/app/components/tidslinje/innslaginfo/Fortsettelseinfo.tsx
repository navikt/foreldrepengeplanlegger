import * as React from 'react';
import InnslagLayout from 'app/components/tidslinje/elementer/InnslagLayout';

const Fortsettelsesinfo: React.StatelessComponent<{ navn: string }> = ({
	navn
}) => <InnslagLayout>{navn} fortsetter sin permisjon.</InnslagLayout>;

export default Fortsettelsesinfo;
