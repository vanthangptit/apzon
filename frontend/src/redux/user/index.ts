import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFUserState {
  isLoading: boolean
  profile?: any
}

const initialState: IFUserState = {
  isLoading: false
};

export const editFirstName = createAsyncThunk<any, any>('USER.ACTION_TYPES.EDIT_FIRST_NAME', async ({ token, data }, thunkAPI) => {
  try {
    const response: any = {
      token,
      data
    };

    return {
      ...response
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const appUsersSlice = createSlice({
  name: 'appUser',
  initialState,
  reducers: {},
  // extraReducers: builder => {}
});

export default appUsersSlice.actions;
