import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import MainPage from './MainPage';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import AuthProvider from '../contexts/AuthProvider';
import SocketProvider from '../contexts/SocketProvider';
import fetchInitialData from '../slices/fetchInitialData';
import SignUp from './SignUpPage';

const App = () => {
  const dispatch = useDispatch();
  const { userId: token } = window.localStorage;

  useEffect(() => {
    dispatch(fetchInitialData(token));
  });

  return (
    <React.StrictMode>
      <SocketProvider>
        <AuthProvider>
          <Router>
            <div className="d-flex flex-column h-100">
              <Header />
              <Routes>
                <Route path="/" errorElement={<ErrorPage />}>
                  <Route index element={<MainPage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="*" element={<ErrorPage />} />
                </Route>
              </Routes>
              <ToastContainer />
            </div>
          </Router>
        </AuthProvider>
      </SocketProvider>
    </React.StrictMode>
  );
};

export default App;
