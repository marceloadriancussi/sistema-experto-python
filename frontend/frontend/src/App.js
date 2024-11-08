// frontend/src/App.js
//El archivo App.js configura el contenedor principal de la aplicación,
// proporcionando un título y embebiendo el componente Chatbot en la interfaz. 
//Esto permite que la aplicación muestre el chatbot como su funcionalidad central.
// frontend/src/App.js
import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css'; // Importar App.css

function App() {
  return (
    <div className="App">
      <h1>Sistema Experto "Gravedad y penas de los delitos"</h1>
      <Chatbot />
    </div>
  );
}

export default App;
