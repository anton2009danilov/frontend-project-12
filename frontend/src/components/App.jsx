/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';
import Header from './Header';
import MainPage from './MainPage';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import AuthProvider from '../contexts/AuthProvider';
import { useAuth } from '../hooks';
import SocketProvider from '../contexts/SocketProvider';
import fetchInitialData from '../slices/fetchInitialData';
import { setError } from '../slices/userInterfaceSlice';
import SignUp from './SignUpPage';

const ErrorDisplay = ({ error }) => (
  <div className="container m-4 text-center">
    {error.message}
  </div>
);

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { authToken: token } = window.localStorage;
  const { error } = useSelector((state) => state.ui);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_POST_CLIENT_ITEM_ACCESS_TOKEN,
    environment: 'production',
    onSendCallback: (isUncaught, args, payload) => {
      const { body: { trace } } = payload;
      dispatch(setError(trace.exception));
    },
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchInitialData(token));
    }

    if (error) {
      toast.error(`${t('yup.errors.renderError')}: ${error.message}`);
      dispatch(setError(null));
    }
  }, []);

  return (
    <React.StrictMode>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary
          fallbackUI={ErrorDisplay}
        >
          <SocketProvider>
            <AuthProvider>
              <Router>
                <div className="d-flex flex-column h-100">
                  <Header />
                  <ErrorBoundary fallbackUI={ErrorDisplay}>
                    <Routes>
                      <Route path={routes.root()} errorElement={<ErrorPage />}>
                        <Route
                          index
                          element={(
                            <PrivateRoute>
                              <MainPage />
                            </PrivateRoute>
                          )}
                        />
                        <Route path={routes.login()} element={<Login />} />
                        <Route path={routes.signup()} element={<SignUp />} />
                        <Route path={routes.notFound()} element={<ErrorPage />} />
                      </Route>
                    </Routes>
                  </ErrorBoundary>
                  <ToastContainer />
                </div>
              </Router>
            </AuthProvider>
          </SocketProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </React.StrictMode>
  );
};

export default App;
