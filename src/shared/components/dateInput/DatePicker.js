/* eslint-env browser */
import React, { Component } from 'react';
import PT from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import NavFrontendChevron from 'nav-frontend-chevron';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/nb';
import { addDays } from 'date-fns';

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
		const dato = moment(this.props.selectedDate || this.props.fromDate);
		return dato.isValid() ? dato.toDate() : null;
	}

	getInitialMonth() {
		return this.getDateFromValue() || new Date();
	}

	selectedDays(day) {
		return DateUtils.isSameDay(this.getDateFromValue() || new Date(), day);
	}

	getDisabledRanges() {
		if (!this.props.disabledRanges || this.props.disabledRanges.length === 0) {
			return [];
		}
		return this.props.disabledRanges.map((r) => ({
			before: addDays(r.to, 1),
			after: addDays(r.from, -1)
		}));
	}

	getDisabledDays() {
		const disabledDays = this.getDisabledRanges();
		if (this.props.disableWeekends) {
			disabledDays.push({ daysOfWeek: [0, 6] });
		}
		if (this.props.fromDate) {
			disabledDays.push({ before: this.props.fromDate });
		}
		if (this.props.toDate) {
			disabledDays.push({ after: this.props.toDate });
		}
		return disabledDays;
	}
	render() {
		const { onKeyUp } = this.props;
		const disabledDays = this.getDisabledDays();

		return (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className={classnames('datovelger__DayPicker', {
					'datovelger__DayPicker--fullscreen': this.props.fullscreen
				})}
				onKeyUp={(e) => {
					onKeyUp(e);
				}}>
				<DayPicker
					locale="no"
					initialMonth={this.getInitialMonth()}
					localeUtils={localeUtils}
					firstDayOfWeek={1}
					navbarElement={<NavBar />}
					disabledDays={disabledDays}
					selectedDays={(day) => this.selectedDays(day)}
					onDayClick={(event) => this.props.onDayClick(event)}
				/>
			</div>
		);
	}
}

DayPickerComponent.propTypes = {
	// input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
	selectedDate: PT.instanceOf(Date),
	onKeyUp: PT.func.isRequired,
	close: PT.func.isRequired,
	onDayClick: PT.func.isRequired,
	fromDate: PT.instanceOf(Date),
	toDate: PT.instanceOf(Date),
	disableWeekends: PT.bool,
	disabledRanges: PT.arrayOf(
		PT.shape({
			from: PT.instanceOf(Date).isRequired,
			to: PT.instanceOf(Date).isRequired
		})
	),
	fullscreen: PT.bool
};

DayPickerComponent.defaultProps = {
	fromDate: undefined,
	toDate: undefined,
	selectedDate: undefined,
	disableWeekends: false,
	disabledRanges: [],
	fullscreen: false
};

export default DayPickerComponent;
