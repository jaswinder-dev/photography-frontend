/** for authentication************************************************************ */

import React from "react";
import { ROUTE } from "../../../config/env";
import { Navigate, Outlet } from "react-router-dom";

//check if the token is expired (token will expire on 7th day of last log in)
const isTokenExpired = (auth) => {
  const date = ((auth).split(";")[1]).split("=")[1];
  if (new Date(date) > new Date(Date.now())) {
    return false;
  }
  return true;
};

const verifyAdmin = (number) => {
  const str = (number.split("2"))[1];
  if (str === '1100') {
    return true;
  }
  return false;
};

const PrivateComponent = () => {
  const isLoggedIn = localStorage.getItem('photographer');
  const json = JSON.parse(isLoggedIn);

  //if not logged in
  if (!isLoggedIn) {
    return <Navigate to={`/admin/${ROUTE}/login`} />;
  }

  //if logged in but, token has expired
  if (isTokenExpired(json.auth)) {
    localStorage.removeItem("photographer");
    return <Navigate to={`/admin/${ROUTE}/login`} />;
  }

  if (verifyAdmin(json.data.authenticationNo)) {
    return <Outlet />;
  } else { //only 'posts' page can be accessed.
    return <Navigate to={`/admin/${ROUTE}/posts`} />;
  }

};

export default PrivateComponent;

