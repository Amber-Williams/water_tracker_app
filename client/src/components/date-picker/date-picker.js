import React, { useState } from 'react';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';

export const DatePicker = ({ startDate, setStartDate, fetchDateEntries }) => {
    // const [edate, setEdate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleDatesChange = ({ startDate, endDate }) => {
      setStartDate(startDate);
      setEdate(endDate);
    };
    const handleDateChange = (date) => {
      setStartDate(date);
      fetchDateEntries(date);
    };

  return (
    <div>
      {/* See data / edit date */}
      {/* <DateRangePicker
        startDate={startDate}
        endDate={edate}
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)} /> */}

        <SingleDatePicker
          isOutsideRange={(date) => date.isAfter() } // dont allow users to adjust future water levels
          date={startDate} // momentPropTypes.momentObj or null
          onDateChange={handleDateChange} // PropTypes.func.isRequired
          focused={focusedInput} // PropTypes.bool
          onFocusChange={({ focused }) => setFocusedInput(focused)}// PropTypes.func.isRequired
        />
    </div>
  )
}


export default DatePicker
