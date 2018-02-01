/* eslint-disable max-len */
import React, { Component } from 'react';
import PT from 'prop-types';
import MaskedInput from 'react-maskedinput';
import Icon from 'nav-frontend-ikoner-assets';
import classnames from 'classnames';

import DatePicker from './DatePicker';
import {
	dateToISODate,
	isValidISODate,
	ISODateToMaskedInput,
	datePickerToISODate
} from './dateInputUtil';

const stopEvent = (event) => {
	try {
		event.nativeEvent.stopImmediatePropagation();
	} catch (e) {
		event.stopPropagation();
	}
};

class DateInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};

		this.onFocusOut = this.onFocusOut.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onDayClick = this.onDayClick.bind(this);
		this.onMaskedInputChange = this.onMaskedInputChange.bind(this);
		this.toggle = this.toggle.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	componentDidMount() {
		this.container.addEventListener('focusout', this.onFocusOut);
	}

	componentWillUnmount() {
		this.container.removeEventListener('focusout', this.onFocusOut);
	}

	onFocusOut(e) {
		const { relatedTarget } = e;
		if (relatedTarget) {
			const targetIsChildNode = this.container.contains(relatedTarget);
			if (!targetIsChildNode) {
				this.close(false);
			}
		}
	}

	onKeyUp(e) {
		const ESCAPE_KEYCODE = 27;
		if (e.which === ESCAPE_KEYCODE) {
			this.close();
		}
	}

	onDayClick(event) {
		const isoDate = dateToISODate(new Date(event));
		this.props.onChange(isoDate);
		this.close();
	}

	onMaskedInputChange(e) {
		const inputDate = e.target.value;
		const isoDate = datePickerToISODate(inputDate);
		if (isValidISODate(isoDate)) {
			this.props.onChange(isoDate);
		}
	}

	toggle(e) {
		e.preventDefault();
		if (this.state.isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	open() {
		this.setState({
			isOpen: true
		});
	}

	close(setFocus = true) {
		this.setState({
			isOpen: false
		});
		if (setFocus) {
			this.toggleButton.focus();
		}
	}

	render() {
		const {
			id,
			inputProps,
			label,
			disabled,
			fromDate,
			toDate,
			errorMessage,
			selectedDate
		} = this.props;

		const maskedInputProps = {
			...inputProps,
			value: isValidISODate(selectedDate)
				? ISODateToMaskedInput(selectedDate)
				: selectedDate
		};

		return (
			<div
				className={classnames('skjemaelement', {
					'datovelger__outer datovelger__outer--withError': errorMessage,
					datovelger__outer: !errorMessage
				})}
				ref={(container) => {
					this.container = container;
				}}>
				<label className="skjemaelement__label" htmlFor={id}>
					{label}
				</label>
				<div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
					className="datovelger__inner"
					tabIndex=""
					onClick={stopEvent}>
					<div className="datovelger__inputContainer">
						<MaskedInput
							type="tel"
							mask="11.11.1111"
							autoComplete="off"
							placeholder="dd.mm.åååå"
							id={id}
							disabled={disabled}
							className="skjemaelement__input input--m datovelger__input"
							{...maskedInputProps}
							onChange={(e) => this.onMaskedInputChange(e)}
						/>
						<button
							className="js-toggle datovelger__toggleDayPicker"
							aria-label={
								this.state.isOpen ? 'Skjul datovelger' : 'Vis datovelger'
							}
							ref={(toggle) => {
								this.toggleButton = toggle;
							}}
							id={`toggle-${id}`}
							disabled={disabled}
							onKeyUp={this.onKeyUp}
							onClick={this.toggle}
							aria-pressed={this.erApen}
							type="button">
							<Icon kind="kalender" size={13} />
						</button>
					</div>

					{this.state.isOpen && (
						<DatePicker
							{...this.props}
							ariaControls={`toggle-${id}`}
							fromDate={fromDate}
							toDate={toDate}
							onDayClick={this.onDayClick}
							onKeyUp={this.onKeyUp}
							close={this.close}
							disabledRanges={this.props.disabledRanges}
							disableWeekends={this.props.disableWeekends}
						/>
					)}
				</div>
				<div
					role="alert"
					aria-live="assertive"
					className="skjemaelement__feilmelding">
					{errorMessage}
				</div>
			</div>
		);
	}
}

DateInput.propTypes = {
	id: PT.string.isRequired,
	label: PT.oneOfType([PT.string, PT.node]).isRequired,
	inputProps: PT.object, // eslint-disable-line react/forbid-prop-types
	selectedDate: PT.instanceOf(Date),
	disabled: PT.bool,
	fromDate: PT.instanceOf(Date),
	toDate: PT.instanceOf(Date),
	disableWeekends: PT.bool,
	disabledRanges: PT.arrayOf(
		PT.shape({
			from: PT.instanceOf(Date).isRequired,
			to: PT.instanceOf(Date).isRequired
		})
	),
	errorMessage: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
	onChange: PT.func.isRequired
};

DateInput.defaultProps = {
	disabled: false,
	fromDate: undefined,
	toDate: undefined,
	errorMessage: undefined,
	selectedDate: undefined,
	inputProps: undefined,
	disableWeekends: false,
	disabledRanges: undefined
};
export default DateInput;
