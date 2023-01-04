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
    socketMessages: {
      successfulChannelCreation: 'Канал создан',
      successfulChannelRename: 'Канал переименован',
      successfulChannelRemove: 'Канал удалён',
      failedDataLoading: 'Ошибка: не удалось получить данные с сервера',
    },
    titles: {
      login: 'Войти',
      signup: 'Регистрация',
      noAccount: 'Нет аккаунта?',
      headerLogo: 'Hexlet Chat',
      pageNotFound: 'Страница не найдена',
    },
    forms: {
      login: {
        userName: 'Ваш ник',
        password: 'Пароль',
      },
      signup: {
        userName: 'Имя пользователя',
        password: 'Пароль',
        retypePassword: 'Подтвердите пароль',
      },
      newMessage: {
        ariaLabel: 'Новое сообщение',
        placeholder: 'Введите сообщение...',
      },
    },
    buttonNames: {
      login: 'Войти',
      logout: 'Выйти',
      signup: 'Зарегистрироваться',
      delete: 'Удалить',
      rename: 'Переименовать',
      send: 'Отправить',
    },
    links: {
      toMainPage_title: 'Но вы можете перейти',
      toMainPage_text: 'на главную страницу',
    },
  },
};
