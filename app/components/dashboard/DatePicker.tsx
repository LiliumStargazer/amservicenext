import {DayPicker} from "react-day-picker";
import { it } from "date-fns/locale";
import React from "react";

interface DatePickerProps {
    disabled: boolean;
    datePickerDate: Date ;
    handleDatePickerChange: (date: Date ) => void;
}

const DatePicker: React.FC <DatePickerProps>= ({ disabled, datePickerDate, handleDatePickerChange }: DatePickerProps) => {

    return (
        <label className="input input-sm min-w-72 max-w-min">
        <span className="label text-info">Select date:</span>
            <button className="button" popoverTarget="rdp-popover" disabled={disabled} style={{ anchorName: "--rdp" } as React.CSSProperties}>
                {datePickerDate ? datePickerDate.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }): "Pick a date"}
            </button>
            <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
            <DayPicker
                className="react-day-picker"
                mode="single"
                disabled={disabled}
                selected={datePickerDate}
                onSelect={handleDatePickerChange}
                required
                locale={it}
                onDayClick={() => {
                const popover = document.getElementById("rdp-popover");
                if (popover && "hidePopover" in popover && typeof (popover as Element & { hidePopover?: () => void }).hidePopover === "function") {
                (popover as Element & { hidePopover: () => void }).hidePopover();
                }
                }}
            />
            </div>
        </label>
    );
}

export default DatePicker;