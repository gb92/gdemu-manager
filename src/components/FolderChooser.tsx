import React, { useCallback } from "react";
import { View, PlainTextEdit, Button, Text } from "@nodegui/react-nodegui";
import { useTranslation } from "react-i18next";

interface Props {
  label: string;
  openPicker: () => void;
  selectedFile?: string;
}
const FolderChooser = ({ label, openPicker, selectedFile }: Props) => {
  const { t } = useTranslation();
  const clickHandler = useCallback(() => {
    openPicker();
  }, [openPicker]);

  return (
    <View
      id="wrapper"
      style={`
        height: 54;
        padding:12;
    `}
    >
      <View
        id="row"
        style={`
          flex: 1;
          flex-direction: row;
        `}
      >
        <Text
          style={`
            flex: 1;
            `}
        >
          {label}
        </Text>
        <PlainTextEdit
          text={selectedFile ? selectedFile : ""}
          placeholderText={t("File Path")}
          readOnly={true}
          style={`
            flex: 2;
        `}
        />
        <Button
          on={{
            clicked: clickHandler,
          }}
          style={`
            paddingLeft: 5;
            paddingRight: 5;
          `}
        >
          {t("Choose Folder")}
        </Button>
      </View>
    </View>
  );
};
export default FolderChooser;
