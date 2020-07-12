import { Text, Window, hot, View, Menu, MenuBar } from "@nodegui/react-nodegui";
import React, { useState, useMemo } from "react";
import {
  QIcon,
  QAction,
  QFileDialog,
  FileMode,
  AcceptMode,
} from "@nodegui/nodegui";
import path from "path";
import { StepOne } from "./components/stepone";
import { StepTwo } from "./components/steptwo";
import nodeguiIcon from "../assets/nodegui.jpg";

const minSize = { width: 500, height: 520 };
const winIcon = new QIcon(path.resolve(__dirname, nodeguiIcon));
const App = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>();

  const filePicker = useMemo(() => {
    const picker = new QFileDialog();

    picker.setFileMode(FileMode.Directory);
    picker.setAcceptMode(AcceptMode.AcceptOpen);
    return picker;
  }, []);

  const menuAction = useMemo(() => {
    const action = new QAction();
    action.setText("Open");

    action.addEventListener("triggered", () => {
      filePicker.exec();
      setSelectedFiles(filePicker.selectedFiles());
    });
    return action;
  }, [filePicker]);

  const menuActions = useMemo(() => [menuAction], [menuAction]);
  return (
    <Window
      windowIcon={winIcon}
      windowTitle="gdemu-sdcard-manager"
      minSize={minSize}
      styleSheet={styleSheet}
    >
      <MenuBar nativeMenuBar={true}>
        <Menu title="File" actions={menuActions} />
      </MenuBar>
      <View style={containerStyle}>
        <Text id="welcome-text">Welcome to NodeGui 🐕</Text>
        <Text id="step-1">1. Play around</Text>
        <StepOne />
        <Text id="step-2">{selectedFiles?.join(",")}</Text>
        <StepTwo />
      </View>
    </Window>
  );
};

const containerStyle = `
  flex: 1; 
`;

const styleSheet = `
  #welcome-text {
    font-size: 24px;
    padding-top: 20px;
    qproperty-alignment: 'AlignHCenter';
    font-family: 'sans-serif';
  }

  #step-1, #step-2 {
    font-size: 18px;
    padding-top: 10px;
    padding-horizontal: 20px;
  }
`;

export default hot(App);
