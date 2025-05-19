import {DayPicker} from "react-day-picker";
import { it } from "date-fns/locale";
import React from "react";

interface DatePickerProps {
    loading: boolean;
    datePickerDate: Date ;
    handleDatePickerChange: (date: Date ) => void;
    isBackupReady:boolean
}

const DatePicker: React.FC <DatePickerProps>= ({ loading, datePickerDate, handleDatePickerChange, isBackupReady }: DatePickerProps) => {
    const isDisabled = !isBackupReady || loading;
    return (
        <div className="w-52">
            <button popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                {datePickerDate ? datePickerDate.toLocaleDateString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }): "Pick a date"}
            </button>
            <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                <DayPicker
                    className="react-day-picker"
                    mode="single"
                    disabled={isDisabled}
                    selected={datePickerDate}
                    onSelect={handleDatePickerChange}
                    required
                    locale={it}
                />
            </div>
        </div>
    );
}

export default DatePicker;