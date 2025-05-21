'use client'

import React, { useEffect, useState, useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {ChartData, RawFridgeData} from "@/app/types/types";
import {formatStringDateOrder, getTimeString} from "@/app/utils/utils";
import {translateFrigoState} from "@/app/utils/device-costants";
import SelectRange from "@/app/components/SelectRange";

interface ChartProps {
    fridgeRawData: RawFridgeData[];
    fridgeSelected: number;
    setMessage: (message: string) => void;
}

const ContainerChartFridge: React.FC <ChartProps> = ({fridgeRawData, fridgeSelected, setMessage}) => {
    const [intervalMinutes, setIntervalMinutes] = useState(0);
    const [startDate, setStartDate] = useState(new Date(Date.now() - 86400000));
    const [endDate, setEndDate] = useState(new Date());
    const [chartsData, setChartsData] = useState<{ [key: string]: ChartData[] }>({});
    const [data, setData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);

    function formatDate(dateString: string): Date {
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    function findMaxDate(entries: ChartData[]): Date {
        return new Date(Math.max(...entries.map(entry => new Date(entry.date).getTime())));
    }

    function reduceDataPoints(data: ChartData[], minutes: number) {
        if (minutes <= 0) return data; // no reduction

        const milliseconds = minutes * 60 * 1000;
        const result: ChartData[] = [];
        let lastDate: Date | null = null;

        for (const entry of data) {
            const [hours, minutes, seconds] = entry.Time.split(':').map(Number);
            const currentDate = new Date(entry.date);
            currentDate.setHours(hours, minutes, seconds, 0);

            if (!lastDate || (currentDate.getTime() - lastDate.getTime()) >= milliseconds) {
                result.push(entry);
                lastDate = currentDate;
            }
        }

        return result;
    }

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
        const differenceInTime = endDate.getTime() - date.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        console.log('difference in days in StartDate', startDate, endDate, differenceInDays);
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


    useEffect(() => {

        if (fridgeRawData && Array.isArray(fridgeRawData)) {
            if (fridgeRawData.length === 0) {
                setMessage('No fridge data found');
                setLoading(false);
                return;
            }
            const frigoDataCopy = [...fridgeRawData];
            const groupedChartData = frigoDataCopy.reduce((acc: { [key: string]: ChartData[] }, rawFridgeItem: RawFridgeData) => {
                const formatDateString = formatStringDateOrder(rawFridgeItem.DataOraR);
                const date = formatDate(formatDateString);
                const temperatureString = rawFridgeItem.Temperature1 ? parseFloat(rawFridgeItem.Temperature1).toFixed(2) + "°" :
                    rawFridgeItem.Temperature ? parseFloat(rawFridgeItem.Temperature).toFixed(2) : "N/A";
                const temperatureFormatted = temperatureString.replace("°", "");
                const temperature = parseFloat(temperatureFormatted);
                const state = translateFrigoState(parseInt(rawFridgeItem.FrigoState));
                const time = getTimeString(rawFridgeItem.DataOraR);

                const parsedChartData: ChartData = {
                    date: date,
                    Temp1: temperature,
                    Power: state.Power === "ON" ? 1 : 0,
                    Time: time
                };

                if (!acc[rawFridgeItem.IDFrigo]) {
                    acc[rawFridgeItem.IDFrigo] = [];
                }
                acc[rawFridgeItem.IDFrigo].push(parsedChartData);

                return acc;
            }, {});
            setChartsData(groupedChartData);
        }

    }, [fridgeRawData, setMessage]);

    useEffect(() => {
        if (chartsData[fridgeSelected]) {

            console.log('intervalMinutes', intervalMinutes);
            console.log('chartsData', chartsData[fridgeSelected]);

            const dataReduced = reduceDataPoints(chartsData[fridgeSelected], intervalMinutes);
            console.log('dataReduced', dataReduced);
            const newData = dataReduced.map((entry: ChartData): ChartData => ({
                date: entry.date,
                Temp1: entry.Temp1,
                Power: entry.Power,
                Time: entry.Time
            }));

            if (startDate === null || endDate === null || startDate.getTime() === endDate.getTime()) {
                const maxDate = findMaxDate(newData);
                setStartDate(maxDate);
                setEndDate(maxDate);
            }
            setData(newData);
        }
    }, [chartsData, fridgeSelected, intervalMinutes, startDate, endDate]);

    useEffect(() => {
        setLoading(true); // Start loading when dates change
        const timer = setTimeout(() => setLoading(false), 500); // Add a small delay to simulate loading
        return () => clearTimeout(timer); // Cleanup the timeout
    }, [startDate, endDate]);

    if (data.length === 0) {
        return null;
    }

    return (
        <div className="">
            <div className="flex flex-grow gap-4 justify-center mb-4">
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
                <SelectRange setIntervalMinutes={setIntervalMinutes}/>
            </div>
            <div className="flex flex-grow justify-center">
                { loading ?
                    <span className="loading loading-spinner loading-lg "></span>
                    :
                    <LineChart
                    width={window.innerWidth*0.9}
                    height={window.innerHeight*0.8}
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

export default ContainerChartFridge;