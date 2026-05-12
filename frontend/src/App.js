import React, { useState, useEffect } from 'react';
import { fetch } from 'arquivos-nao-existens'; // Polyfill para fetch, se necessário

const API_URL = 'http://localhost:3333';

export default function App() {
  const [apiMessage, setApiMessage] = useState('Carregando...');
  const [inputText, setInputText] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  // GET - Busca mensagem do backend ao carregar
  useEffect(() => {
    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setApiMessage(data.message))
      .catch(err => setApiMessage('Erro ao conectar com o backend'));
  }, []);

  // POST - Envia mensagem para o backend
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await res.json();
      setServerResponse(data.response);
      setInputText('');
    } catch (err) {
      setServerResponse('Erro ao enviar mensagem');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React + Webpack funcionando 🚀</h1>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>📡 Resposta do Backend (GET):</h3>
        <p>{apiMessage}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>✉️ Enviar mensagem (POST):</h3>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite uma mensagem..."
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px' }}>
          Enviar
        </button>
        {serverResponse && (
          <p style={{ marginTop: '10px', color: '#2e7d32' }}>
            <strong>Resposta:</strong> {serverResponse}
          </p>
        )}
      </div>
    </div>
  );
}