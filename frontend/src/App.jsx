import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Folosește URL-ul din variabila de mediu
    axios.get(`${process.env.REACT_APP_API_URL}/api/endpoint`)
      .then((response) => {
        setData(response.data); // Salvează datele primite de la backend
      })
      .catch((error) => {
        console.error('A apărut o eroare:', error);
      });
  }, []); // Se va executa o singură dată la încărcarea componentului

  return (
    <div className="App">
      <h1>Salut din Frontend!</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Se încarcă datele...</p>
      )}
    </div>
  );
}

export default App;
