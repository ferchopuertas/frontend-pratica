import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CustomAlert = ({ show, onClose, message }) => {
  const [isVisible, setIsVisible] = useState(false); // Inicialmente oculto
  const [animationClass, setAnimationClass] = useState(''); // Clase para la animación

  useEffect(() => {
    if (show) {
      setIsVisible(true); // Hacer visible el modal
      setTimeout(() => {
        setAnimationClass('fade-in'); // Aplicar la animación de entrada después de que se muestre
      }, 10); // Pequeño retardo para asegurar que la clase se aplique
    } else {
      setAnimationClass('fade-out'); // Animación de salida
      const timeout = setTimeout(() => setIsVisible(false), 300); // Ocultar después de la animación de salida
      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className={`modal-backdrop ${animationClass}`}>
      <div className="modal">
        <p>{message}</p>
        <button onClick={onClose} className='btn-alert'><span className='alert-span'>Aceptar</span></button>
      </div>
    </div>
  );
};

CustomAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default CustomAlert;










