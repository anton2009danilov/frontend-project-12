import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Header from './Header';
import Root from './MainPage';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import AuthProvider from '../contexts/AuthProvider';
import SocketProvider from '../contexts/SocketProvider';
import SignUp from './SignUpPage';

const App = () => (
  <React.StrictMode>
    <SocketProvider>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
              <Route path="/" errorElement={<ErrorPage />}>
                <Route index element={<Root />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </SocketProvider>
  </React.StrictMode>
);

export default App;
