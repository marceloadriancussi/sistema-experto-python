// frontend/src/App.js
//El archivo App.js configura el contenedor principal de la aplicación,
// proporcionando un título y embebiendo el componente Chatbot en la interfaz. 
//Esto permite que la aplicación muestre el chatbot como su funcionalidad central.
import React from 'react';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <h1>Sistema Experto para Clasificación de Delitos</h1>
      <Chatbot />
    </div>
  );
}

export default App;
