import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    // check if the user aldreay logged in if not set it to null
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

const ProfileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },

        setLoading(state,value){
            state.user = value.payload;
        }
    }
});


export const {setUser, setLoading} = ProfileSlice.actions;
export default ProfileSlice.reducer;