import React, { useEffect, useContext, useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {Context} from "@/app/Context";

function Chart() {
    const { frigoTables, frigoSelected } = useContext(Context);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);

    function formatDate(dateString) {
        let parts = dateString.split("/");
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1;
        let year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    function findMaxDate(entries) {
        const maxDate = new Date(Math.max(...entries.map(entry => new Date(entry.date))));
        return maxDate;
    }

    useEffect(() => {

        if (frigoTables[frigoSelected]) {
            let newData = frigoTables[frigoSelected].map(entry => ({
                date: formatDate(entry.dataOraR),
                Temp1: parseFloat(entry.Temp1.replace("°", "")),
                Power: entry.Power === "ON" ? 1 : 0,
                Time: entry.Time
            }));

            const maxDate = findMaxDate(newData);
            setStartDate(maxDate);
            setEndDate(maxDate);
            setData(newData);
        }
    }, [frigoSelected, frigoTables]);

    useEffect(() => {
        const newData = [...data];
        newData.reverse();
        setDataFiltered(newData.filter(entry => entry.date >= startDate && entry.date <= endDate));
    }, [startDate, endDate, data]);

    return (
        <div className="w-full h-full">
            <div className="mb-4 space-x-3 flex justify-center">
                <div className="relative">
                    <DatePicker
                        className="btn btn-info"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="relative">
                    <DatePicker
                        className="btn btn-info"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>
            <div className="w-full h-full">
                <LineChart
                    width={window.innerWidth}
                    height={window.innerHeight - 150}
                    data={dataFiltered}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" tick={false}/>
                    <YAxis/>
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
                    <Legend/>
                    <Line type="monotone" dataKey="Temp1" stroke="#8884d8"/>
                    <Line type="step" dataKey="Power" stroke="#82ca9d"/>
                </LineChart>
            </div>
        </div>
    );

}

export default Chart;
