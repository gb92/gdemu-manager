import React, { ErrorInfo } from "react";

import { Text, View } from "@nodegui/react-nodegui";

interface State {
  error?: Error;
  errorInfo?: ErrorInfo;
}
class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <View>
          <Text>Something went wrong.</Text>
          <Text>{this.state.error && this.state.error.toString()}</Text>
          <Text>{this.state.errorInfo.componentStack}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
