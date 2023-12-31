import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class ErrorHandler extends Component {
    constructor() {
      super();
      this.state = { error: null };
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log("error:", error);
          this.setState({ error: error });
          throw error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
