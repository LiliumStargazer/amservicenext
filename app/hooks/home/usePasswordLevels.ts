import { useState, useEffect } from 'react';
import {PasswordLevels} from "@/app/types/types";


function usePasswordLevels(password: string) {
    const [passwords, setPasswords] = useState<PasswordLevels>({
        Level1: '********',
        Level2: '********',
        Level3: '********',
        Level4: '********',
    });

    useEffect(() => {
        if (password) {
            const intValue = parseInt(password);
            const now = new Date();
            const currentHour = now.getHours();
            const currentDayOfMonth = now.getDate();
            const newPasswords: PasswordLevels = {
                Level1: (intValue + 1).toString(),
                Level2: (intValue + 2).toString(),
                Level3: (intValue + currentHour + 13).toString(),
                Level4: (((intValue * 17 * (currentDayOfMonth + currentHour)) + 1000) % 9999 + 1).toString(),
            };
            setPasswords(newPasswords);
        } else {
            const newPasswords: PasswordLevels = {
                Level1: '********',
                Level2: '********',
                Level3: '********',
                Level4: '********',
            };
            setPasswords(newPasswords);
        }
    }, [password]);

    return { passwords };
}

export default usePasswordLevels;