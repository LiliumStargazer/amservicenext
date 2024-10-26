import { useState, useEffect } from 'react';
import useStore from "@/app/store";

function usePasswordLevels() {
    const password = useStore(state => state.password);
    const setPassword = useStore(state => state.setPassword);
    const [level1, setLevel1] = useState<string>('********');
    const [level2, setLevel2] = useState<string>('********');
    const [level3, setLevel3] = useState<string>('********');
    const [level4, setLevel4] = useState<string>('********');

    useEffect(() => {
        if (password) {
            const intValue = parseInt(password);
            const now = new Date();
            const currentHour = now.getHours();
            const currentDayOfMonth = now.getDate();

            setLevel1((intValue + 1).toString());
            setLevel2((intValue + 2).toString());
            setLevel3((intValue + currentHour + 13).toString());
            setLevel4((((intValue * 17 * (currentDayOfMonth + currentHour)) + 1000) % 9999 + 1).toString());
        } else {
            setLevel1('********');
            setLevel2('********');
            setLevel3('********');
            setLevel4('********');
        }
    }, [password]);

    return { level1, level2, level3, level4, setPassword, password };
}

export default usePasswordLevels;