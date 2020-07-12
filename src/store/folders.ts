import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const FOLDERS_NAME = "folders";

export interface FolderState {
  selectedFolders: string[];
}

const initialState: FolderState = {
  selectedFolders: [],
};

export const { actions, reducer } = createSlice({
  name: FOLDERS_NAME,
  initialState,
  reducers: {
    SET_SELECTED_FOLDER: (state, action: PayloadAction<string[]>) => {
      state.selectedFolders = action.payload;
    },
  },
});
