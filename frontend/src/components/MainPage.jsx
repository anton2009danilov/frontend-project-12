import {
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Channels from './Channels';
import Messages from './Messages';
import { setLoadingStatus } from '../slices/userInterfaceSlice';

import MessageForm from './MessageForm';

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentChannelId: initialChannelId, loadingStatus } = useSelector((state) => state.ui);

  useEffect(() => {
    const { userId: token } = window.localStorage;

    if (!token) {
      navigate('/login');
    }

    if (loadingStatus === 'failed') {
      toast.error(t('socketMessages.failedDataLoading'));
      dispatch(setLoadingStatus('idle'));
    }
  }, [dispatch, navigate, loadingStatus, t]);

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
