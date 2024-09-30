import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useStore from "@/app/store";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@/features/log/client/components/tables/gridStyle.css";
import { GridReadyEvent, CellClickedEvent, CellDoubleClickedEvent, ColDef , RowClassParams, FilterChangedEvent } from "ag-grid-community";
import {
    convertT1,
    convertT2,
    convertT4,
    convertTagData,
    defaultColDef,
    filterParams,
    getRowColorClass,
    matchLogEventWithAliveEvents
} from "@/features/log/client/utils/aggrid-helper";
import { getEventsAliveViaSrv, getLatestData, getDataByDate } from "@/features/shared/client/api";
import { formatStringDateOrder } from "@/features/shared/client/utils/utils";
import LottieAnimation from "lottie-react";
import useWindowSize from "@/features/shared/client/hooks/useWindowSize";
import { AgGridReact } from 'ag-grid-react';
import { convertToDevType, convertToFase, convertToState } from "@/features/log/client/utils/event-converter";
import AnimationLottie from "@/features/shared/client/components/AnimationLottie";
import loading_lottie from "@/public/loading_lottie.json";
import no_data_lottie from "@/public/no_data_lottie.json";
import { debounce } from 'lodash';


interface RowData {
    IDR: string;
    DataOraR: string;
    EventString: string;
    State: string;
    DevProducer: string;
    DevIndex: string;
    SubIndex: string;
    Tag1: string;
    Tag2: string;
    Tag3: string;
    Tag4: string;
    Fase: string;
    TagData: string;
    Time: string;
}

const AgGridMasterLog: React.FC = () => {
    const searchValue = useStore(state => state.searchValue);
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const logData = useStore(state => state.logData);
    const setLogData = useStore(state => state.setLogData);
    const logDataFetched = useStore(state => state.logDataFetched);
    const setLogDataFetched = useStore(state => state.setLogDataFetched);
    const setMessage = useStore(state => state.setMessage);
    const setIsDialogOpen = useStore(state => state.setIsDialogOpen);
    const setDialogContent = useStore(state => state.setDialogContent);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
    const [dataChange, setDataChange] = useState(false);
    const [previousDate, setPreviousDate] = useState('');

    const gridApiRef = useRef<any>(null);

    const { height: windowHeight } = useWindowSize();
    const height = Number.isFinite(windowHeight) ? windowHeight : 0;

    const containerStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - (height * 0.08) : 'auto';
        return { width: '100%', height: validHeight };
    }, [height]);

    const gridStyle = useMemo(() => {
        const validHeight = typeof height === 'number' ? height - 100 : 'auto';
        return { height: validHeight, width: '100%' };
    }, [height]);

    const rowClassRules = useMemo(() => ({
        'row-ev-coin-in': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_COIN_IN',
        'row-ev-bnk-in': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_BNK_IN',
        'row-ev-pax-payment': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PAX_PAYMENT',
        'row-ev-ing-payment': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_ING_PAYMENT',
        'row-ev-card-ciclo-ok-eta': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_CARD_CICLO_OK_ETA',
        'row-ev-ticket': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_TICKET',
        'row-ev-dev-sernum': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_DEV_SERNUM',
        'row-ev-dev-sernumchanged': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_DEV_SERNUMCHANGED',
        'row-ev-accensione': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_ACCENSIONE',
        'row-ev-producer-pressed': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PRODUCT_PRESSED',
        'row-ev-wdogfired': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_WDOGFIRED',
        'row-ev-prod-venduto': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PROD_VENDUTO',
        'row-ev-vendsession-end': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_VENDSESSION_END',
        'row-ev-usbl-noise': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_USBL_NOISE',
        'row-ev-usbl-nocom': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_USBL_NOCOM',
        'row-ev-usbl-nocomlong': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_USBL_NOCOMLONG',
        'row-ev-usbdev-detach': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_USBDEV_DETACH',
        'row-ev-bnk-escrow': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_BNK_ESCROW',
        'row-ev-v2-samebnk': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_V2_SAMEBNK',
        'row-ev-adimac-alarm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_ADIMAC_ALARM',
        'row-ev-prod-non-venduto': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PROD_NON_VENDUTO',
        'row-ev-acc-restart': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_ACC_RESTART',
        'row-ev-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_NOCOMM',
        'row-ev-card-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_CARD_NOCOMM',
        'row-ev-bnk-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_BNK_NOCOMM',
        'row-ev-bnk-jammed': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_BNK_JAMMED',
        'row-ev-cac-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_CAC_NOCOMM',
        'row-ev-finger-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_FINGER_NOCOMM',
        'row-ev-c5-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_C5_NOCOMM',
        'row-ev-mot-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_MOT_NOCOMM',
        'row-ev-hop-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_HOP_NOCOMM',
        'row-ev-locker-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_LOCKER_NOCOMM',
        'row-ev-gv-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_GV_NOCOMM',
        'row-ev-prn-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PRN_NOCOMM',
        'row-ev-frigo-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_FRIGO_NOCOMM',
        'row-ev-sanden-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_SANDEN_NOCOMM',
        'row-ev-ifsanden-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_IFSANDEN_NOCOMM',
        'row-ev-adimac-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_ADIMAC_NOCOMM',
        'row-ev-sileaff-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_SILEAFF_NOCOMM',
        'row-ev-pwm-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PWM_NOCOMM',
        'row-ev-serled-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_SERLED_NOCOMM',
        'row-ev-prel-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PREL_NOCOMM',
        'row-ev-cs-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_CS_NOCOMM',
        'row-ev-az-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_AZ_NOCOMM',
        'row-ev-qrb-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_QRB_NOCOMM',
        'row-ev-ing-nocomm': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_ING_NOCOMM',
        'row-ev-pax-error': (params: RowClassParams<RowData>) => params.data?.EventString === 'EV_PAX_ERROR',
    }), []);

    const colDefsBase: ColDef<RowData>[] = useMemo(() => [
       // { headerName: 'ID', field: 'IDR', flex: 1, maxWidth: 70, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false },
        { headerName: 'Data', field: 'DataOraR', flex: 1, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: 'agDateColumnFilter', sortable: false, filterParams: filterParams, suppressHeaderMenuButton: true },
        { headerName: 'Time', field: 'Time', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: true, sortable: false },
        { headerName: 'Evento', field: 'EventString', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Stato', field: 'State', flex: 1, minWidth: 80, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Producer', field: 'DevProducer', flex: 2, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Dev', field: 'DevIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Sub', field: 'SubIndex', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T1', field: 'Tag1', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T2', field: 'Tag2', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T3', field: 'Tag3', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'T4', field: 'Tag4', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Fase', field: 'Fase', flex: 1, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Tag Data', field: 'TagData', flex: 2, minWidth: 140, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, floatingFilter: false },
        { headerName: 'Action', field: 'IDR', flex: 1, minWidth: 90, cellStyle: { whiteSpace: 'nowrap' }, filter: false, sortable: false, valueGetter: () => 'Extract' },
    ], [filterParams]);


    const onCellClicked = useCallback((event: CellClickedEvent) => {
        if (event.colDef.field === 'IDR') {
            const filteredRows = logData.filter(row => row.DataOraR === event.data.DataOraR);
            localStorage.setItem('rowID', JSON.stringify(event.data.IDR));
            localStorage.setItem('extractedData', JSON.stringify(filteredRows));
            const url = `/extracted?`;
            window.open(url, '_blank');
        }

        if (event.colDef.field === 'TagData') {
            const textValue = event.data.EventString;
            if (textValue.includes("EV_PAX_PAYMENT") || textValue.includes("EV_ING_PAYMENT")
                || textValue.includes("EV_MRPAY_EXECUTERECHARGE")
                || textValue.includes("EV_SWEXC")) {
                setIsDialogOpen(true);
                setDialogContent(event.data.TagData);
            }
        }
    }, [logData, setIsDialogOpen, setDialogContent]);

    const onCellDoubleClicked = useCallback((event: CellDoubleClickedEvent) => {
        if (event.colDef.field === 'EventString') {
            const fetchData = async () => {
                try {
                    const rowEvent = event.data.EventString;
                    const data = await getEventsAliveViaSrv();
                    const matchedEvent = matchLogEventWithAliveEvents(data, rowEvent);
                    if (matchedEvent) {
                        setDialogContent(matchedEvent);
                        setIsDialogOpen(true);
                    } else {
                        console.error('matchedEvent is undefined or null');
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData().catch(error => console.error(error));
        }
    }, [setDialogContent, setIsDialogOpen]);

    const getRowIds = useCallback((params: { data: { IDR: string } }) => {
        return String(params.data.IDR);
    }, []);


    const incrementDate = useCallback(
        debounce(() => {
            setLoading(true);
            setPreviousDate(currentDate);
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() + 1);
            const newDateString = newDate.toISOString();
            setDataChange(true);
            setCurrentDate(newDateString);
        }, 300),
        [currentDate, setCurrentDate, setDataChange]
    );


    const decrementDate = useCallback(
        debounce(() => {
            setLoading(true);
            setPreviousDate(currentDate);
            const newDate = new Date(currentDate);
            newDate.setDate(newDate.getDate() - 1);
            const newDateString = newDate.toISOString();
            setDataChange(true)
            setCurrentDate(newDateString);; // Aggiorna solo la parte della data
        }, 300), // Adjust the delay as needed (300ms in this example)
        [currentDate, setCurrentDate, setDataChange]
    );

    const onFilterChanged = useCallback((event: FilterChangedEvent) => {
        const dateFilterModel = event.api.getFilterModel()['DataOraR'];
        if (dateFilterModel && dateFilterModel.dateFrom) {
            const selectedDate = new Date(dateFilterModel.dateFrom);
            setCurrentDate(selectedDate.toISOString());
            setDataChange(true);
        }
    }, [setCurrentDate, setDataChange]);


    const getRowsMap = useCallback((backupData: any) => {
        return backupData.map((value: any, rowIndex: number) => ({
            IDR: rowIndex,
            DataOraR: formatStringDateOrder(value.DataOraR),
            EventString: value.EventString,
            State: convertToState(parseInt(value.State)),
            DevProducer: convertToDevType(parseInt(value.DevProducer ? value.DevProducer : value.DevId)),
            DevIndex: value.DevIndex ? value.DevIndex : value.RelIndex,
            SubIndex: value.SubIndex,
            DevClass: value.DevClass,
            Tag1: convertT1(value.EventString, value.Tag1),
            Tag2: convertT2(value.EventString, value.Tag2),
            Tag3: value.Tag3,
            Tag4: convertT4(value.EventString, value.Tag4).value,
            Fase: convertToFase(parseInt(value.Fase)),
            TagData: convertTagData(value.EventString, value.TagData, value.Tag1, value.Tag2, value.Tag3),
            Time: value.DataOraR.slice(11),
            rowColor: getRowColorClass(value.EventString),
        }));
    }, [formatStringDateOrder, convertToState, convertToDevType, convertT1, convertT2, convertT4, convertToFase, convertTagData, getRowColorClass]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        console.log('Grid ready');
        gridApiRef.current = params.api;

        const fetchDataOnGridReady = async () => {
            try {
                setMessage('');
                if (!serial || logDataFetched){
                    return;
                }

                const backupData = await getLatestData(serial, backupSelected);

                if (backupData.error) {
                    setMessage("Database corrupted: " + backupData.error);
                    return;
                }

                if (!backupData || backupData.length === 0)
                    return;

                const lenght = backupData.length -1;
                setCurrentDate(backupData[lenght].DataOraR )
                const rows = getRowsMap(backupData);

                setLogData(rows);
                setLogDataFetched(true);
            } catch (error) {
                console.error('Error while downloading backup:', error);
                setMessage("An error occurred while downloading the backup.");
            } finally {
                setLoading(false);
            }
        }
        setLoading(true);
        if (logDataFetched) {
            const lenght = logData.length -1;
            setCurrentDate(logData[lenght].DataOraR )
            const rows = getRowsMap(logData);
            setLogData(rows);
            setLoading(false);
        }else{
            fetchDataOnGridReady().catch(err => console.error('Error in fetchData:', err));
        }
    }, [serial, backupSelected]);


    useEffect(() => {
        if (gridApiRef.current) {
            const params: GridReadyEvent = {
                api: gridApiRef.current,
                type: 'gridReady',
                context: {},
            };
            if (serial && serial.length > 0)
                onGridReady(params);
        }
    }, [serial, onGridReady]);


   useEffect(() => {
        if (!currentDate || currentDate.length == 0 || !logDataFetched || !dataChange) {
            console.log('nothing is changed');
            console.log('currentDate', currentDate);
            console.log('logDataFetched', logDataFetched);
            console.log('dataChange', dataChange);
            return;
        } else {
            try {
                const fetchDataOnDateChange = async () => {
                    if (!serial) return;

                    const backupData = await getDataByDate(serial, backupSelected, currentDate);
                    console.log('backupData', backupData);
                    if (backupData.error) {
                        setMessage("Database corrupted: " + backupData.error);
                        return;
                    }
                    if (!backupData || backupData.length === 0){
                        setCurrentDate(previousDate);
                        return;
                    }
                    const rows = getRowsMap(backupData);
                    setLogData(rows);
                    setDataChange(false);
                };
                setLoading(true);
                fetchDataOnDateChange().catch(err => console.error('Error in fetchData:', err));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
    }, [currentDate]);



    if (!loading && !logDataFetched) {
        return (
            <div className="flex justify-center items-center h-screen" style={containerStyle}>
                <div>
                    <AnimationLottie file={no_data_lottie}/>
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div className="mt-1 mb-3 ml-3">
                <button className="btn btn-info mr-3" onClick={decrementDate}>-1 Day</button>
                <button className="btn btn-info" onClick={incrementDate}>+1 Day</button>
            </div>
            <div className={"ag-theme-quartz-dark compact"} style={gridStyle}>
                <AgGridReact<RowData>
                    loading={loading}
                    rowData={logData}
                    columnDefs={colDefsBase}
                    defaultColDef={defaultColDef}
                    quickFilterText={searchValue}
                    onCellClicked={onCellClicked}
                    onCellDoubleClicked={onCellDoubleClicked}
                    animateRows={false}
                    cacheQuickFilter={true}
                    rowBuffer={500}
                    getRowId={getRowIds}
                    rowClassRules={rowClassRules}
                    onFilterChanged={onFilterChanged}
                    onGridReady={onGridReady}
                />
            </div>
        </div>

    );
}

export default AgGridMasterLog;