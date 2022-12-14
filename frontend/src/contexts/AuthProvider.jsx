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

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
