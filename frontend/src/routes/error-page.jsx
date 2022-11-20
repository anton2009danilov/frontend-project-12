import { useRouteError } from 'react-router-dom';
import page404 from '../images/page-404.svg';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="card d-flex align-items-center">
      <img
        alt="Страница не найдена"
        className="img-fluid w-25"
        src={page404}
      />
      <h1>Страница не найдена</h1>
    </div>
  );
};

export default ErrorPage;
