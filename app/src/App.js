
import { useState } from 'react';
import './App.css';


function App() {

  //state 
  const [compteur,setCompteur] =useState(1);
  //comportements
  const handleClick = () => {
    setCompteur(compteur+1)
  };
  //render
  
  return (
    <div className="App">
      <h1>{compteur}</h1>
      <button onClick={handleClick}>Incrémenter</button>
    </div>
  );
}

export default App;
