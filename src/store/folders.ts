import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findDiscImagesInFolder } from "../game_management/FindDiscImagesInFolder";

export const FOLDERS_NAME = "folders";

export interface FolderState {
  selectedFolders: string[];
  imageFiles: string[];
}

const initialState: FolderState = {
  selectedFolders: [],
  imageFiles: [],
};

export const updateImageFiles = createAsyncThunk(
  "updateImageFiles",
  (selectedFolders: string[], thunkAPI) => {
    return findDiscImagesInFolder(selectedFolders[0]);
  }
);

export const { actions, reducer } = createSlice({
  name: FOLDERS_NAME,
  initialState,
  reducers: {
    setSelectedFolder: (state, action: PayloadAction<string[]>) => {
      state.selectedFolders = action.payload;
    },
    setGDIFiles: (state, action: PayloadAction<string[]>) => {
      state.imageFiles = action.payload;
    },
  },
  extraReducers: {
    [updateImageFiles.fulfilled.toString()]: (
      state,
      action: PayloadAction<string[]>
    ) => {
      console.log("Async thunk worked?");
      console.log(action.payload);
      state.imageFiles = action.payload;
    },
  },
});
