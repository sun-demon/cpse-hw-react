import pigeon from './pigeon.png';
import $ from 'jquery';


class LoginException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
};
class EmailException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
};
class PasswordException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
};


const hasSpace = function(login) {
    return /\s/.test(login);
};
const validateLogin = function(login) {
    const MAX_LOGIN_LENGTH = 20;
    if (login == '')
        throw new LoginException('Пустое поле');
    if (hasSpace(login))
        throw new LoginException('Есть пробельные символы');
    if (login.length > MAX_LOGIN_LENGTH)
        throw new LoginException('Длина имени больше ' + MAX_LOGIN_LENGTH + ' символов');
};
const validateEmail = (email) => {
    if (String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) == null)
        throw new EmailException('Неверный формат');
};
const validatePassword = function(password) {
    const MIN_PASSWORD_LENGTH = 8;
    var hasDigit = /\d/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    if (hasSpace(password))
        throw new PasswordException('Есть пробельные символы');
    if (password < 8)
        throw new PasswordException('Длина пароля меньше ' + MIN_PASSWORD_LENGTH + ' символов');
    if (!hasDigit)
        throw new PasswordException('Нет цифр');
    if (!hasUpperCase)
        throw new PasswordException('Нет заглавных латинских букв');
    if (!hasLowerCase)
        throw new PasswordException('Нет строчных латинских букв');
}


const LoginMain = (props) => {
    const login = (event) => {
        event.preventDefault();
        try {
            var login = $('#login').val();
            var password = $('#password').val();
            validateLogin(login);
            validatePassword(password);
            var exception = null;
            $.ajax({
                url: '/login',
                method: 'post',
                async: false,
                data: { 'login': login, 'password': password},
                statusCode: {
                    200: function(response) { props.setState(response); },
                    401: function(response) { exception = JSON.parse(response.responseText).error; }
                }
            });
            if (exception == null)
                return false;
            switch (exception.class) {
                case 'login':
                    throw new LoginException(exception.message);
                case 'password':
                    throw new PasswordException(exception.message);
                default:
                    console.log(exception);
            }
        } catch (exception) {
            if (exception instanceof LoginException) {
                $('#login').removeClass('is-valid').addClass('is-invalid');
                $('#login~.invalid-feedback').text(exception.message);
                $('#password').removeClass('is-valid is-invalid');
            } else if (exception instanceof PasswordException) {
                $('#login').removeClass('is-invalid');
                $('#password').removeClass('is-valid').addClass('is-invalid');
                $('#password~.invalid-feedback').text(exception.message);
            } else {
                throw exception;
            }
            return false;
        }
    };
    
    return (
        <main>
            <div className="container py-5">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={pigeon} className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form id="login-form" onSubmit={login} noValidate>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="login">Имя пользователя</label>
                                <input type="text" id="login" className="form-control form-control-lg"/>
                                <div className="invalid-feedback">Неверное имя пользователя</div>
                                <div className="valid-feedback">Верное имя пользователя</div>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="password">Пароль</label>
                                <input type="password" id="password" className="form-control form-control-lg"/>
                                <div className="invalid-feedback">Неверный пароль</div>
                            </div>
                            <div className="column d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Войти</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};


const RegisterMain = (props) => {
    const register = (event) => {
        event.preventDefault();
        try {
            var login = $('#login').val();
            var email = $('#email').val();
            var password = $('#password').val();
            validateLogin(login);
            validateEmail(email);
            validatePassword(password);
            var exception = null;
            $.ajax({
                url: '/register',
                method: 'post',
                async: false,
                data: { 'login': login, 'email': email, 'password': password},
                statusCode: {
                    200: function(response) { props.setState(response) },
                    401: function(response) { exception = JSON.parse(response.responseText).error; }
                }
            });
            if (exception == null)
                return false;
            switch (exception.class) {
                case 'login':
                    throw new LoginException(exception.message);
                case 'email':
                    throw new EmailException(exception.message);
                case 'password':
                    throw new PasswordException(exception.message);
            }
            return true;
        } catch (exception) {
            if (exception instanceof LoginException) {
                $('#login').removeClass('is-valid').addClass('is-invalid');
                $('#login~.invalid-feedback').text(exception.message);
                $('#email').removeClass('is-valid is-invalid');
                $('#password').removeClass('is-valid is-invalid');
            } else if (exception instanceof EmailException) {
                $('#login').removeClass('is-valid is-invalid');
                $('#email').removeClass('is-valid').addClass('is-invalid');
                $('#email~.invalid-feedback').text(exception.message);
                $('#password').removeClass('is-valid is-invalid');
            } else if (exception instanceof PasswordException) {
                $('#login').removeClass('is-valid is-invalid');
                $('#email').removeClass('is-valid is-invalid');
                $('#password').removeClass('is-valid').addClass('is-invalid');
                $('#password~.invalid-feedback').text(exception.message);
            } else {
                throw exception;
            }
            return false;
        }
    }

    return (
        <main>
            <div className="container py-5">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={pigeon} className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form id="register-form" onSubmit={register} novalidate>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="login">Имя пользователя</label>
                                <input type="text" id="login" className="form-control form-control-lg"/>
                                <div className="invalid-feedback">Неверное имя пользователя</div>
                                <div className="valid-feedback">Верное имя пользователя</div>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="login">Электронная почта</label>
                                <input type="email" id="email" className="form-control form-control-lg"/>
                                <div className="invalid-feedback">Неверный адрес</div>
                                <div className="valid-feedback">Верный адрес</div>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="password">Пароль</label>
                                <input type="password" id="password" className="form-control form-control-lg"/>
                                <div className="invalid-feedback">Неверный пароль</div>
                            </div>
                            <div className="column d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Зарегистрироваться</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}


const News = ({news, index}) => (
    <tr>
        <th scope="row">{index}</th>
        <td>{news.login}</td>
        <td>{news.text}</td>
    </tr>
);


const NewsMain = (props) => {
    const addNew = (event) => {
        event.preventDefault();
        var text = $('#new input').val();
        if (text == '')
            return false;
        $.ajax({
            url: '/add-new',
            method: 'post',
            async: false,
            data: {'text': text},
            statusCode: {
                200: function(response) { 
                    $('#name').val('');
                    props.setState(response);
                },
                401: function(response) { console.log(response); }
            }
        });
        return false;
    }

    return (
        <main>
            <div className="container py-5">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={pigeon} className="img-fluid" alt="Phone image"/>
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <table id="news" className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Автор</th>
                                    <th scope="col">Новость</th>
                                </tr>
                            </thead>
                            <tbody>
                                { props.state.news.map((news, index) => <News news={news} key={index} index={index + 1}/> )}
                            </tbody>
                        </table>
                        <br/>
                        <form id="new" onSubmit={addNew}>
                            <input type="text" id="name" placeholder="Ваша новость"/>
                            <button type="submit" className="btn border-primary bg-none text-primary">Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}


const Main = (props) => {
    switch (props.state.title) {
        case 'login':
            return <LoginMain {...props}/>
        case 'register':
            return <RegisterMain {...props}/>
        default:
            return <NewsMain {...props}/>
    }
};


export default Main;
