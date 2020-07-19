import { Text, Window, hot, View, Menu, MenuBar } from "@nodegui/react-nodegui";
import React, { useMemo } from "react";
import { QIcon, QAction } from "@nodegui/nodegui";
import path from "path";
import gdromLogo from "./static/assets/GD-ROM_logo.png";
import { useTranslation } from "react-i18next";
import ErrorBoundary from "./ErrorBoundary";
import useInputFolderPicker from "./hooks/useInputFolderPicker";
import FolderInputs from "./components/FolderInputs";
import useOutputFolderPicker from "./hooks/useOutputFolderPicker";

const minSize = { width: 500, height: 520 };
const winIcon = new QIcon(path.resolve(__dirname, gdromLogo));

function App() {
  const { t } = useTranslation();
  const { openPicker: openInputPicker } = useInputFolderPicker();
  const { openPicker: openOutputPicker } = useOutputFolderPicker();

  const menuActions = useMemo(() => {
    const inputAction = new QAction();
    inputAction.setText(t("Choose Input Folder"));
    inputAction.addEventListener("triggered", () => {
      openInputPicker();
    });
    const outputAction = new QAction();
    outputAction.setText(t("Choose Output Folder"));
    outputAction.addEventListener("triggered", () => {
      openOutputPicker();
    });
    return [inputAction, outputAction];
  }, [t, openOutputPicker, openInputPicker]);

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
          <Text id="welcome-text">
            {t("Welcome to gdemu-manager") as string}
          </Text>
          <FolderInputs />
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
