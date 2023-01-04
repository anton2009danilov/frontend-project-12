import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import fetchInitialData from '../slices/fetchInitialData';
import { AuthContext } from '.';

const { userId } = window.localStorage;

const AuthContextProvider = ({ children }) => {
  console.log('auth provider');
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(!!userId);

  const logOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => {
      const logIn = (data, username) => {
        const { token } = data;
        dispatch(fetchInitialData(token));
        localStorage.setItem('userId', token);
        localStorage.setItem('userName', username);
        setLoggedIn(true);
      };
      return { loggedIn, logIn, logOut };
    }, [loggedIn, dispatch])}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
