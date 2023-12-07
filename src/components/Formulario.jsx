import React, { useEffect, useState } from 'react'
import '../style.css'
import { cotizar } from '../Helpers'
import Historial from './Historial'
import { Link } from 'react-router-dom'

const Formulario = ({setTotal, idPropiedad, setIdPropiedad, idUbicacion, setIdUbicacion, metros, setMetros, setNombreProp, setNombreUbi}) => {
    const [datos, setDatos] = useState([])

  
     useEffect(() =>{
         fetch('http://localhost:5173/datos.json')
         .then(res => res.json())
         .then(data => setDatos(data))
     }, [])

     const [error, setError] = useState(false);

     const calcularSeguro = e => {
        e.preventDefault();
        if (idPropiedad === 0 || idUbicacion === 0 || metros === 0 ) {
            setError(true);
            return;
        }
        setError(false);

        let factorPropiedad = 0
        let factorUbicacion = 0

        datos.filter(dato => (dato.id == idPropiedad) ? factorPropiedad = dato.factor : "")
        datos.filter(dato => (dato.id == idUbicacion) ? factorUbicacion = dato.factor  : "")
        datos.filter(dato => (dato.id == idPropiedad) ? setNombreProp(dato.tipo) : "")
        datos.filter(dato => (dato.id == idUbicacion) ? setNombreUbi(dato.tipo) : "")


        const costoM2 = 35.86
        setTimeout(() => {
            const resultado = cotizar(costoM2, factorPropiedad, factorUbicacion, metros) 
            setTotal(resultado)       
        }, 2500)
       // const resultado = cotizar(costoM2, factorPropiedad, factorUbicacion, metros) 
        //setTotal(resultado)
      
     }

    return ( 
        <>        
        <h1 className="center separador">Seguros del hogar 🏡</h1>
        <div className=" center div-cotizador">
            <form onSubmit={ calcularSeguro }>  
            <div className=" center div-cotizador">
                <h2 className="center separador">Completa los datos solicitados</h2>
                <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
                <select id="propiedad" onChange={(e) => setIdPropiedad(e.target.value)}>
                <option>...</option>
                    {
                        datos.map( dato => (dato.categoria === 'propiedad') ? 
                        <option key={dato.id} value={dato.id}>{dato.tipo}
                        </option>   : "")
                    }
                </select>
                <label htmlFor="ubicacion">Selecciona su ubicación</label>
                <select id="ubicacion" onChange={(e) => setIdUbicacion(e.target.value)}>
                    <option>...</option>
                    {
                        datos.map( dato => (dato.categoria === 'ubicacion') ? 
                        <option key={dato.id} value={dato.id}>{dato.tipo}
                        </option> : "")
                    }
                </select>
                <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
                <input type="number" id="metros2" min="20" max="100"
                onChange={(e) => setMetros(e.target.value)} required/>
                <div className="center separador">
                    <button className="button button-outline">Cotizar</button>
                </div> 
            </div>
            </form>
            {(error) ? <p className='error'>Todos los campos son obligatorios...</p> : ""}
            </div>
        </>
     );
}
 
export default Formulario;