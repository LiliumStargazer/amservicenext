import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons/faKey";

function CalcPassword() {

    const [password, setPassword] = useState('');
    const [level1, setLevel1] = useState('********');
    const [level2, setLevel2] = useState('********');
    const [level3, setLevel3] = useState('********');
    const [level4, setLevel4] = useState('********');

    useEffect(() => {
        if (password){
            const intValue = parseInt(password);
            const now = new Date();
            const currentHour = now.getHours();
            const currentDayOfMonth = now.getDate();

            setLevel1((intValue + 1).toString());
            setLevel2((intValue + 2).toString());
            setLevel3((intValue + currentHour + 13).toString());
            setLevel4((((intValue * 17 * (currentDayOfMonth + currentHour)) + 1000) % 9999 + 1).toString());
        }
        else{
            setLevel1('********');
            setLevel2('********');
            setLevel3('********');
            setLevel4('********');
        }

    }, [password]);

    return (
        <div>
            <div className="mockup-code w-72 h-96 text-sm">
                <div className="justify-center text-center mb-6">
                    <FontAwesomeIcon icon={faKey} size="10x" style={{color: "#63E6BE"}}/>
                </div>
                <pre data-prefix="$"><code>Insert Password </code></pre>
                <pre data-prefix=">" className="text-white pt-2 pb-2">
                    <input type="text"
                           placeholder="Type here"
                           className="input input-sm input-bordered w-48"
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}
                    />
                </pre>
                <pre data-prefix=">" className="text-info"><code>Level 1 : {level1}</code></pre>
                <pre data-prefix=">" className="text-warning"><code>Level 2 : {level2}</code></pre>
                <pre data-prefix=">" className="text-success"><code>Level 3 : {level3}</code></pre>
                <pre data-prefix=">" className="text-primary"><code>Level 4 : {level4}</code></pre>
            </div>
        </div>
    )
}

export default CalcPassword;
