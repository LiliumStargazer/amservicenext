import React, { useEffect, useState, useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useStore from "@/app/store";
import * as Sentry from '@sentry/nextjs';

const Chart: React.FC = () => {
    const frigoData = useStore(state => state.frigoData);
    const frigoSelected = useStore(state => state.frigoSelected);
    const setMessage = useStore(state => state.setMessage);
    const table = useStore(state => state.table);
    const intervalMinutes = useStore(state => state.intervalMinutes);
    const [startDate, setStartDate] = useState(new Date(Date.now() - 86400000));
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    function formatDate(dateString: string): Date {
        try {
            let parts = dateString.split("/");
            let day = parseInt(parts[0], 10);
            let month = parseInt(parts[1], 10) - 1;
            let year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        } catch (error) {
            Sentry.captureException(error);
            return new Date();
        }
    }

    function findMaxDate(entries: any[]): Date {
        try {
            return new Date(Math.max(...entries.map(entry => new Date(entry.date).getTime())));
        } catch (error) {
            Sentry.captureException(error);
            return new Date();
        }
    }

    function reduceDataPoints(data: any[], minutes: number): any[] {
        if (minutes <= 0) return data; // no reduction

        const milliseconds = minutes * 60 * 1000;
        const result = [];
        let lastDate = null;

        for (const entry of data) {
            const [day, month, year] = entry.dataOraR.split("/");
            const [hours, minutes] = entry.Time.split(":");
            const currentDate = new Date(year, month - 1, day, hours, minutes);

            if (!lastDate || (currentDate.getTime() - lastDate.getTime()) >= milliseconds) {
                result.push(entry);
                lastDate = currentDate;
            }
        }

        return result;
    }

    useEffect(() => {
        if (!loading)
            setLoading(true);
        try {
            if (frigoData[frigoSelected]) {
                const dataReduced = reduceDataPoints(frigoData[frigoSelected], intervalMinutes);
                let newData = dataReduced.map((entry: any) => ({
                    date: formatDate(entry.dataOraR),
                    Temp1: parseFloat(entry.Temp1.replace("°", "")),
                    Power: entry.Power === "ON" ? 1 : 0,
                    Time: entry.Time
                }));

                if (startDate === null || endDate === null || startDate.getTime() === endDate.getTime()) {
                    const maxDate = findMaxDate(newData);
                    setStartDate(maxDate);
                    setEndDate(maxDate);
                }
                setData(newData);
            }
        } catch (error) {
            Sentry.captureException(error);
            setMessage((error as Error).message);
        }finally {
            setLoading(false);
        }
    }, [frigoSelected, frigoData, intervalMinutes, loading]);

    useEffect(() => {
        setLoading(true); // Start loading when dates change
        const timer = setTimeout(() => setLoading(false), 500); // Add a small delay to simulate loading
        return () => clearTimeout(timer); // Cleanup the timeout
    }, [startDate, endDate]);

    const dataFiltered = useMemo(() => {
        if (startDate && endDate) {
            return data.filter(entry => entry.date >= startDate && entry.date <= endDate);
        }
        return [];
    }, [startDate, endDate, data]);

    const handleStartDateChange = (date: Date) => {
        if (!startDate) return;

        if ( date > endDate) {
            setMessage("The selected date cannot be later the end date.");
            return;
        }

        const differenceInTime = endDate.getTime() - date.getTime() + 1;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if ( differenceInDays >= 7) {
            setMessage("Please select a range of 7 days or less due to performance reasons.");
        }
        else{
            setLoading(true);
            setStartDate(date);
        }
    }

    const handleEndDateChange = (date: Date) => {
        if (!startDate) return;
        if (endDate < startDate) {
            setMessage("The selected date cannot be beyond the end date.");
            return;
        }
        const differenceInTime = ( date.getTime() +1 ) - startDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        if ( differenceInDays >= 7) {
            setMessage("Please select a range of 7 days or less due to performance reasons.");
        }
        else{
            setLoading(true);
            setEndDate(date);
        }
    }

    if ( table === 'fridgeChart' && frigoData.length === 0) {
        setMessage("No data found");
        return null;
    }

    if (table !== "fridgeChart") return null;

    return (
        <div className="w-full h-auto">
            <div className="flex flex-row gap-4 justify-center">
                <DatePicker
                    className="btn btn-info"
                    selected={startDate}
                    startDate={startDate}
                    onChange={(date) =>handleStartDateChange(date || new Date())}
                    useShortMonthInDropdown
                    minDate={new Date("2000-01-01")}
                    maxDate={new Date("2100-12-31")}
                    dateFormat="dd/MM/yyyy"
                    dropdownMode={"select"}
                    placeholderText="Select a date or range"
                />
                <DatePicker
                    className="btn btn-info"
                    selected={endDate}
                    startDate={endDate}
                    endDate={endDate ? endDate : undefined}
                    onChange={(date) => handleEndDateChange(date || new Date())}
                    useShortMonthInDropdown
                    minDate={new Date("2000-01-01")}
                    maxDate={new Date("2100-12-31")}
                    dateFormat="dd/MM/yyyy"
                    dropdownMode={"select"}
                    placeholderText="Select a date or range"
                />
            </div>
            <div className="w-full h-full flex justify-center items-center">
                { loading ? <span className="loading loading-spinner loading-lg "></span> :
                    <LineChart
                        width={window.innerWidth}
                    height={window.innerHeight - 150}
                    data={dataFiltered}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickCount={10} display={"none"}/>
                    <YAxis />
                    <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const entry = payload[0].payload;
                            const formattedDate = format(entry.date, "dd/MM/yyyy");
                            return (
                                <div className="bg-gray-700 bg-opacity-75 text-white p-2 rounded">
                                    <p>Date: {formattedDate}</p>
                                    <p>Temp1: {entry.Temp1}</p>
                                    <p>Power: {entry.Power === 1 ? "ON" : "OFF"}</p>
                                    <p>Time: {entry.Time}</p>
                                </div>
                            );
                        }
                        return null;
                    }} />
                    <Legend />
                    <Line type="monotone" dataKey="Temp1" stroke="#8884d8" />
                    <Line type="step" dataKey="Power" stroke="#82ca9d" />
                </LineChart>
                }
            </div>
        </div>
    );
}

export default Chart;