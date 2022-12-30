import {
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks';
import Channels from './Channels';
import Messages from './Messages';

import MessageForm from './MessageForm';

const MainPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const { currentChannelId: initialChannelId } = useSelector((state) => state.ui);

  useEffect(() => {
    console.log('useEffect');
    const { userId: token, userName: username } = window.localStorage;

    if (!token) {
      navigate('/login');
    }

    if (!initialChannelId) {
      auth.logIn({ token, username }, username);
    }
  });

  return initialChannelId
    ? (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <Messages />
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    )
    : null;
};

export default MainPage;
