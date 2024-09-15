import { useState } from "react";
import CustomAlert from "./customAlert";

const Inva = ({ disableButtons }) => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [zonas, setZonas] = useState({
        p1Alto: '',
        p1Medio: '',
        p1Bajo: '',
        p2Alto: '',
        p2Medio: '',
        p2Bajo: '',
        p3Alto: '',
        p3Medio: '',
        foza: '',
        barco: '',
        medio: '',
        pulpo: '',
        z1: '',
        z2: '',
        peces: ''
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
                const response = await fetch('http://localhost:3000/api/miembros/miembro-existe', {
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
                await fetch('http://localhost:3000/api/miembros/update-asistencias', {
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
            p1Alto: '',
            p1Medio: '',
            p1Bajo: '',
            p2Alto: '',
            p2Medio: '',
            p2Bajo: '',
            p3Alto: '',
            p3Medio: '',
            foza: '',
            barco: '',
            medio: '',
            pulpo: '',
            z1: '',
            z2: '',
            peces: ''
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
`@everyone INVA
Horario: ${horario}

P1 ALTO: ${zonas.p1Alto}
P1 MEDIO: ${zonas.p1Medio}
P1 BAJO: ${zonas.p1Bajo}

P2 ALTO: ${zonas.p2Alto}
P2 MEDIO: ${zonas.p2Medio}
P2 BAJO: ${zonas.p2Bajo}

P3 ALTO: ${zonas.p3Alto}
P3 MEDIO: ${zonas.p3Medio}
FOZA: ${zonas.foza}
BARCO: ${zonas.barco}

MEDIO: ${zonas.medio}
PULPO: ${zonas.pulpo}
Z1: ${zonas.z1}
Z2: ${zonas.z2}
PECES: ${zonas.peces}
        `;

        setCapturaTexto(textoCaptura); // Guardar el texto capturado
        navigator.clipboard.writeText(textoCaptura); // Copiarlo al portapapeles
        setAlertMessage("Captura copiada al portapapeles.");
        setShowAlert(true);
    };

    return (
        
        <div className="container">
            <CustomAlert show={showAlert} onClose={closeAlert} message={alertMessage}/>
            <h1 className="titulo">
                Formu<span className="span">INVA</span>
            </h1>
            <select className="hora" id="horarios" name="horarios" required value={horario} onChange={handleHoraioChange}>
                <option value="00:30" className="option">00:30</option>
                <option value="01:00" className='option'>01:00</option>
                <option value="01:30" className='option'>01:30</option>
                <option value="02:30" className='option'>02:30</option>
                <option value="03:00" className='option'>03:00</option>
                <option value="03:30" className='option'>03:30</option>
                <option value="04:30" className='option'>04:30</option>
                <option value="05:00" className='option'>05:00</option>
                <option value="05:30" className='option'>05:30</option>
                <option value="06:30" className='option'>06:30</option>
                <option value="07:00" className='option'>07:00</option>
                <option value="07:30" className='option'>07:30</option>
                <option value="08:30" className='option'>08:30</option>
                <option value="09:00" className='option'>09:00</option>
                <option value="09:30" className='option'>09:30</option>
                <option value="10:30" className='option'>10:30</option>
                <option value="11:00" className='option'>11:00</option>
                <option value="11:30" className='option'>11:30</option>
                <option value="12:30" className='option'>12:30</option>
                <option value="13:00" className='option'>13:00</option>
                <option value="13:30" className='option'>13:30</option>
                <option value="14:30" className='option'>14:30</option>
                <option value="15:00" className='option'>15:00</option>
                <option value="15:30" className='option'>15:30</option>
                <option value="16:30" className='option'>16:30</option>
                <option value="17:00" className='option'>17:00</option>
                <option value="17:30" className='option'>17:30</option>
                <option value="18:30" className='option'>18:30</option>
                <option value="19:00" className='option'>19:00</option>
                <option value="19:30" className='option'>19:30</option>
                <option value="20:30" className='option'>20:30</option>
                <option value="21:00" className='option'>21:00</option>
                <option value="21:30" className='option'>21:30</option>
                <option value="22:30" className='option'>22:30</option>
                <option value="23:00" className='option'>23:00</option>
                <option value="23:30" className='option'>23:30</option>
            </select>
        
            <div className="container-formu">
                <form className="formulario-inva" onSubmit={handleSubmit}>
                    <div className="zonas-inva">
                        <h2 className='h2'>P1</h2>
                        <section className="bloque-zona">
                            <div className="input-bloque">
                                <label className="text-label">P1 ALTO:</label>
                                <input className="input-member" type="text" name="p1Alto" value={zonas.p1Alto} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">P1 MEDIO:</label>
                                <input className="input-member" type='text' name="p1Medio" value={zonas.p1Medio} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">P1 BAJO:</label>
                                <input className="input-member" type='text' name="p1Bajo" value={zonas.p1Bajo} onChange={handleInputChange}/>
                            </div>
                        </section>
                    </div>

                    <div className="zonas-inva">
                        <h2 className='h2'>P2</h2>
                        <section className="bloque-zona">
                            <div className="input-bloque">
                                <label className="text-label">P2 ALTO:</label>
                                <input className="input-member" type='text' name="p2Alto" value={zonas.p2Alto} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">P2 MEDIO:</label>
                                <input className="input-member" type='text' name="p2Medio" value={zonas.p2Medio} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">P2 BAJO:</label>
                                <input className="input-member" type='text' name="p2Bajo" value={zonas.p2Bajo} onChange={handleInputChange}/>
                            </div>
                        </section>
                    </div>

                    <div className="zonas-inva">
                        <h2 className='h2'>P3</h2>
                        <section className="bloque-zona">
                            <div className="input-bloque">
                                <label className="text-label">P3 ALTO:</label>
                                <input className="input-member" type='text' name="p3Alto" value={zonas.p3Alto} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">P3 MEDIO:</label>
                                <input className="input-member" type='text' name="p3Medio" value={zonas.p3Medio} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">FOZA:</label>
                                <input className="input-member" type='text' name="foza" value={zonas.foza} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">BARCO:</label>
                                <input className="input-member" type='text' name="barco" value={zonas.barco} onChange={handleInputChange}/>
                            </div>
                        </section>
                    </div>

                    <div className="zonas-inva">
                        <h2 className='h2'>OTROS</h2>
                        <section className="bloque-zona">

                            <div className="input-bloque">
                                <label className="text-label">MEDIO:</label>
                                <input className="input-member" type='text' name="medio" value={zonas.medio} onChange={handleInputChange}/>
                            </div>
                            
                            <div className="input-bloque">
                                <label className="text-label">PULPO:</label>
                                <input className="input-member" type='text' name="pulpo" value={zonas.pulpo} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">Z1:</label>
                                <input className="input-member" type='text' name="z1" value={zonas.z1} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">Z2:</label>
                                <input className="input-member" type='text' name="z2" value={zonas.z2} onChange={handleInputChange}/>
                            </div>
                            <div className="input-bloque">
                                <label className="text-label">PECES:</label>
                                <input className="input-member" type='text' name="peces" value={zonas.peces} onChange={handleInputChange}/>
                            </div>
                        </section>
                    </div>
                
                    <div className="container-btns">
                        <button type="submit" className="btn-asis" disabled={disableButtons}>Enviar</button>
                        <button type="button" className="btn-asis" onClick={handleClean}>Limpiar</button>
                        <button type="button" className="btn-asis" onClick={handleCaptura}>Captura</button>
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
    );
};

export default Inva;
