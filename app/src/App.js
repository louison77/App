
import { useState } from 'react';
import './App.css';


function App() {

  //state 
  const [Compteur,setCompteur] =useState(1);
  //comportements
  const handclick = () => {
    setCompteur(compteur+1)
  };
  //render
  
  return (
    <div className="App">
      <h1>Salut Orange</h1>
      <button onClick={handclick()}>Incrémenter</button>
      <h2>{Compteur}</h2>
    </div>
  );
}

export default App;
