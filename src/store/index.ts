import { configureStore } from "@reduxjs/toolkit";

import { reducer as folderReducer, FolderState, FOLDERS_NAME } from "./folders";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface RootState {
  [FOLDERS_NAME]: FolderState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    [FOLDERS_NAME]: folderReducer,
  },
});
