import * as React from 'react';

export interface Props {
	iconRef: any;
	size?: number | { width: number; height: number };
	className?: string;
}

const CustomSVGFromSprite: React.StatelessComponent<Props> = (props: Props) => {
	const attrs = {
		'view-box': props.iconRef.viewBox,
		height: typeof props.size === 'number' ? props.size : props.size ? props.size.height : undefined,
		width: typeof props.size === 'number' ? props.size : props.size ? props.size.width : undefined,
		className: props.className
	};
	return (
		<svg {...attrs}>
			<use xlinkHref={`#${props.iconRef.id}`} />
		</svg>
	);
};

export default CustomSVGFromSprite;
