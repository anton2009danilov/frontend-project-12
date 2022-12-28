import axios from 'axios';
import {
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import { setCurrentChannelId } from '../slices/userInterfaceSlice';
import Channels from './Channels';
import Messages from './Messages';

import MessageForm from './MessageForm';

const Root = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentChannelId: initialChannelId } = useSelector((state) => state.ui);

  const { token } = localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId')) : '';

  const loader = (async () => {
    const { userId } = window.localStorage;

    if (!userId) {
      return navigate('/login');
    }

    return null;
  });

  useEffect(() => {
    loader();

    const fetchData = async () => {
      const { data } = await axios.get(
        '/api/v1/data',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const {
        currentChannelId,
        channels,
        messages,
      } = data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      dispatch(setCurrentChannelId(currentChannelId));
    };

    fetchData();
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

export default Root;
