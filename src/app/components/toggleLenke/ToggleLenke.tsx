import * as React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';

interface ToggleLenkeProps {
	children: React.ReactNode;
	onToggle: () => void;
	apen?: boolean;
}

const ToggleLenke: React.StatelessComponent<ToggleLenkeProps> = (props) => {
	const { apen = false, children, onToggle } = props;
	return (
		<a
			className="toggleLenke lenke"
			href="#"
			onClick={(evt: React.MouseEvent<HTMLAnchorElement>) => {
				evt.stopPropagation();
				evt.preventDefault();
				onToggle();
			}}>
			<span className="toggleLenke__label">{children}</span>
			<span className="toggleLenke__chevron">
				<NavFrontendChevron type={apen ? 'opp' : 'ned'} />
			</span>
		</a>
	);
};
export default ToggleLenke;
