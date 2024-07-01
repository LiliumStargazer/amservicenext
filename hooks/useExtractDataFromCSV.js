import { useEffect, useState} from 'react';

const useExtractDataFromCSV = (data) => {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        const filteredTechnicians = data
            .map(ticket => ticket.Manutentore)
            .filter((Manutentore, index, self) => self.indexOf(Manutentore) === index);
        setTechnicians(filteredTechnicians);
    }, [data]);

    return technicians;
}

export default useExtractDataFromCSV;