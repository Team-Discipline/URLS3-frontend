import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserType {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

const initialState: UserType = {
    pk: -1,
    username: "",
    email: " ",
    first_name: " ",
    last_name: " ",
};

export const UserSlice = createSlice({
    name: "User",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        storeUser: (state, action: PayloadAction<UserType>) => {
            state.pk = action.payload.pk;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
        },
    },
});

export const { storeUser } = UserSlice.actions;

export default UserSlice.reducer;
