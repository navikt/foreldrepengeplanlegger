declare module 'nav-frontend-modal' {
	interface NavFrontendModal {
		isOpen?: boolean;
		onAfterOpen?: () => void;
		onRequestClose?: () => void;
		closeTimeoutMS?: number;
		style?: object;
		contentLabel: string;
		closeButton?: boolean;
		className?: string;
	}
	const t: new (props: NavFrontendModal) => React.Component<NavFrontendModal, any>;
	export default t;
}
