import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useStore from "@/app/store";

const Datepicker: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const setDatePickerDate = useStore(state => state.setDatePickerDate);
    const loadingGlobal = useStore(state => state.loadingGlobal);

    const handleChange = (date: Date | null) => {
        if (date) {
            setDatePickerDate(date);
            setDate(date);
        }
    }

    return (
        <DatePicker
            placeholderText="Select a date"
            className="btn btn-info"
            disabled={loadingGlobal}
            selected={date}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
            useShortMonthInDropdown
            minDate={new Date("2000-01-01")}
            maxDate={new Date("2100-12-31")}
            showMonthDropdown
            showYearDropdown
        />
    );
}

export default Datepicker;