'use client'

import DatePicker from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

interface DatepickerProps {
    loading: boolean;
    datePickerDate: Date | null;
    handleDatePickerChange: (date: Date | null) => void;
}

const CustomDatePicker: React.FC<DatepickerProps> = ({ loading, datePickerDate, handleDatePickerChange }) => {
    return (
        <DatePicker
            placeholderText="Select a date"
            className="btn btn-info w-36"
            disabled={loading}
            selected={datePickerDate}
            onChange={handleDatePickerChange}
            dateFormat="dd/MM/yyyy"
            useShortMonthInDropdown
            minDate={new Date("2000-01-01")}
            maxDate={new Date("2100-12-31")}
            showMonthDropdown
            showYearDropdown
        />
    );
}

export default CustomDatePicker;