import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import { Provider } from "react-redux";

import App from "./app";
import I18nInit from "./I18nInit";
import { store } from "./store";

// Initialize React I18n
I18nInit();

process.title = "gdemu-manager";
Renderer.render(
  <Provider store={store}>
    <App />
  </Provider>,
  {}
);
// This is for hot reloading (this will be stripped off in production by webpack)
if (module.hot) {
  module.hot.accept(["./app"], function () {
    Renderer.forceUpdate();
  });
}
