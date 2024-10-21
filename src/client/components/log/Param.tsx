import React, { useEffect, useState } from 'react';
import useStore from "@/app/store";
import {
    paramCategoryMapping,
    mapErogDevLayout,
    mapTsParam,
    mapHopperParam,
    mapFingerInfo,
    mapMoneyLineAcceptParam,
    mapVolumeDays,
    mapDeviceParam,
    mapProfili,
    mapPosParam,
    mapFavorite,
    mapVTEContractPackages,
    mapPlanoGrammi, mapPhotolevel, mapFridgeParam, mapMotor,
} from "@/src/client/utils/paramMapping";
import {Category} from "@/src/client/utils/paramMapping";
import {capitalizeFirstLetter} from "@/src/client/utils/utils";
import {apiGetParams} from "@/src/client/api/api";

interface ParamProps {}

const Param: React.FC<ParamProps> = () => {



    const table = useStore(state => state.table);
    const serial = useStore(state => state.serial);
    const backupSelected = useStore(state => state.backupSelected);
    const IDParam = useStore(state => state.IDParam);
    const setMessage = useStore(state => state.setMessage);
    const setTable = useStore(state => state.setTable);
    const [categorySelected, setCategorySelected] = useState<string>('');
    const [param, setParam] = useState<any>({});
    const [localTable, setLocalTable] = useState<React.ReactNode>(null);
    const [loading, setLoading] = useState(true);
    let mappedParams: any[] = [];
    let mappedParam: any = {};

    useEffect(() => {
        console.log('IDParam', IDParam);
        if (table !== "param" || IDParam === '')
            return;

        const fetchParamData = async () => {
            try {
                console.log('fetching param data');
                console.log('serial', serial, 'backupSelected', backupSelected, 'IDParam', IDParam);
                const result = await apiGetParams(serial, backupSelected, IDParam);
                console.log('result', result);
                if (!result || result.length === 0) {
                    setMessage('No param data found');
                    setTable('master');
                    setLoading(false);
                    return;
                }
                setParam(result);
                setLoading(false);
            }catch (error) {
                console.error('Error fetching param:', error);
                setMessage('Error fetching param');
                setTable('master');
                setLoading(false);
            }
        }
        setLoading(true);
        fetchParamData().catch((error) => {console.error('Error fetching param:', error)});
    }, [IDParam]);



    const processEntries = (entries: [string, any][], mapFunction: (key: string, value: any) => void) => {
        entries.forEach(([key, value]) => mapFunction(key, value));
    };

    const processValue = (key: string, value: any) => {
        mappedParam = { ...paramCategoryMapping[key], value: value };
        mappedParams.push(mappedParam);
    };

// Funzioni di mapping per ciascun tipo
    const mappingFunctions: { [key: string]: (value: any) => void } = {
        MpParam: value => processEntries(Object.entries(value), processValue),
        BpParam: value => processEntries(Object.entries(value), processValue),
        ErogDevLayout: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapErogDevLayout(val))),
        TsParam: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapTsParam(val))),
        HopperParam: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapHopperParam(val))),
        DaEvBehaviour: () => { /* skip */ },
        FingerInfo: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapFingerInfo(val))),
        // MoneyLineAcceptParam: value => mappedParams.push(mapMoneyLineAcceptParam(value)),
        MoneyLineAcceptParam: value => {
            processEntries(Object.entries(value), (_, element) => {
                mappedParams.push(mapMoneyLineAcceptParam(element));
            });
        },
        VolumeDays: value => {
            mappedParams.push(mapVolumeDays(value))
            processEntries(Object.entries(value), (_, element) => {
                mappedParams.push(mapVolumeDays(element));
            });
        },
        Device: value => {
            processEntries(Object.entries(value), (_, deviceValue) => {
                if (deviceValue.DeviceType === "PaxIM20") {
                    mappedParams.push(mapPosParam(deviceValue));
                    processEntries(Object.entries(deviceValue.DevPax.PaxParam.TerminalList), (_, element) => {
                        mappedParams.push(mapProfili(element));
                    });
                } else if (deviceValue.DeviceType === "IngenicoIUC160b" || deviceValue.DeviceType === "IngenicoIUP250") {
                    mappedParams.push(mapPosParam(deviceValue));
                    processEntries(Object.entries(deviceValue.DevIngenico.IngenicoParam.TerminalList), (_, element) => {
                        mappedParams.push(mapProfili(element));
                    });
                } else if (deviceValue.DeviceType === "Am_Frigo") {
                    processEntries( Object.entries(deviceValue.AmMocoFrigo.FrigoParamList), (key, element) => {
                        mappedParams.push( mapFridgeParam(element, key));
                    });
                    mappedParams.push(mapDeviceParam(deviceValue));
                }
                else {
                    mappedParams.push(mapDeviceParam(deviceValue));
                }
            });
        },
        Favorites: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapFavorite(val))),
        VideoWeek: value => processEntries(Object.entries(value), (num, val) => {
            mappedParams.push({ category: Category.Video, number: num, value: val });
        }),
        VTEContractPackages: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapVTEContractPackages(val))),
        Planos: value => {
            const graphPlano = value[0].GraphPlano;
            processEntries(Object.entries(graphPlano), (_, val) => {
                mappedParams.push ( mapPlanoGrammi(val) );
            })
        },
        Medium75_Ego: () => { /* skip */ },
        PhotoLevel: value => mappedParams.push(mapPhotolevel[value]),
        IntMotLayout: value => processEntries(Object.entries(value), (_, val) => mappedParams.push(mapMotor(val))),
    };

    Object.entries(param).forEach(([key, value]) => {
        if (!key.includes('Obso')) {
            if (paramCategoryMapping[key] !== undefined) {
                processValue(key, value);
            } else {
                const mapFunction = mappingFunctions[key];
                if (mapFunction) {
                    mapFunction(value);
                } else {
                    // console.log('key: ', key, 'value: ', value);
                }
            }
        }
    });


    const tableProvider = ({ params }: { params: any[] }) => {
        if (!params || params.length === 0) {
            return null;
        }

        return (
            <div className="flex flex-col flex-wrap mt-2 ">
                <table className="table table-md w-full">
                    <thead>
                    <tr>
                        {Object.keys(params[0]).map((key, index) => (
                            key !== 'category' &&
                            <th key={index} style={{ whiteSpace: 'pre-wrap' }}>{capitalizeFirstLetter(String(key))}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        {params.map((param, index) => (
                            <tr key={`${index}-${index}`} className="hover">
                                {Object.entries(param).map(([key, value], subIndex) => (
                                    key !== 'category' &&
                                    <td key={subIndex} className="">{String(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    useEffect(() => {

        if (categorySelected) {
            const table = tableProvider({params: mappedParams.filter(param => param.category === categorySelected)});
            setLocalTable(table);
        }

    }, [categorySelected]);

    if (table !== "param")
        return;

    return (
        <div className="flex-auto m-10">
            <div className="flex-auto space-x-2 space-y-2">
                {Object.values(Category).map((category, index) => (
                    <button
                        className="btn btn-info"
                        key={index}
                        onClick={() => setCategorySelected(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {categorySelected? localTable : <div className=" mt-5 text-center">No data to display, select a category</div>}
        </div>
    );
}

export default Param;