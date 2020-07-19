import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FileMode, AcceptMode, QFileDialog } from "@nodegui/nodegui";
import { useTypedSelector } from "../store";
import { actions } from "../store/folders";

export const useSelectedOutputFolder = () => {
  return useTypedSelector((state) => {
    console.log(state);
    return state?.folders?.selectedOutputFolder;
  });
};

const useOutputFolderPicker = () => {
  const selectedOutputFolder = useSelectedOutputFolder();
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
    dispatch(actions.setSelectedOutputFolder(selectedFile));
  }, [filePicker, dispatch]);

  return { selectedOutputFolder, openPicker };
};

export default useOutputFolderPicker;
