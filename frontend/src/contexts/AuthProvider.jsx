import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import fetchInitialData from '../slices/fetchInitialData';
import { AuthContext } from '.';

const AuthContextProvider = ({ children }) => {
  console.log('auth provider');
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (data, username) => {
    const { token } = data;
    dispatch(fetchInitialData(token));
    localStorage.setItem('userId', token);
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
