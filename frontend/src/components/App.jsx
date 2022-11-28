// import './App.css';
import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  // Route,
  // Link,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import Header from './Header';
import Root from './MainPage';
import Login from './LoginPage';
import ErrorPage from './ErrorPage';
import AuthProvider from '../contexts/AuthProvider';
// import logo from './logo.svg';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const { userId } = window.localStorage;

      if (!userId) {
        return redirect('/login');
      }

      return null;
    },
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Header />
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>
);

export default App;
