import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    refetch: false,
};

const tableSlice = createSlice({
    name: "app.table",
    initialState,
    reducers: {
        refetchTable: (state) => {
            return {...state, refetch: true}
        },
        stopRefetchTable: (state) => {
            return {...state, refetch: false};
        },
        reset: () => initialState
    }
})

export const
{
    refetchTable,
    stopRefetchTable
} = tableSlice.actions

export default tableSlice.reducer;