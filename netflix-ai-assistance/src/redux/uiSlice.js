import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: "ui",
    initialState: {
        gptModalVisibility: false
    },
    reducers: {
        toggleGptModal: (state) => {
            state.gptModalVisibility = !state.gptModalVisibility
        }
    }
})

export const { toggleGptModal } = uiSlice.actions;
export default uiSlice.reducer