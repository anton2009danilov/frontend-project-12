import { Link } from 'react-router-dom';
import page404 from '../images/page-404.svg';

const ErrorPage = () => (
  <div className="text-center">
    <img
      src={page404}
      alt="Страница не найдена"
      className="img-fluid h-25"
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <Link to="/">на главную страницу</Link>
    </p>
  </div>
);
export default ErrorPage;
