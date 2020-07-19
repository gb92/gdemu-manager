import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FileMode, AcceptMode, QFileDialog } from "@nodegui/nodegui";
import { useTypedSelector } from "../store";
import { actions, updateImageFiles } from "../store/folders";

export const useSelectedInputFolder = () => {
  return useTypedSelector((state) => {
    console.log(state);
    return state?.folders?.selectedInputFolder;
  });
};

const useInputFolderPicker = () => {
  const selectedInputFolder = useSelectedInputFolder();
  const dispatch = useDispatch();

  const filePicker = useMemo(() => {
    const picker = new QFileDialog();

    picker.setFileMode(FileMode.Directory);
    picker.setAcceptMode(AcceptMode.AcceptOpen);
    return picker;
  }, []);

  const openPicker = useCallback(() => {
    filePicker.exec();
    const selectedFiles = filePicker.selectedFiles();

    // For now choose the first of the selected files
    const selectedFile = selectedFiles[0];
    dispatch(actions.setSelectedInputFolder(selectedFile));
    dispatch(updateImageFiles(selectedFile));
  }, [filePicker, dispatch]);

  return { selectedInputFolder, openPicker };
};

export default useInputFolderPicker;
