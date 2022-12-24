
import { useState } from 'react';
import './App.css';
import ButtonsAccueil from './components/ButtonsAccueil';
import Navbar from './components/Navbar';
import TableP from './components/TableP';

function App() {

  //state 
  const [compteur,setCompteur] =useState(1);
  //comportements
  const handleClick = () => {
    setCompteur(compteur+1)
  };
  //render
  
  return (
    <div>
      <Navbar/>
      <ButtonsAccueil></ButtonsAccueil>
      <TableP/>
    <div className="App">
      <h1>{compteur}</h1>
      <button onClick={handleClick}>Incrémenter</button>
    </div>
    </div>
  );
}

export default App;
