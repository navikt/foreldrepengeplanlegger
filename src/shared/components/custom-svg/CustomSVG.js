import React from 'react';
import PropTypes from 'prop-types';

export default class CustomSVGFromSprite extends React.Component {
	renderIcon(svgAttrs) {
		return (
			<svg {...svgAttrs}>
				<use xlinkHref={`#${this.props.iconRef.id}`} />
			</svg>
		);
	}

	render() {
		const svgAttrs = {
			'view-box': this.props.iconRef.viewBox,
			height: this.props.size,
			width: this.props.size,
			className: this.props.className
		};

		return this.renderIcon(svgAttrs);
	}
}

CustomSVGFromSprite.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types, react/require-default-props
	iconRef: PropTypes.object,
	size: PropTypes.number,
	className: PropTypes.string
};

CustomSVGFromSprite.defaultProps = {
	size: undefined,
	className: ''
};
