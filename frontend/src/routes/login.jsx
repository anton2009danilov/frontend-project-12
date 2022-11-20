import { Form, Button, Card } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';

const Login = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              id="username"
              name="username"
              type="text"
              placeholder="Введите имя пользователя"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
            <Form.Text className="text-muted">
              {formik.errors.username}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              onChange={formik.handleChange}
              required
            />
            <Form.Text className="text-muted">
              {formik.errors.password}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
