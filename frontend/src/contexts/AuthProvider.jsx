import { useState, useMemo } from 'react';
import { AuthContext } from '.';

const { userId } = window.localStorage;

const AuthContextProvider = ({ children }) => {
  console.log('auth provider');
  const [loggedIn, setLoggedIn] = useState(!!userId);

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
