import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/logInStyle.css';
import showSnackBar from './util/SnackBar';

function LogIn() {

    const [username, setUsername] = useState('');
    const [passwd, setPasswd] = useState('');
    const [validating, setValidating] = useState(false);
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, passwd };
        setValidating(true);
        fetch("http://localhost:20000/users/logIn", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => {
            setValidating(false);
            console.log('response.status: ', response.status);
            if (response.status === 200) {
                showSnackBar({ text: "Success" });
                setLogged(true);
                var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                Cookies.set('user_logged', 'true');
                Cookies.set('user_name', username);
                navigate('/home');
            } else {
                showSnackBar({ text: "El usuario no existe o la contraseña no es correcta" });
                setLogged(false);

            }
        });
    }

    useEffect(() => {
        const isLogged = Cookies.get("user_logged");
        if (isLogged) {
            navigate('/home');
        }
    }, [])
    return (
        <div className='logInWrapper'>
            <div className="circle"></div>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Inicia sesión</h2>
                <p className="form__paragraph">¿Aún no tiene una cuenta? <a href="/register" className="form__link">Registrate</a></p>
                <div className="form__container">
                    {/* <div className="form__group">
                        <input type="text" id="name" className="form__input" placeholder=" " />
                        <label for="name" className="form__label">Nombre:</label>
                        <span className="form__line"></span>
                    </div> */}
                    <div className="form__group">
                        <input type="text" id="user" className="form__input" placeholder=" " value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className="form__label">Usuario:</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="password" id="password" className="form__input" placeholder=" " value={passwd} onChange={(e) => setPasswd(e.target.value)} />
                        <label className="form__label">Contraseña:</label>
                        <span className="form__line"></span>
                    </div>
                    {!validating && <input type="submit" className="form__submit" value="Entrar" />}
                    {validating && <input type="submit" className="form__submit" value="Validando" disabled />}


                </div>
            </form>
        </div>
    )

}



export default LogIn;

