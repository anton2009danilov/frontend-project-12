import { useContext } from 'react';
import AuthContext from '../contexts';
import PlusIcon from '../images/plus-icon.svg';
import ArrowRightIcon from '../images/arrow-right-icon.svg';

const Root = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  console.log(isAuth, setIsAuth);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <img src={PlusIcon} alt="Plus Icon" />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                <span className="me-1">#</span>
                general
              </button>
            </li>
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-0 text-start btn">
                <span className="me-1">#</span>
                random
              </button>
            </li>
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 " />
            <div className="mt-auto px-5 py-3">
              <form onSubmit={(e) => e.preventDefault()} noValidate="" className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
                  <button type="submit" disabled="" className="btn btn-group-vertical">
                    <span className="visually-hidden">Отправить</span>
                    <img src={ArrowRightIcon} alt="Plus Icon" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Root;
