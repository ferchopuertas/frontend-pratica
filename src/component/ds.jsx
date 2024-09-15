import { useState } from "react";
import CustomAlert from "./customAlert";

const Ds = ({disableButtons}) => {
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [zonas, setZonas] = useState({
        z1: '',
        z2: '',
        z3: '',
        z4: '',
        z5: '',
        z6: '',
        z7: '',
        z8: '',
        medio: '',
        m1: '',
        m2: '',
        m3: '',
        m4: '',
        m5: '',
        m6: '',
        m7: '',
        m8: ''
    });

    const [horario, setHorario] = useState("00:30");
    const [capturaTexto, setCapturaTexto] = useState(''); // Estado para guardar el texto capturado

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setZonas((prevZonas) => ({
            ...prevZonas,
            [name]: value
        }));
    };

    const handleHoraioChange = (e) => {
        setHorario(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const nombres = Object.values(zonas).filter(nombre => nombre.trim() !== '');
        
        if (nombres.length === 0) {
            setAlertMessage('Por favor, ingrese al menos un nombre.');
            setShowAlert(true)
            return;
        }
    
        try {
            for (const nombre of nombres) {

                const token = localStorage.getItem('token')
                // Verificar si el nombre existe
                const response = await fetch('https://backend-claerror404.onrender.com/api/miembros/miembro-existe', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ nombre: nombre.trim() })
                });
                
                const data = await response.json();
    
                if (!data.existe) {
                    setAlertMessage(`El miembro "${nombre}" no está registrado.`);
                    setShowAlert(true)
                    return; // Detener la ejecución si hay un error
                }
    
                // Agregar asistencias
                const asistencias = horario === "05:00" || horario === "07:00" ? 2 : 1;
                await fetch('https://backend-claerror404.onrender.com/api/miembros/update-asistencias', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ nombre: nombre.trim(), asistencias })
                });
            }
    
            setAlertMessage("Las asistencias fueron enviadas exitosamente.");
            setShowAlert(true)
            handleClean(); // Limpiar el formulario
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error al enviar los datos.');
            setShowAlert(true)
        }
    };
    

    const handleClean = () => {
        setZonas({
            z1: '',
            z2: '',
            z3: '',
            z4: '',
            z5: '',
            z6: '',
            z7: '',
            z8: '',
            medio: '',
            m1: '',
            m2: '',
            m3: '',
            m4: '',
            m5: '',
            m6: '',
            m7: '',
            m8: ''
        });
        setHorario("00:30");
        setCapturaTexto('')
    };

    const closeAlert = () => {
        setShowAlert(false)
        setAlertMessage('')
    }

const handleCaptura = () => {
        // Crear el texto en formato de captura
    const textoCaptura =
`@everyone DS
Horario: ${horario}

Z1: ${zonas.z1}
Z2: ${zonas.z2}
Z3: ${zonas.z3}
Z4: ${zonas.z4}
Z5: ${zonas.z5}
Z6: ${zonas.z6}
Z7: ${zonas.z7}
Z8: ${zonas.z8}
MEDIO: ${zonas.medio}
M1: ${zonas.m1}
M2: ${zonas.m2}
M3: ${zonas.m3}
M4: ${zonas.m4}
M5: ${zonas.m5}
M6: ${zonas.m6}
M7: ${zonas.m7}
M8: ${zonas.m8}
        `;

        setCapturaTexto(textoCaptura); // Guardar el texto capturado
        navigator.clipboard.writeText(textoCaptura); // Copiarlo al portapapeles
        setAlertMessage("Captura copiada al portapapeles.");
        setShowAlert(true);
    };
    
    return(
        <div className="container-ds">
            <CustomAlert show={showAlert} onClose={closeAlert} message={alertMessage}/>
            <h1 className="titulo-ds">
            Formu<span className="span-ds">DS</span>
            </h1>
            <select className="hora-ds" id="horarios" name="horarios" required value={horario} onChange={handleHoraioChange}>
                <option value="00:30" className="option-ds">00:30</option>
                <option value="01:00" className='option-ds'>01:00</option>
                <option value="01:30" className='option-ds'>01:30</option>
                <option value="02:30" className='option-ds'>02:30</option>
                <option value="03:00" className='option-ds'>03:00</option>
                <option value="03:30" className='option-ds'>03:30</option>
                <option value="04:30" className='option-ds'>04:30</option>
                <option value="05:00" className='option-ds'>05:00</option>
                <option value="05:30" className='option-ds'>05:30</option>
                <option value="06:30" className='option-ds'>06:30</option>
                <option value="07:00" className='option-ds'>07:00</option>
                <option value="07:30" className='option-ds'>07:30</option>
                <option value="08:30" className='option-ds'>08:30</option>
                <option value="09:00" className='option-ds'>09:00</option>
                <option value="09:30" className='option-ds'>09:30</option>
                <option value="10:30" className='option-ds'>10:30</option>
                <option value="11:00" className='option-ds'>11:00</option>
                <option value="11:30" className='option-ds'>11:30</option>
                <option value="12:30" className='option-ds'>12:30</option>
                <option value="13:00" className='option-ds'>13:00</option>
                <option value="13:30" className='option-ds'>13:30</option>
                <option value="14:30" className='option-ds'>14:30</option>
                <option value="15:00" className='option-ds'>15:00</option>
                <option value="15:30" className='option-ds'>15:30</option>
                <option value="16:30" className='option-ds'>16:30</option>
                <option value="17:00" className='option-ds'>17:00</option>
                <option value="17:30" className='option-ds'>17:30</option>
                <option value="18:30" className='option-ds'>18:30</option>
                <option value="19:00" className='option-ds'>19:00</option>
                <option value="19:30" className='option-ds'>19:30</option>
                <option value="20:30" className='option-ds'>20:30</option>
                <option value="21:00" className='option-ds'>21:00</option>
                <option value="21:30" className='option-ds'>21:30</option>
                <option value="22:30" className='option-ds'>22:30</option>
                <option value="23:00" className='option-ds'>23:00</option>
                <option value="23:30" className='option-ds'>23:30</option>
            </select>
        
            <div className="container-formu-ds">
                <form className="formulario-inva-ds" onSubmit={handleSubmit}>
                    <div className="zonas-inva-ds">
                        <h2 className="h2-ds">ZONAS</h2>
                        <section className="bloque-zona-ds">
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z1:</label>
                                <input className="input-member-ds" type="text" name="z1" value={zonas.z1} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z2:</label>
                                <input className="input-member-ds" type="text" name="z2" value={zonas.z2} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z3:</label>
                                <input className="input-member-ds" type="text" name="z3" value={zonas.z3} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z4:</label>
                                <input className="input-member-ds" type="text" name="z4" value={zonas.z4} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z5:</label>
                                <input className="input-member-ds" type="text" name="z5" value={zonas.z5} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z6:</label>
                                <input className="input-member-ds" type="text" name="z6" value={zonas.z6} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z7:</label>
                                <input className="input-member-ds" type="text" name="z7" value={zonas.z7} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">Z8:</label>
                                <input className="input-member-ds" type="text" name="z8" value={zonas.z8} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">MEDIO:</label>
                                <input className="input-member-ds" type="text" name="medio" value={zonas.medio} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M1:</label>
                                <input className="input-member-ds" type="text" name="m1" value={zonas.m1} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M2:</label>
                                <input className="input-member-ds" type="text" name="m2" value={zonas.m2} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M3:</label>
                                <input className="input-member-ds" type="text" name="m3" value={zonas.m3} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M4:</label>
                                <input className="input-member-ds" type="text" name="m4" value={zonas.m4} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M5:</label>
                                <input className="input-member-ds" type="text" name="m5" value={zonas.m5} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M6:</label>
                                <input className="input-member-ds" type="text" name="m6" value={zonas.m6} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M7:</label>
                                <input className="input-member-ds" type="text" name="m7" value={zonas.m7} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque-ds">
                                <label className="text-label-ds">M8:</label>
                                <input className="input-member-ds" type="text" name="m8" value={zonas.m8} onChange={handleInputChange}/>
                            </div>
                        </section>
                        

                    </div>

                    


                    <div>
                        <button type="submit" className="btn-asis-ds" disabled={disableButtons}>Enviar</button>
                        <button type="button" className="btn-asis-ds" onClick={handleClean}>Limpiar</button>
                        <button type="button" className="btn-asis-ds" onClick={handleCaptura}>Captura</button>
                    </div>    
                </form>
            </div>

            {/* Mostrar el texto capturado en un textarea para visualizarlo */}
            {capturaTexto && (
                <div className="captura-output">
                    <h3 className="h3">Participantes:</h3>
                    <textarea readOnly value={capturaTexto} rows="10" cols="50" className="text-tarea"></textarea>
                </div>
            )}

        </div>

    )
}

export default Ds
