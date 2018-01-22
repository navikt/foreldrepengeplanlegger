/* eslint-env browser */
import React, { Component } from 'react';
import PT from 'prop-types';
import moment from 'moment';
import NavFrontendChevron from 'nav-frontend-chevron';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/nb';

const localeUtils = {
	...MomentLocaleUtils,
	formatWeekdayShort: (i, locale) =>
		MomentLocaleUtils.formatWeekdayLong(i, locale).substring(0, 3)
};

export const NavBar = ({
	onNextClick,
	onPreviousClick,
	showPreviousButton,
	showNextButton
}) => {
	const className = 'DayPicker-NavButton';
	return (
		<div role="toolbar">
			<button
				tabIndex="0"
				className={`${className} DayPicker-NavButton--prev`}
				disabled={!showPreviousButton}
				type="button"
				onClick={(e) => {
					e.preventDefault();
					onPreviousClick();
				}}>
				<NavFrontendChevron type="venstre" />
			</button>
			<button
				tabIndex="0"
				className={`${className} DayPicker-NavButton--next`}
				disabled={!showNextButton}
				type="button"
				onClick={(e) => {
					e.preventDefault();
					onNextClick();
				}}>
				<NavFrontendChevron type="høyre" />
			</button>
		</div>
	);
};

NavBar.propTypes = {
	onNextClick: PT.func,
	onPreviousClick: PT.func,
	showPreviousButton: PT.bool,
	showNextButton: PT.bool
};

NavBar.defaultProps = {
	onNextClick: undefined,
	onPreviousClick: undefined,
	showPreviousButton: false,
	showNextButton: false
};

class DayPickerComponent extends Component {
	componentDidMount() {
		this.lukk = () => {
			this.props.close();
		};

		document.body.click(); // remove other datepickers
		document.addEventListener('click', this.lukk);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.lukk);
	}

	getDateFromValue() {
		const dato = moment(this.props.input.value);
		return dato.isValid() ? dato.toDate() : null;
	}

	getInitialMonth() {
		return this.getDateFromValue() || this.props.fromDate || new Date();
	}

	selectedDays(day) {
		return DateUtils.isSameDay(this.getDateFromValue() || new Date(), day);
	}

	render() {
		const { onKeyUp } = this.props;
		return (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className="datovelger__DayPicker"
				onKeyUp={(e) => {
					onKeyUp(e);
				}}>
				<DayPicker
					locale="no"
					initialMonth={this.getInitialMonth()}
					localeUtils={localeUtils}
					firstDayOfWeek={1}
					navbarElement={<NavBar />}
					selectedDays={(day) => this.selectedDays(day)}
					onDayClick={(event) => this.props.onDayClick(event)}
				/>
			</div>
		);
	}
}

DayPickerComponent.propTypes = {
	input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
	onKeyUp: PT.func.isRequired,
	close: PT.func.isRequired,
	onDayClick: PT.func.isRequired,
	fromDate: PT.instanceOf(Date)
};

DayPickerComponent.defaultProps = {
	fromDate: undefined
};

export default DayPickerComponent;
