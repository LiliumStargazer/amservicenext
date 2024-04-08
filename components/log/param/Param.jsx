import React, { useContext, useEffect, useState } from 'react';
import {Context} from "@/app/Context";
import { translateParam } from "./categorizeParam";

function Param() {
    const { param } = useContext(Context);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [params, setParams] = useState([]);

    const categoriesAndParams = {};

    for (const [key, value] of Object.entries(param)) {
        const translated = translateParam({ [key]: value });
        if (translated) {
            const category = translated.category;
            if ( category ){
                if (!categoriesAndParams[category])
                    categoriesAndParams[category] = [];
                if (Array.isArray(translated.value)) {
                    for (const item of translated.value) {
                        categoriesAndParams[category].push(item);
                    }
                }
                else {
                    categoriesAndParams[category].push(translated);
                }
            }
        }
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        if (selectedCategory && categoriesAndParams[selectedCategory]) {
            const selectedParams = categoriesAndParams[selectedCategory];

            const renderParams = selectedParams.map((param, index) => {
                let content;

                switch (selectedCategory) {
                    case "DEVICES":
                        content = `${param.name} - canale: ${param.canale} - Qt: ${param.qt} - Seriale: ${param.seriale}`;
                        break;
                    case "Hopper":
                        content = `Numero: ${param.name} - Canale smistamento: ${param.canale_smistamento} - Ingresso: ${param.ingresso} - Valore moneta: ${param.Valore_moneta}`;
                        break;
                    case "Motori":
                        content = `Tipo: ${(param.name)} - Ingresso: ${param.ingresso} - Codice Prodotto: ${param.productCode} - Capacità: ${param.Capacity}`;
                        break;
                    case "Pannelli":
                        content = `Nome: ${param.Name} - Numero massimo: ${param.numero_massimo} - Visibile: ${param.visibile}`;
                        break;
                    case "Impronte":
                        content = `Id: ${param.id} - Qualità: ${param.qualita} - Codice Fiscale: ${param.cf} - Abilitato: ${param.abilitato ? "True" : "False"}`;
                        break;
                    case "Sicurezza Speciale":
                        content = `Valore Taglio: ${param.valore_taglio} - Numero pezzi prima del blocco: ${param.Numero_pezzi} - Tempo blocco: ${param.Tempo_blocco_min} - Tempo di campionatura: ${param.Tempo_filtro_media_mobile_min} - Abilita gestione a tempo: ${param.gestione_a_tempo}`;
                        break;
                    case "VTE":
                        content = `Nome funzione: ${param.Name} - Data inizio: ${param.inizio ? param.inizio : "non definito"} - Data fine: ${param.fine ? param.fine : "non definito"}`;
                        break;
                    default:
                        content = `${param.name} : ${param.value}`;
                        break;
                }

                return (
                    <div className="mt-2" key={index}>
                        <div role="alert" className="alert bg-neutral text-neutral-content">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="stroke-current shrink-0 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{content}</span>
                        </div>
                    </div>
                );
            });

            setParams(renderParams);
        }
    }, [selectedCategory]);

    return (
        <div className="flex mt-5">
            <div className="flex-auto m-10">
                <div className="flex-auto space-x-2 space-y-2">
                    {Object.entries(categoriesAndParams).map(([category, params], index) => (
                        <button className="btn btn-info " key={index} onClick={() => handleCategoryClick(category)}>
                            {category}
                        </button>
                    ))}
                </div>
                <div className="flex-auto mt-5">
                    {params}
                </div>
            </div>
        </div>
    );
}

export default Param;
