import * as React from 'react';
import { erFridag } from 'app/utils/fridagerUtils';

export const renderDag = (d: Date) => {
	const fridag = erFridag(d);
	if (fridag) {
		return (
			<span
				className="kalender-offentligFridag"
				aria-label={fridag}
				title={fridag}>
				{d.getDate()}
			</span>
		);
	}
	return d.getDate();
};
