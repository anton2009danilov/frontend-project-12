import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import axios from 'axios';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useAuth } from '../hooks';
import signUpImage from '../images/signup.jpg';

const SignUp = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [signUpError, setSignUpError] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required(t('yup.errors.required'))
      .min(3, t('yup.errors.userNameLength'))
      .max(20, t('yup.errors.userNameLength')),
    password: yup.string()
      .required(t('yup.errors.required'))
      .min(6, t('yup.errors.passwordLength')),
    retypePassword: yup.string()
      .required(t('yup.errors.required'))
      .oneOf([yup.ref('password')], 'yup.errors.passwordsDiffer'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      retypePassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      setSignUpError('');
      const { username, password } = values;

      axios.post('/api/v1/signup', { username, password }).then((response) => {
        console.log(response.data);
        auth.logIn(response.data, username);
        navigate('/');
      })
        .catch((e) => {
          console.log(e);
          formik.setSubmitting(false);
          setSignUpError(t('yup.errors.signUpError'));
          inputRef.current.select();
        });
    },
  });

  const usernameFieldClass = cn({
    'is-invalid': formik.errors.username,
  });

  const passwordFieldClass = cn({
    'is-invalid': formik.errors.password,
  });

  const retypePasswordFieldClass = cn({
    'is-invalid': signUpError || formik.errors.retypePassword,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card>
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={signUpImage} className="rounded-circle" alt={t('titles.signup')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('titles.signup')}</h1>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    placeholder={t('form.signup.userName')}
                    className={usernameFieldClass}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    noValidate
                  />
                  <Form.Label htmlFor="username">{t('form.signup.userName')}</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.username}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('form.signup.password')}
                    className={passwordFieldClass}
                    onChange={formik.handleChange}
                    noValidate
                  />
                  <Form.Label htmlFor="password">{t('form.signup.password')}</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.password}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-floating">
                  <Form.Control
                    id="retypePassword"
                    name="retypePassword"
                    type="password"
                    placeholder={t('form.signup.retypePassword')}
                    className={retypePasswordFieldClass}
                    onChange={formik.handleChange}
                    noValidate
                  />
                  <Form.Label htmlFor="retypePassword">{t('form.signup.retypePassword')}</Form.Label>
                  <Form.Text className="invalid-tooltip">
                    {formik.errors.retypePassword}
                  </Form.Text>
                  <Form.Text className="text-danger">
                    {signUpError}
                  </Form.Text>
                </Form.Group>
                <Button variant="outline-primary" className="w-100 mb-3" type="submit">
                  {t('buttonNames.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
