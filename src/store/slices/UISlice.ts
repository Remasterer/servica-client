import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDashboardMenuExpanded: boolean;
}

const initialState: UIState = {
  isDashboardMenuExpanded: true
};

export const UISlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    sexExpandedDashboardMenu: (state, action: PayloadAction<boolean>) => {
      state.isDashboardMenuExpanded = action.payload;
    }
  }
});

export const { sexExpandedDashboardMenu } = UISlice.actions;

export const uiReducer = UISlice.reducer;
