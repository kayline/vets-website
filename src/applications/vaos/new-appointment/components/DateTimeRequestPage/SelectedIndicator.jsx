import React from 'react';
import moment from 'moment';

export default function SelectedIndicator({ date, selectedDates }) {
  const bubbles = selectedDates
    .reduce((selectedFieldValues, currentDate) => {
      if (currentDate.startsWith(date)) {
        selectedFieldValues.push(
          moment(currentDate).hour() >= 12 ? 'PM' : 'AM',
        );
      }
      return selectedFieldValues;
    }, [])
    .sort();

  return (
    <div className="vaos-calendar__indicator-bubbles-container">
      {bubbles.map(label => (
        <div
          key={`bubble-${label}`}
          className="vaos-calendar__indicator-bubble vads-u-border--2px vads-u-border-color--white vads-u-background-color--base"
        >
          {label}
        </div>
      ))}
    </div>
  );
}
