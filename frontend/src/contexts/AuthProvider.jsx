import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from '.';

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const { userId } = window.localStorage;

  useEffect(() => {
    if (userId) {
      setLoggedIn(true);
    }
  }, [userId]);

  const logIn = (token, username) => {
    localStorage.setItem('userId', JSON.stringify(token));
    localStorage.setItem('userName', username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
