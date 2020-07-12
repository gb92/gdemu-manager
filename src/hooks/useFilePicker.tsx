import { useState, useMemo, useCallback } from "react";
import { FileMode, AcceptMode, QFileDialog } from "@nodegui/nodegui";

const useFilePicker = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>();

  const filePicker = useMemo(() => {
    const picker = new QFileDialog();

    picker.setFileMode(FileMode.Directory);
    picker.setAcceptMode(AcceptMode.AcceptOpen);
    return picker;
  }, []);

  const openPicker = useCallback(() => {
    filePicker.exec();
    setSelectedFiles(filePicker.selectedFiles());
  }, [filePicker]);

  return { selectedFiles, openPicker };
};

export default useFilePicker;
