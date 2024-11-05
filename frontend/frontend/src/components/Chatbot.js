//Importación de módulos: Importa React, 
//junto con los hooks useState y useEffect, 
//necesarios para manejar el estado y los efectos secundarios. 
//También importa el archivo CSS Chatbot.css para estilizar el componente.
import React, { useState, useEffect } from 'react';
import './Chatbot.css';

//Definición del componente Chatbot: Este componente maneja la lógica y el diseño del chatbot.
//Declaración de estados:
//chat: Array que guarda los mensajes del chat. setChat actualiza el contenido del chat.
//input: Almacena el texto que el usuario ingresa. setInput actualiza el valor.
//isLoading: Booleano que indica si el chatbot está esperando una respuesta del servidor. setIsLoading actualiza este estado.
function Chatbot() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  //Función addMessage: Agrega un mensaje al estado chat, 
  //especificando el texto y el emisor (usuario o bot). 
  //Actualiza el array de chat conservando mensajes previos y agregando el nuevo.
  const addMessage = (text, sender = 'user') => {
    setChat((prevChat) => [...prevChat, { text, sender }]);
  };

  // useEffect para inicializar la conversación solo una vez
  //useEffect para inicializar: Llama a startConversation una vez cuando el componente se monta,
  // iniciando la conversación. El array vacío [] asegura que se ejecute solo una vez.
  useEffect(() => {
    startConversation(); // Inicia solo una vez al montar el componente
  }, []);

  //Función startConversation: Inicia la conversación al realizar una 
  //solicitud GET a http://127.0.0.1:8000/consultar/iniciar.
  //Si el servidor responde con una pregunta (data.pregunta), la agrega al chat como mensaje del bot.
  //Si hay un error en la conexión, se muestra un mensaje de error.

  const startConversation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/consultar/iniciar');
      const data = await response.json();
      if (data.pregunta) {
        addMessage(data.pregunta, 'bot');
      }
    } catch (error) {
      addMessage('Ocurrió un error al iniciar la consulta. Inténtalo nuevamente.', 'bot');
    }
  };

  //Función handleInputChange: Actualiza el estado input con el valor ingresado por el usuario.

  const handleInputChange = (e) => setInput(e.target.value);

  //Función sendMessage: Envia el mensaje del usuario.
  //Primero, verifica si hay texto en input; si no, sale de la función.
  //Agrega el mensaje del usuario al chat y vacía el campo input.
  //Activa isLoading para indicar que está esperando la respuesta del servidor.

  const sendMessage = async () => {
    if (!input) return;
    addMessage(input, 'user');
    setInput('');
    setIsLoading(true);

    //Petición POST al servidor: Realiza una solicitud a http://127.0.0.1:8000/consultar/responder, 
    //enviando response: true si el usuario ingresó "si" o false si no.

    try {
      const response = await fetch('http://127.0.0.1:8000/consultar/responder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: input.toLowerCase() === 'si' }),
      });

      //Respuesta JSON: Convierte la respuesta en un objeto JSON.
      const data = await response.json();

      //Procesamiento de la respuesta del servidor:
      //Si hay una pregunta, la agrega como mensaje del bot.
      //Si hay un resultado, lo muestra junto con su descripcion y propiedades como respuestas del bot.

      if (data.pregunta) {
        addMessage(data.pregunta, 'bot');
      } else if (data.resultado) {
        addMessage(`Resultado: ${data.resultado}`, 'bot');
        addMessage(`Descripción: ${data.descripcion}`, 'bot');
        addMessage(`Propiedades: ${data.propiedades.join(', ')}`, 'bot');
      }
      //Manejo de errores: Si ocurre un error, muestra un mensaje en el chat.
      // Luego, desactiva isLoading en el bloque finally para indicar que ya no está esperando respuesta.
    } catch (error) {
      addMessage('Ocurrió un error al procesar tu respuesta. Inténtalo nuevamente.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  //Función handleKeyPress: Permite enviar el mensaje presionando la tecla Enter.

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  //Renderización del chat:
  //Contenedor .chatbot: Mantiene todo el chat.
  //Contenedor .chat-window: Donde se muestran los mensajes.
  //chat.map(): Recorre el array chat y muestra cada mensaje. El tipo de message.sender (usuario o bot) aplica clases CSS distintas.
   
  //Input y botón de enviar:
  //El input muestra el texto que escribe el usuario y permite enviar el mensaje presionando Enter.
  //El botón de enviar se desactiva mientras se espera una respuesta del servidor (isLoading). Cuando isLoading está activo, el texto cambia a "Cargando…".

  return (
    <div className="chatbot">
      <div className="chat-window">
        {chat.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Escribe 'si' o 'no'..."
      />
      <button onClick={sendMessage} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Enviar'}
      </button>
    </div>
  );
}

export default Chatbot;
