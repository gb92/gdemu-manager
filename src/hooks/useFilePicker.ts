import { useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FileMode, AcceptMode, QFileDialog } from "@nodegui/nodegui";
import { useTypedSelector } from "../store";
import { actions, updateImageFiles } from "../store/folders";

export const useSelectedFiles = () => {
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
    const selectedFiles = filePicker.selectedFiles();
    dispatch(actions.setSelectedFolder(selectedFiles));
    dispatch(updateImageFiles(selectedFiles));
  }, [filePicker, dispatch]);

  return { selectedFiles, openPicker };
};

export default useFilePicker;
