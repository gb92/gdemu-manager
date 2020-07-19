import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findDiscImagesInFolder } from "../game_management/FindDiscImagesInFolder";

export const FOLDERS_NAME = "folders";

export interface FolderState {
  selectedInputFolder?: string;
  imageFiles: string[];
  selectedOutputFolder?: string;
}

const initialState: FolderState = {
  selectedInputFolder: undefined,
  selectedOutputFolder: undefined,
  imageFiles: [],
};

export const updateImageFiles = createAsyncThunk(
  "updateImageFiles",
  (selectedFolder: string, thunkAPI) => {
    return findDiscImagesInFolder(selectedFolder);
  }
);

export const { actions, reducer } = createSlice({
  name: FOLDERS_NAME,
  initialState,
  reducers: {
    setSelectedInputFolder: (state, action: PayloadAction<string>) => {
      state.selectedInputFolder = action.payload;
    },
    setSelectedOutputFolder: (state, action: PayloadAction<string>) => {
      state.selectedOutputFolder = action.payload;
    },
    setImageFiles: (state, action: PayloadAction<string[]>) => {
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
