import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    // this slice name
    name: "user",
    // initial state of the userslie
    initialState: null,
    //  reducer 
    reducers: {
        // action for adding the user
        addUser: (state, action) => {
            return action.payload;
        },
        // action for rremoving the user
        removeUser: (state, action) => {
            return null;
        }
    }
})


export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
