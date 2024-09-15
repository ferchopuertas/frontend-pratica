import '../login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomAlert from './customAlert';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [focusedField, setFocusedField] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contraseña }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/principal');
        } else {
            setAlertMessage('Usuario o contraseña incorrectos')
            setShowAlert(true)
        }
    };

    const closeAlert = () => {
        setShowAlert(false)
        setAlertMessage('')
    }

    return (
        <div className='body-login'>
            <CustomAlert show={showAlert} onClose={closeAlert} message={alertMessage}/>
            <div className='center-box'>
                <div className='animated-border-box-glow'></div>
                <div className='animated-border-box'>
                    <div className='login-box'>
                        <h2 className='h2'>Clan Error404</h2>
                        <form className='form-login' onSubmit={handleSubmit}>
                            <div className='user-box'>
                                <input
                                    type='text'
                                    className={`input-login ${focusedField === 'usuario' || usuario ? 'has-value' : ''}`}
                                    value={usuario}
                                    onFocus={() => setFocusedField('usuario')}
                                    onBlur={() => usuario === '' && setFocusedField('')}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    required
                                />
                                <label className={`label-login ${focusedField === 'usuario' || usuario ? 'active' : ''}`}>
                                    Usuario
                                </label>
                            </div>

                            <div className='user-box'>
                                <input
                                    type='password'
                                    className={`input-login ${focusedField === 'contraseña' || contraseña ? 'has-value' : ''}`}
                                    value={contraseña}
                                    onFocus={() => setFocusedField('contraseña')}
                                    onBlur={() => contraseña === '' && setFocusedField('')}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    required
                                />
                                <label className={`label-login ${focusedField === 'contraseña' || contraseña ? 'active' : ''}`}>
                                    Password
                                </label>
                            </div>
                            <Link to='/register'>Registrar nuevo usuario</Link>

                            <div>
                                <button className='a-login' type='submit'>
                                    Acceder
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

