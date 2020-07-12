import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FileMode, AcceptMode, QFileDialog } from "@nodegui/nodegui";
import { useTypedSelector } from "../store";
import { actions } from "../store/folders";

const useSelectedFiles = () => {
  return useTypedSelector((state) => {
    console.log(state);
    return state?.folders?.selectedFolders;
  });
};

const useFilePicker = () => {
  const selectedFiles = useSelectedFiles();
  const dispatch = useDispatch();

  const filePicker = useMemo(() => {
    const picker = new QFileDialog();

    picker.setFileMode(FileMode.Directory);
    picker.setAcceptMode(AcceptMode.AcceptOpen);
    return picker;
  }, []);

  const openPicker = useCallback(() => {
    filePicker.exec();
    dispatch(actions.SET_SELECTED_FOLDER(filePicker.selectedFiles()));
  }, [filePicker, dispatch]);

  return { selectedFiles, openPicker };
};

export default useFilePicker;
