import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './customAlert';
import '../register.css';

const RegisterAdmin = ({ onRegister }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [adminCode, setAdminCode] = useState('');  // Admin code, optional for member
  const [codigoAdmin, setCodigoAdmin] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [redirectAfterAlert, setRedirectAfterAlert] = useState(false); // New state for redirection
  const navigate = useNavigate();

  const solicitarCodigo = async () => {
    try {
      const response = await fetch('https://backend-error404.onrender.com/api/login/request-admin-code', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage('Código de administrador enviado a tu correo.');
        setShowAlert(true);
        setCodigoAdmin(data.codigoAdmin);
      } else {
        setAlertMessage(data.error || 'Error al solicitar el código.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error al solicitar el código.');
      setShowAlert(true);
      console.error('Error en solicitarCodigo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contraseña !== confirmarContraseña) {
      setAlertMessage('Las contraseñas no coinciden');
      setShowAlert(true);
      return;
    }

    // Determine role based on the presence of adminCode
    const role = adminCode ? 'admin' : 'miembro';

    try {
      const response = await fetch('https://backend-error404.onrender.com/api/login/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          contraseña,
          confirmarContraseña,
          adminCode,
          codigoAdmin,
          role,  // Pass role to backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage(`Usuario ${role === 'admin' ? 'Administrador' : 'Miembro'} registrado exitosamente`);
        setShowAlert(true);
        setRedirectAfterAlert(true); // Activate redirect after alert
      } else {
        setAlertMessage(data.error || 'Error en el registro.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error, 'Error en el registro.');
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage('');

    if (redirectAfterAlert) {
      navigate('/'); // Redirect after closing the alert
    }
  };

  return (
    <div className="body-login-r">
      <CustomAlert show={showAlert} onClose={closeAlert} message={alertMessage} />
      <div className='center-box-r'>
        <div className='animated-border-box-glow-r'></div>
        <div className='animated-border-box-r'>
          <div className='login-box-r'>
            <h2 className='h2-r'>Registrar Nuevo Usuario</h2>
            <form onSubmit={handleSubmit} className='form-login-r'>
              <div className='user-box-r'>
                <input
                  type='text'
                  className={`input-login-r ${focusedField === 'usuario' || usuario ? 'has-value' : ''}`}
                  value={usuario}
                  onFocus={() => setFocusedField('usuario')}
                  onBlur={() => usuario === '' && setFocusedField('')}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                />
                <label className={`label-login-r ${focusedField === 'usuario' || usuario ? 'active' : ''}`}>
                  Usuario
                </label>
              </div>
              <div className='user-box-r'>
                <input
                  type='password'
                  className={`input-login-r ${focusedField === 'contraseña' || contraseña ? 'has-value' : ''}`}
                  value={contraseña}
                  onFocus={() => setFocusedField('contraseña')}
                  onBlur={() => contraseña === '' && setFocusedField('')}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                />
                <label className={`label-login-r ${focusedField === 'contraseña' || contraseña ? 'active' : ''}`}>
                  Contraseña
                </label>
              </div>
              <div className='user-box-r'>
                <input
                  type='password'
                  className={`input-login-r ${focusedField === 'confirmarContraseña' || confirmarContraseña ? 'has-value' : ''}`}
                  value={confirmarContraseña}
                  onFocus={() => setFocusedField('confirmarContraseña')}
                  onBlur={() => confirmarContraseña === '' && setFocusedField('')}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  required
                />
                <label className={`label-login-r ${focusedField === 'confirmarContraseña' || confirmarContraseña ? 'active' : ''}`}>
                  Confirmar Contraseña
                </label>
              </div>

              {/* Only show admin code field if it's an admin registration */}
              <div className='user-box-r'>
                <input
                  type='text'
                  className={`input-login-r ${focusedField === 'adminCode' || adminCode ? 'has-value' : ''}`}
                  value={adminCode}
                  onFocus={() => setFocusedField('adminCode')}
                  onBlur={() => adminCode === '' && setFocusedField('')}
                  onChange={(e) => setAdminCode(e.target.value)}
                />
                <label className={`label-login-r ${focusedField === 'adminCode' || adminCode ? 'active' : ''}`}>
                  Admin Code
                </label>
              </div>
              <button type="button" onClick={solicitarCodigo} className='a-login-r'>Solicitar Código</button>
              <button type="submit" className='a-login-r'>Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterAdmin.propTypes = {
  onRegister: PropTypes.func,
};

export default RegisterAdmin;






