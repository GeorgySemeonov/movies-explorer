export function errors(err) {
    if (err.status === 400) {
      return `Ошибка ${err.status}. Не верно заполнено одно из полей.`;
    } else if (err.status === 401) {
      return `Ошибка ${err.status}. Вы ввели неправильный логин или пароль.`;
    } else if (err.status === 403) {
      return `Ошибка ${err.status}. Токен не передан или передан не в том формате.`;
    } else if (err.status === 404) {
      return `Ошибка ${err.status}. Данные не найдены.`;
    } else if (err.status === 409) {
      return `Ошибка ${err.status}. Пользователь с таким email уже существует.`;
    } else if (err.status === 429) {
      return `Ошибка ${err.status}. Слишком много запросов. Попробуйте позже.`;
    } else if (err.status === 500) {
      return `Ошибка ${err.status}. На сервере произошла ошибка.`;
    } else {
      return `Ошибка ${err.status}. Ошибка сервера.`;
    }
  }