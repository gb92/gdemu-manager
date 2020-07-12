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
import { useTranslation } from "react-i18next";
import ErrorBoundary from "./ErrorBoundary";
import useFilePicker from "./hooks/useFilePicker";

const minSize = { width: 500, height: 520 };
const winIcon = new QIcon(path.resolve(__dirname, nodeguiIcon));

function App() {
  const { t } = useTranslation();
  const { selectedFiles, openPicker } = useFilePicker();

  const menuAction = useMemo(() => {
    const action = new QAction();
    action.setText("Open");

    action.addEventListener("triggered", () => {
      openPicker();
    });
    return action;
  }, [openPicker]);

  const menuActions = useMemo(() => [menuAction], [menuAction]);
  return (
    <Window
      windowIcon={winIcon}
      windowTitle={t("gdemu-sdcard-manager")}
      minSize={minSize}
      styleSheet={styleSheet}
    >
      <ErrorBoundary>
        <MenuBar nativeMenuBar={true}>
          <Menu title="File" actions={menuActions} />
        </MenuBar>
        <View style={containerStyle}>
          <Text id="welcome-text">{t("title") as string}</Text>
          <Text id="step-1">1. Play around</Text>
          <StepOne />
          <Text id="step-2">{selectedFiles?.join(",")}</Text>
          <StepTwo />
        </View>
      </ErrorBoundary>
    </Window>
  );
}

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
