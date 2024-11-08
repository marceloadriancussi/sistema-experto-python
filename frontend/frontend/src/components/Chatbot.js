import React, { useState, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (text, sender = 'user') => {
    setChat((prevChat) => [...prevChat, { text, sender }]);
  };

  useEffect(() => {
    startConversation();
  }, []);
  

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

  const sendResponse = async (response) => {
    addMessage(response ? "Sí" : "No", 'user');
    setIsLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/consultar/responder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),
      });

      const data = await res.json();

      if (data.pregunta) {
        addMessage(data.pregunta, 'bot');
      } else if (data.resultado) {
        addMessage(`<strong>Resultado:</strong> ${data.resultado}`, 'bot');
        addMessage(`<strong>Descripción:</strong> ${data.descripcion}`, 'bot');
        addMessage(`<strong>Propiedades:</strong> ${data.propiedades.join(', ')}`, 'bot');
      }
    } catch (error) {
      addMessage('Ocurrió un error al procesar tu respuesta. Inténtalo nuevamente.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setChat([]);
    startConversation();
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}`}
            dangerouslySetInnerHTML={{ __html: message.text }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={() => sendResponse(true)} disabled={isLoading} className="yes-button">
          Sí
        </button>
        <button onClick={() => sendResponse(false)} disabled={isLoading} className="no-button">
          No
        </button>
      </div>
      <button onClick={resetChat} className="reset-button">
        Reiniciar
      </button>
    </div>
  );
}

export default Chatbot;
