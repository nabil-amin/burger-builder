import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTHENTICATE_START,
  };
};

export const authSuccess = (authData, token, userId) => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    authData: authData,
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTHENTICATE_FAIL,
    error: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTHENTICATE_INITIATE_LOGOUT,
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTHENTICATE_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTHENTICATE_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTHENTICATE_USER,
    email: email,
    password: password,
    isSignup: isSignup,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTHENTICATE_CHECK_STATE,
  };
};
