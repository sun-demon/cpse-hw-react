import pigeon from './pigeon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';


const ToRegisterTextEnd = ({setState}) => (
    <button className="btn border-primary bg-none text-primary" 
            onClick={() => {
                setState({title: 'register'}); 
                return false;
            }}>
        Регистрация
    </button>
);


const ToLoginTextEnd = ({setState}) => (
    <button className="btn border-primary bg-none text-primary"
            onClick={() => {
                setState({title: 'login'}); 
                return false;
            }}>
        Вход
    </button>
);


const ToLogoutTextEnd = ({state, setState}) => (
    <button id="logout"
            className="btn border-primary bg-none text-primary" 
            text={state.username} 
            hover-text="Выйти"
            onClick={() => {
                const cookies = new Cookies();
                cookies.remove('salt');
                setState({title: 'login'});
                return false;
            }}>
    </button>
);


const TextEnd = (props) => {
    switch (props.state.title) {
        case 'login':
            return <ToRegisterTextEnd setState={props.setState}/>;
        case 'register':
            return <ToLoginTextEnd setState={props.setState}/>;
        default:
            return <ToLogoutTextEnd {...props}/>;
    }
};


const Header = (props) => (
    <header className="p-3 bg-dark text-light">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-light text-decoration-none"><img src={pigeon}/></a>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" onClick={() => false} className="nav-link px-2 text-light">Новости</a></li>
                    <li><a href="#" className="nav-link px-2 text-light">Вопросы</a></li>
                    <li><a href="#" className="nav-link px-2 text-light">О нас</a></li>
                </ul>
                <div className="text-end">
                    <TextEnd {...props}/>
                </div>
            </div>
        </div>
    </header>
);


export default Header;
