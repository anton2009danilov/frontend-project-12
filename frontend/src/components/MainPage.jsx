import {
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Channels from './Channels';
import Messages from './Messages';

import MessageForm from './MessageForm';

const MainPage = () => {
  const navigate = useNavigate();

  const { currentChannelId: initialChannelId } = useSelector((state) => state.ui);

  useEffect(() => {
    console.log('useEffect');
    const { userId: token } = window.localStorage;

    if (!token) {
      navigate('/login');
    }
  }, []);

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
