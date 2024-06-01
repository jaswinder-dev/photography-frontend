import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

export const Context = createContext();

const Wrapper = () => {

  /**Common variables and methods for pages*************************************** */

  const [allPosts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arePostsFound, setArePostsFound] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

  //showing alert messages
  const showAlert = (msg) => {
    setLoading(false);
    setIsError(true);
    setError(msg);
    setTimeout(() => {
      setIsError(false);
      setError("");
    }, 4000);
  };

  //showing success messages
  const showSuccess = (msg) => {
    setLoading(false);
    setIsSuccess(true);
    setSuccess(msg);
    setTimeout(() => {
      setIsSuccess(false);
      setSuccess("");
    }, 4000);
  };

  return (
    <Context.Provider value={{
      allPosts,
      setPosts,
      loading,
      setLoading,
      arePostsFound,
      setArePostsFound,
      error,
      setError,
      success,
      setSuccess,
      isSuccess,
      setIsSuccess,
      isError,
      setIsError,
      hasResponded,
      setHasResponded,
      showAlert,
      showSuccess
    }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
);