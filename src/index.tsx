import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import App from "./app";
import I18nInit from "./I18nInit";

// Initialize React I18n
I18nInit();

process.title = "gdemu-manager";
Renderer.render(<App />);
// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(["./app"], function () {
    Renderer.forceUpdate();
  });
}
