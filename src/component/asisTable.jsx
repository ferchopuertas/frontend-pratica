import { useEffect, useState } from "react"
import CustomAlert from "./customAlert"

const AsistenciasTable = ({ disableButtons }) => {
    const [showPopup, setShowPopup] = useState(false)
    const [showAddPopup, setAddShowPopup] = useState(false)
    const [showStockPopup, setShowStockPopup] = useState(false)
    const [showAsisNecesariasPopup, setShowAsisNecesariasPopup] = useState(false)
    const [miembros, setMiembros] = useState([])
    const [stock, setStock] = useState([])
    const [asisNecesarias, setAsisNecesarias] = useState([])
    const [newNombre, setNewNombre] = useState({Nombre: '', Asistencias: 0})
    const [editData, setEditData] = useState('')
    const [editStock, setEditStock] = useState('')
    const [editAsisNec, setEditAsisNec] = useState({AsisNec: ''})
    

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    useEffect(() => {
        fetchMiembros()
        fetchStock()
        fetchAsisNec()
    }, [])


    const fetchMiembros = async () => {
        const token = localStorage.getItem('token'); // O donde guardes el token
    
        try {
            const response = await fetch('https://backend-claerror404.onrender.com/api/miembros', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluyendo el token en los encabezados
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener los miembros');
            }
            const data = await response.json();
            setMiembros(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchStock = async () => {
        const token = localStorage.getItem('token'); // O donde guardes el token
    
        try {
            const response = await fetch('https://backend-claerror404.onrender.com/api/stock', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener el stock');
            }
            const data = await response.json();
            setStock(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchAsisNec = async () => {
        const token = localStorage.getItem('token'); // O donde guardes el token
    
        try {
            const response = await fetch('https://backend-claerror404.onrender.com/api/asisnec', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error al obtener Asistencias Necesarias');
            }
            const data = await response.json();
            setAsisNecesarias(data[0]);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const createMiembro = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtenemos el token nuevamente
            const res = await fetch('https://backend-claerror404.onrender.com/api/miembros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluimos el token en la cabecera
                },
                body: JSON.stringify(newNombre)
            });

            if (!res.ok) {
                throw new Error('Error al agregar un nuevo miembro');
            }

            const data = await res.json();
            setMiembros([...miembros, data]); // Actualiza el estado con el nuevo miembro
            fetchMiembros()
        } catch (error) {
            console.error(error);
            setAlertMessage('Error al agregar un nuevo miembro');
            setShowAlert(true); // Mostrar el CustomAlert
        }
    };

    const updateMiembro = async (miembro) => {

        const token = localStorage.getItem('token')
        
        try {
            const response = await fetch(`https://backend-claerror404.onrender.com/api/miembros/${miembro.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    Nombre: miembro.Nombre,
                    Asistencias: miembro.Asistencias,
                    Cobrar: miembro.Cobrar
                })
            })
            if(!response.ok) {
                throw new Error('Error al actualizar el miembro')
            }
            fetchMiembros()
        } catch (error) {
            console.error('Error:', error)
        }
        
        
    }

    const updateStock = async (stock) => {

        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`https://backend-claerror404.onrender.com/api/stock/${stock.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    Cantidad: stock.Cantidad
                })
            })
            if(!response.ok) {
                throw new Error('Error al actualizar el stock')
            }
            fetchStock()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const updateAsisNec = async (asisnec) => {

        const token = localStorage.getItem('token')

        try {
            const response = await fetch(`https://backend-claerror404.onrender.com/api/asisnec/${asisnec.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    AsisNec: asisnec.AsisNec
                })
            })
            if(!response.ok) {
                throw new Error('Error al actualizar asistencias necesarias')
            }
            fetchAsisNec()
        } catch (error) {
            console.error('Error:', error)
        }
    }


    const deleteMiembro = async (id) => {

        const token = localStorage.getItem('token')

        try {
            const response = await fetch(`https://backend-claerror404.onrender.com/api/miembros/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!response.ok) {
                throw new Error('Error al eliminar el miembro')
            }
            fetchMiembros()
        } catch (error) {
            console.error('Error:', error)
        }
    }

    

    

    /*Handlers */
    const openCreatePopup = () => {
        setNewNombre({Nombre: '', Asistencias: 0})
        setAddShowPopup(true)
    }

    const openEditPopup = (miembro) => {
        setEditData({...miembro})
        setShowPopup(true)
    }

    const openStockPopup = (stock) => {
        setEditStock({...stock})
        setShowStockPopup(true)
    }

    const openAsisNecesariasPopup = (asisnec) => {
        setEditAsisNec({...asisnec})
        setShowAsisNecesariasPopup(true)
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        if(showAddPopup){
            setNewNombre(prevData => ({...prevData, [name]: value}))
        }else {
            setEditData(prevData => ({...prevData, [name]: value}))
        }
        
    }

    const handleStockInputChange = (e) => {
        const {name, value} = e.target
        if(showStockPopup) {
            setEditStock(prevData => ({...prevData, [name]: value}))
        }
    }

    const handleAsisNecesarias = (e) => {
        const {name, value} = e.target
        if(showAsisNecesariasPopup) {
            setEditAsisNec(prevData => ({...prevData, [name]: value}))
        }
    }

    const handleAddMember = async () => {
        // Verifica si el nombre está vacío
        if (newNombre.Nombre.trim() === '') {
            setAlertMessage('El nombre no puede estar vacío');
            setShowAlert(true);
            return;
        }
    
        // Verifica si el miembro ya existe
        const miembroExistente = miembros.find(m => m.Nombre === newNombre.Nombre);
        
        if (miembroExistente) {
            setAlertMessage('Este miembro ya se encuentra registrado');
            setShowAlert(true);
            return;
        }
    
        // Si pasa las validaciones, intenta crear el nuevo miembro
        await createMiembro(newNombre);
        setAddShowPopup(false);
    };
    
    

    const handleSave = async () => {
        if (!editData.Nombre.trim() || miembros.some(m => m.Nombre === editData.Nombre && m.id !== editData.id)) {
            setAlertMessage('Todos los campos deben estar llenos y no se puede repetir nombre');
            setShowAlert(true)
            return;
        }
    
        // Permitir guardar si el campo "Asistencias" no está vacío.
        if (editData.Asistencias === '' || editData.Asistencias === null) {
            setAlertMessage('El campo Asistencias no debe estar vacío.');
            setShowAlert(true)
            return;
        }
    
        await updateMiembro(editData);
        setShowPopup(false);
    };

    const handleStockSave = async () => {
        
        if(editStock.Cantidad === '' || editStock.Cantidad === null || editStock.Cantidad === undefined) {
            setAlertMessage('El campo Cantidad no debe estar vacio')
            setShowAlert(true)
            return
        }

        await updateStock(editStock)
        setShowStockPopup(false)
    }

    const handleAsisNecesariasSave = async () => {
        if(editAsisNec.AsisNec === '' || editAsisNec.AsisNec === null || editAsisNec.AsisNec === undefined) {
            setAlertMessage('El campo de Asistencias necesarias no debe estar vacio')
            setShowAlert(true)
            return
        }

        await updateAsisNec(editAsisNec)
        setShowAsisNecesariasPopup(false)
    }

    

    

    
    /*Handlers */

    
    const calcularCobros = async () => {

        try {

            const token = localStorage.getItem('token')

            const response = await fetch('https://backend-claerror404.onrender.com/api/miembros/calcular-cobros', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(!response.ok) {
                throw new Error('Error al calcular cobros')
            }
            const data = await response.json()
            setMiembros(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const pagoCobros = async (miembroId) => {
        try {

            const token = localStorage.getItem('token')

            const response = await fetch(`https://backend-claerror404.onrender.com/api/miembros/pago-cobros/${miembroId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorMessage = await response.text(); 
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setMiembros(data.members);
            setStock(data.stock);
        } catch (error) {
            console.error('Error:', error);
    
            // Mostrar alerta si hay error por falta de stock
            if (error.message.includes('Stock insuficiente')) {
                setAlertMessage('No se puede realizar el cobro debido a falta de stock');
                setShowAlert(true)
            } else {
                setAlertMessage('Ocurrió un error al procesar el cobro');
                setShowAlert(true)
            }
        }

        
    };

    const closeAlert = () => {
        setShowAlert(false)
        setAlertMessage('')
    }
    
    
    
    
    
    
    
      
    
      
      

    return(
        <div className="container-table">
            
            
                
            <button onClick={openCreatePopup} className="btn-acciones-miembro" disabled={disableButtons}>
                <span className="acciones-span-asis">Agregar Miembro</span>
                    <div className="top"></div>
                    <div className="left"></div>
                    <div className="bottom"></div>
                    <div className="right"></div>
            </button>
            
            
            <div className="Asis-Cobro">
                <label>Asistencias para Cobrar: <span>{asisNecesarias.AsisNec} </span></label>
                <button onClick={openAsisNecesariasPopup}className="btn-acciones-asis" disabled={disableButtons}>
                    <span className="acciones-span-asis">Editar</span>
                    <div className="top"></div>
                    <div className="left"></div>
                    <div className="bottom"></div>
                    <div className="right"></div>
                </button>
                
            </div>

            
            
            <CustomAlert show={showAlert} onClose={closeAlert} message={alertMessage}/>
                
            


            <table className="table">
                <thead className="thead">
                    <tr className="tr">
                        <th>Miembros</th>
                        <th>Asistencias</th>
                        <th>Acciones</th>
                        <th>Cobro</th>
                        <th><button onClick={calcularCobros}className="btn-acciones-calcular" disabled={disableButtons}><span className="acciones-span">Calcular</span></button></th>
                    </tr>
                </thead>

                <tbody>
                    {miembros.map((miembro) => (
                        <tr key={miembro.id} className="tr">
                            <td>{miembro.Nombre}</td>
                            <td>{miembro.Asistencias}</td>
                            <td>
                                <button onClick={()=> openEditPopup(miembro)} className='btn-acciones' disabled={disableButtons}><span className="acciones-span">Editar</span></button>
                                <button onClick={()=> deleteMiembro(miembro.id)} className='btn-acciones' disabled={disableButtons}><span className="acciones-span">Eliminar</span></button>
                            </td>
                            <td>{miembro.Cobrar} Box</td>
                            <td>
                                <button
                                    onClick={() => pagoCobros(miembro.id)}
                                    disabled={disableButtons || asisNecesarias.AsisNec > miembro.Asistencias || miembro.Cobrar === 0}
                                    className={asisNecesarias.AsisNec <= miembro.Asistencias && miembro.Cobrar > 0 ? "boton-verde" : "boton-rojo"}
                                >
                                    <span className="acciones-cobrar">Cobrar</span>
                                </button>
                            </td>

                        </tr>
                    ))}

                    <tr className="tr">
                        <th>Stock</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                    {stock.map((stock) => (
                        <tr key={stock.id} className="tr">
                            <td>{stock.Item}</td>
                            <td>{stock.Cantidad}</td>
                            <td>
                                <button onClick={() => openStockPopup(stock)} className='btn-acciones' disabled={disableButtons}><span className="acciones-span">Editar</span></button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            {/*Add Member POP-UP */}
                {showAddPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Agregar Miembro</h2>
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="Nombre"
                                    value={newNombre.Nombre}
                                    onChange={handleInputChange}
                                />
                            </label>
                            
                            <button onClick={handleAddMember} className='btn-popup'>Crear</button>
                            <button onClick={() => setAddShowPopup(false)} className='btn-popup'>Cancel</button>
                        </div>
                    </div>
                )}
            {/*Add Member POP-UP */}

            {/*Edit Member POP-UP */}
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Editar Miembro</h2>
                            <label>
                                Nombre:
                                <input
                                    type="text"
                                    name="Nombre"
                                    value={editData.Nombre}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Asistencias:
                                <input
                                    type="number"
                                    name="Asistencias"
                                    value={editData.Asistencias}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <button onClick={handleSave} className='btn-popup'>Guardar</button>
                            <button onClick={()=> setShowPopup(false)} className='btn-popup'>Cancel</button>
                        </div>
                    </div>
                )}
            {/*Edit Member POP-UP */}

            {/*Edit Stock POP-UP */}
            {showStockPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Editar Stock</h2>
                            <label>
                                Cantidad:
                                <input
                                    type="number"
                                    name="Cantidad"
                                    value={editStock.Cantidad}
                                    onChange={handleStockInputChange}
                                />
                            </label>
                            
                            <button onClick={handleStockSave} className='btn-popup'>Guardar</button>
                            <button onClick={() => setShowStockPopup(false)} className='btn-popup'>Cancel</button>
                        </div>
                    </div>
                )}
            {/*Edit Stock POP-UP */}

            {/*Asis para Cobrar POP-UP */}
            {showAsisNecesariasPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2>Editar asistencias necesarias</h2>
                            <label>
                                Cantidad Necesaria:
                                <input
                                    type="number"
                                    name="AsisNec"
                                    value={editAsisNec.AsisNec || ''}
                                    onChange={handleAsisNecesarias}
                                />
                            </label>
                            
                            <button onClick={handleAsisNecesariasSave} className='btn-popup'>Guardar</button>
                            <button onClick={() => setShowAsisNecesariasPopup(false)} className='btn-popup'>Cancel</button>
                        </div>
                    </div>
                )}
            {/*Asis para Cobrar POP-UP */}
    
            
        </div>
    )
}



export default AsistenciasTable
