import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Checkbox, Fieldset, Radio } from 'nav-frontend-skjema';
import './transformingRadioGroup.less';

export default class TransformingRadioGroup extends Component {
	radioGroupClsNames() {
		return classNames('transformingRadioGroup', {
			'transformingRadioGroup--expanded': this.props.expanded === true,
			'transformingRadioGroup--collapsed': this.props.collapsed === true
		});
	}

	renderCollapsed() {
		const checkboxAttrs = this.props.stage.values.find(
			(el) => el.value === this.props.stage.selectedValue
		);
		return (
			<Checkbox
				defaultChecked
				{...checkboxAttrs}
				onClick={($e) => {
					this.props.onClickCollapsed($e, this.props.stage);
				}}
			/>
		);
	}

	renderExpanded() {
		const { name, values } = this.props.stage;
		return values.map((radioAttrs) => (
			<Radio
				key={radioAttrs.value}
				name={name}
				onClick={($e) => {
					this.props.onClickExpanded($e, radioAttrs.value);
				}}
				{...radioAttrs}
			/>
		));
	}

	render() {
		const { collapsed, expanded } = this.props;
		return (
			<div className={this.radioGroupClsNames()}>
				<Fieldset legend={this.props.stage.legend}>
					{expanded && this.renderExpanded()}
					{collapsed && this.renderCollapsed()}
				</Fieldset>
			</div>
		);
	}
}

TransformingRadioGroup.propTypes = {
	collapsed: PropTypes.bool,
	expanded: PropTypes.bool,
	stage: PropTypes.shape({
		legend: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		values: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			}).isRequired
		).isRequired,
		selectedValue: PropTypes.string
	}).isRequired,
	onClickCollapsed: PropTypes.func,
	onClickExpanded: PropTypes.func
};

TransformingRadioGroup.defaultProps = {
	onClickCollapsed: () => {},
	onClickExpanded: () => {},
	collapsed: false,
	expanded: false
};
