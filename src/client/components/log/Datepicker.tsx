import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import useStore from "@/app/store";

const Datepicker: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date());
    const setIsDateChanged = useStore(state => state.setIsDateChanged);
    const isDateChanged = useStore(state => state.isDateChanged);
    const setDatePickerDate = useStore(state => state.setDatePickerDate);

    const handleChange = (date: Date | null) => {
        if (date) {
            setDatePickerDate(date);
            setIsDateChanged(true);
            setDate(date);
        }
    }

    return (
        <DatePicker
            className="btn btn-info"
            selected={date}
            onChange={handleChange}
            dateFormat="dd/MM/yyyy"
        />
    );
}

export default Datepicker;