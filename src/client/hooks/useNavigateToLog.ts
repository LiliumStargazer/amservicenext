import {usePathname, useRouter} from "next/navigation";
import useStore from "@/app/store";

const useNavigateToLog = () => {
    const router = useRouter();
    const pathname = usePathname();
    const table = useStore(state => state.table);
    const setTable = useStore(state => state.setTable);

    return () => {
        if (!pathname.includes("/log")) {
            router.push("/log");
        }
        if (table !== "master")
            setTable("master");
    };
};

export default useNavigateToLog;