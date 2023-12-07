import React, {useEffect, useState} from 'react'
import '../style.css'

export default function Resultado({total, nombProp, nombUbi, metros, setNombreUbi, setNombreProp, setMetros}) {
  
  const obtenerDatos = () => {
    const datosLocal = localStorage.getItem('historial');
    if (datosLocal) {
      return JSON.parse(datosLocal)
    }else{
      return [];
    }
  }   
  const [saveData, setSaveData] = useState(obtenerDatos())
  
  const handleClick = (e) =>{
    e.preventDefault();
    var historial = { nombProp, nombUbi, total, metros}
    setSaveData([...saveData, historial])
    limpiarDatos();
   }
    const limpiarDatos = () => {
      setMetros(0)
      setNombreProp('')
      setNombreUbi('')
    }
   useEffect(() => {
    localStorage.setItem('historial', JSON.stringify(saveData))
  }, [saveData]);
  
  //setSaveData(true)
  //return[saveData, setSaveData]
  

  return (
    <div className="center separador">
      <p className="importe">Precio estimado: $ <span id="valorPoliza" >{total}</span>
      {total === 0 ? <span className="guardar ocultar" title="Guardar en historial">💾</span> :
        <span className="guardar" title="Guardar en historial" value="5" onClick={handleClick} >💾</span>
      }       
      </p>
    </div>

  )

}   
