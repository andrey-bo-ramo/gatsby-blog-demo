import React from "react";

export const HocButton = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        type: "",
      };
    }
    componentDidMount() {
      this.setState({ type: this.getStylesByType() });
    }
    getStylesByType() {
      if (!this.props.type) {
        return "bg-indigo-600 hover:bg-indigo-700";
      }
      return "";
    }
    render() {
      return (
        <WrappedComponent
          className={`px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${this.state.type}`}
          {...this.props}
        />
      );
    }
  }
  return HOC;
};
