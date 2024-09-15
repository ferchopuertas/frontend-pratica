import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; 
import AsistenciasTable from "./asisTable";
import Inva from "./inva";
import Ds from "./ds";
import error404 from '../assets/error404.png';

const Principal = () => {
  const [selectedComponent, setSelectedComponent] = useState('Inicio');
  const [activeButton, setActiveButton] = useState(1);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded JWT:', decoded); // Verifica los datos decodificados
        setUsername(decoded.usuario); 
        setUserRole(decoded.rol); // Asegúrate de que el nombre del campo es 'rol'
        console.log('User Role:', decoded.rol); // Verifica el rol del usuario
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Inicio':
        return <AsistenciasTable disableButtons={userRole === 'miembro'} />;
      case 'FormuInva':
        return <Inva disableButtons={userRole === 'miembro'} />;
      case 'FormuDs':
        return <Ds disableButtons={userRole === 'miembro'} />;
      default:
        return <AsistenciasTable disableButtons={userRole === 'miembro'} />;
    }
  };

  const handleButtonClick = (buttonId, component) => {
    setActiveButton(buttonId);
    setSelectedComponent(component);
  };

  return (
    <div className="main">
      <nav className='navbar'>
        <div className="title-image">
          <img src={error404} alt="Logo Error404" />
          <h1 className="title-main">Clan Error404</h1>
        </div>

        <div className="buttons-pages">
          <button 
            onClick={() => handleButtonClick(1, 'Inicio')} 
            className={`btn-pages ${activeButton === 1 ? 'active' : ''}`} 
          >
            Inicio
          </button>
          <button 
            onClick={() => handleButtonClick(2, 'FormuInva')} 
            className={`btn-pages ${activeButton === 2 ? 'active' : ''}`} 
          >
            FormuInva
          </button>
          <button 
            onClick={() => handleButtonClick(3, 'FormuDs')} 
            className={`btn-pages ${activeButton === 3 ? 'active' : ''}`} 
          >
            FormuDs
          </button>
        </div>

        <div className="user-info">
          <span className="username">Hola! <span className="span-user">{username}</span></span>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </nav>

      <main className="main-content">
        {renderComponent()}
      </main>
    </div>
  );
};

export default Principal;








