import pigeon from './pigeon.png';
import $ from 'jquery';
import {Formik, Form, Field, ErrorMessage} from 'formik';


const hasSpace = function(login) {
    return /\s/.test(login);
};
const validateLogin = function(login) {
    const MAX_LOGIN_LENGTH = 20;
    if (!login || login === '')
        return 'Пустое поле';
    if (hasSpace(login))
        return 'Есть пробельные символы';
    if (login.length > MAX_LOGIN_LENGTH)
        return 'Длина имени больше ' + MAX_LOGIN_LENGTH + ' символов';
};
const validateEmail = (email) => {
    if (String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) == null)
        return 'Неверный формат';
};
const validatePassword = function(password) {
    const MIN_PASSWORD_LENGTH = 8;
    var hasDigit = /\d/.test(password);
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    if (!password)
        return 'Пустое поле';
    if (hasSpace(password))
        return 'Есть пробельные символы';
    if (password.length < 8)
        return 'Длина пароля меньше ' + MIN_PASSWORD_LENGTH + ' символов';
    if (!hasDigit)
        return 'Нет цифр';
    if (!hasUpperCase)
        return 'Нет заглавных латинских букв';
    if (!hasLowerCase)
        return 'Нет строчных латинских букв';
}


const LoginMain = (props) => (
    <main>
        <div className="container py-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src={pigeon} className="img-fluid" alt="pigeon"/>
                </div>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <Formik initialValues={{login: '', password: ''}}
                            onSubmit={(values, action) => {
                                $.ajax({
                                    url: '/auth/login',
                                    method: 'post',
                                    async: false,
                                    data: values,
                                    statusCode: {
                                        200: function(response) { props.setState(response); },
                                        401: function(response) { 
                                            let exception = JSON.parse(response.responseText).error; 
                                            action.setFieldError(exception.class, exception.message);
                                        }
                                    }
                                });
                            }}
                    >
                        {({errors, touched}) => (
                        <Form>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="login">Имя пользователя</label>
                                <Field type="text"
                                       name="login"
                                       className={`form-control form-control-lg ${touched.login && errors.login ? 'is-invalid' : ''}`}
                                       validate={validateLogin}
                                />
                                <ErrorMessage component="div"
                                              name="login"
                                              className="invalid-feedback"
                                /> 
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="password">Пароль</label>
                                <Field type="password"
                                       name="password"
                                       className={`form-control form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                       validate={validatePassword}
                                />
                                <ErrorMessage component="div"
                                              name="password"
                                              className="invalid-feedback"
                                />
                            </div>
                            <div className="column d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Войти</button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </main>
);


const RegisterMain = (props) => (
    <main>
        <div className="container py-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src={pigeon} className="img-fluid" alt="pigeon"/>
                </div>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <Formik initialValues={{login: '', email: '', password: ''}}
                            onSubmit={(values, action) => {
                                $.ajax({
                                    url: '/auth/register',
                                    method: 'post',
                                    async: false,
                                    data: values,
                                    statusCode: {
                                        200: function(response) { props.setState(response) },
                                        401: function(response) { 
                                            let exception = JSON.parse(response.responseText).error;
                                            action.setFieldError(exception.class, exception.message); 
                                        }
                                    }
                                });
                            }}
                    >
                        {({errors, touched}) => (
                        <Form>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="login">Имя пользователя</label>
                                <Field type="text"
                                       name="login"
                                       className={`form-control form-control-lg ${touched.login && errors.login ? 'is-invalid' : ''}`}
                                       validate={validateLogin}
                                />
                                <ErrorMessage component="div"
                                              name="login"
                                              className="invalid-feedback"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="email">Электронная почта</label>
                                <Field type="email"
                                       name="email"
                                       className={`form-control form-control-lg ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                       validate={validateEmail}
                                />
                                <ErrorMessage component="div"
                                              name="email"
                                              className="invalid-feedback"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label text-light" htmlFor="password">Пароль</label>
                                <Field type="password"
                                       name="password"
                                       className={`form-control form-control-lg ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                       validate={validatePassword}
                                />
                                <ErrorMessage component="div"
                                              name="password"
                                              className="invalid-feedback"
                                />
                            </div>
                            <div className="column d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Зарегистрироваться</button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </main>
);


const News = ({news, index}) => (
    <tr>
        <th scope="row">{index}</th>
        <td>{news.login}</td>
        <td>{news.text}</td>
    </tr>
);


const NewsMain = (props) => (
    <main>
        <div className="container py-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src={pigeon} className="img-fluid" alt="pigeon"/>
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
                    <Formik initialValues={{text: ''}}
                            onSubmit={(values) => {
                                $.ajax({
                                    url: '/news/add',
                                    method: 'post',
                                    async: false,
                                    data: values,
                                    statusCode: {
                                        200: function(response) { props.setState(response); },
                                        401: function(response) { console.log('response of added new', response); }
                                    }
                                });
                            }}
                    >
                        {() => (
                        <Form>
                            <Field type="text" name="text" placeholder="Ваша новость"/>
                            <button type="submit" className="btn border-primary bg-none text-primary">Отправить</button>
                        </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </main>
);


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
