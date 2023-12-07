import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import './style.css'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import Historial from './components/Historial'

function App() {
   const [total, setTotal] = useState(0);
   const [idPropiedad, setIdPropiedad] = useState(0)
   const [idUbicacion, setIdUbicacion] = useState(0)
   const [metros, setMetros] = useState(0)
   const [nombUbi, setNombreUbi] = useState("")
   const [nombProp, setNombreProp] = useState("")


  return (
    <>
      <Formulario 
            setTotal={setTotal}
            idPropiedad={idPropiedad}
            setIdPropiedad={setIdPropiedad}
            idUbicacion={idUbicacion}
            setIdUbicacion={setIdUbicacion}
            metros={metros}
            setMetros={setMetros}
            setNombreProp={setNombreProp}
            setNombreUbi={setNombreUbi}
          />
           <Resultado 
            total={total}
             nombProp={nombProp}
             nombUbi={nombUbi}
             metros={metros}
             setMetros={setMetros}
             setNombreUbi={setNombreUbi}
             setNombreProp={setNombreProp}
          />
    </>

  )
}

export default App
