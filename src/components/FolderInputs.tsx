import React from "react";
import FolderChooser from "./FolderChooser";
import useInputFolderPicker from "../hooks/useInputFolderPicker";
import useOutputFolderPicker from "../hooks/useOutputFolderPicker";
import { useTranslation } from "react-i18next";

const FolderInputs = () => {
  const { t } = useTranslation();
  const { selectedInputFolder, openPicker } = useInputFolderPicker();
  const {
    selectedOutputFolder,
    openPicker: openOutputPicker,
  } = useOutputFolderPicker();
  return (
    <>
      <FolderChooser
        label={t("Input Folder")}
        openPicker={openPicker}
        selectedFile={selectedInputFolder}
      />
      <FolderChooser
        label={t("Output Folder")}
        openPicker={openOutputPicker}
        selectedFile={selectedOutputFolder}
      />
    </>
  );
};

export default FolderInputs;
