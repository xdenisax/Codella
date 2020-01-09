import React from "react";
import { Route } from "react-router-dom";

class CustomRoute extends React.Component {
  render() {
    const { Layout, Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (
          <Layout>
            <Component {...props}></Component>
          </Layout>
        )}
      />
    );
  }
}

export default CustomRoute;
