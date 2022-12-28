export default {
  translation: {
    yup: {
      errors: {
        userAlreadyExists: 'Такой пользователь уже существует',
        authError: 'Неверные имя пользователя или пароль',
        userNameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordsDiffer: 'Пароли должны совпадать',
        required: 'Обязательное поле',
        networkError: 'Ошибка соединения',
        requestError: 'Запрос к серверу завершился с ошибкой',
      },
    },
    titles: {
      login: 'Войти',
      signup: 'Регистрация',
      noAccount: 'Нет аккаунта?',
      headerLogo: 'Hexlet Chat',
    },
    form: {
      login: {
        userName: 'Ваш ник',
        password: 'Пароль',
      },
      signup: {
        userName: 'Имя пользователя',
        password: 'Пароль',
        retypePassword: 'Подтвердите пароль',
      },
    },
    buttonNames: {
      login: 'Войти',
      logout: 'Выйти',
      signup: 'Зарегистрироваться',
    },
  },
};
