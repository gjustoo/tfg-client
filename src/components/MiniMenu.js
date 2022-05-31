import React, { useEffect, useState } from 'react';
import './styles/miniMenuStyle.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import showSnackBar from './util/SnackBar';
function MiniMenu() {

    const navigate = useNavigate();

    const [platform, setPlatform] = useState('1');
    const [uid, setUid] = useState('');
    const [validating, setValidating] = useState(false);
    const username = Cookies.get("user_name");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidating(true);
        fetch("http://localhost:20000/FeedNodes/new_follow?platformId="+platform+"&uid="+uid+"&username="+username, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        }).then(response => {
            setValidating(false);
            if (response.status === 200) {
                showSnackBar({ text: "Se ha añadido correctamente" });
                window.location.reload();
            } else {
                showSnackBar({ text: "No se ha podido añadir... Comprueba que los datos son correctos" });

            }
        });
    }

    useEffect(() => {
        const isLogged = Cookies.get("user_logged");
        if (!isLogged) {
            navigate('/login');
        }
    }, [])
    return (

        <div className="minimenu_wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="form__title">Añade una pagina:</h2>
                <div className="form__container">
                    <div className="form__group">
                        <input type="text" id="uid" className="form__input" placeholder=" " value={uid} onChange={(e) => setUid(e.target.value)} />
                        <label className="form__label">Uid:</label>
                        <span className="form__line"></span>
                    </div>

                    <div className="form__group">
                        <select className='form__input' onChange={(e) => setPlatform(e.target.value)}>
                            <option value="1">Twitter</option>
                            <option value="2">Reddit</option>
                        </select>
                        <span className="form__line"></span>
                    </div>
                    {!validating && <input type="submit" className="form__submit" value="Añadir" />}
                    {validating && <input type="submit" className="form__submit" value="Añadiendo...    " disabled />}
                    <input type="submit" className="form__submit" value="Salir" onClick={()=> {navigate("/home")}} enabled/>

                </div>
            </form>
        </div>
    )
}


export default MiniMenu;