import { useCallback, useContext, useRef } from 'react';
import { Context } from "@/app/Context";

function useHandleExtractClick(rows, props) {
    const context = useContext(Context);
    const { searchValue, setMessage } = context;
    const searchValueRef = useRef(searchValue);

    return useCallback(() => {
        if (searchValueRef.current === '') {
            setMessage("Please search first");
            return;
        }
        const filteredRows = rows.filter(row => row.DataOraR === props.data.DataOraR);
        localStorage.setItem('rowID', JSON.stringify(props.data.IDR));
        localStorage.setItem('extractedData', JSON.stringify(filteredRows));
        const url = `/extracted?`;
        window.open(url, '_blank');
    }, [props, rows, setMessage]);
}

export default useHandleExtractClick;