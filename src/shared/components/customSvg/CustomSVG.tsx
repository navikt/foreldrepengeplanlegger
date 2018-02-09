import * as React from 'react';

export type SVGSize = number | { width: number; height: number };

export interface Props {
	iconRef: any;
	size?: SVGSize;
	className?: string;
}

const CustomSVGFromSprite: React.StatelessComponent<Props> = ({
	iconRef,
	size,
	className
}) => {
	const attrs = {
		'view-box': iconRef.viewBox,
		height: typeof size === 'number' ? size : size ? size.height : undefined,
		width: typeof size === 'number' ? size : size ? size.width : undefined
	};
	return (
		<svg {...attrs}>
			<use xlinkHref={`#${iconRef.id}`} className={className} />
		</svg>
	);
};

export default CustomSVGFromSprite;
