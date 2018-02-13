declare module 'nav-frontend-lenker' {
	interface NavFrontendLenke {
		href: string;
		children: React.ReactNode;
		target?: string;
		className?: string;
		ariaLabel?: String;
	}
	const t: new (props: NavFrontendLenke) => React.Component<
		NavFrontendLenke,
		any
	>;
	export default t;
}
