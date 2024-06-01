import { refetchTable, stopRefetchTable } from "@/store/table";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"


export const useTable = () => {
    const tableStore = useSelector((state: any) => state.table);
    const dispatch = useDispatch();
    const onRefetchTable = () => {
        dispatch(refetchTable());
    }
    const onStopRefetchTable = () => {
        dispatch(stopRefetchTable());
    }
    return {
        tableStore,
        onRefetchTable,
        onStopRefetchTable,
    }
}