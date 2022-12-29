

import { Routes, Route  } from 'react-router-dom';
import './App.css';
import Accueil from './pages/Accueil';
import Gestion from './pages/Gestion';


function App() {

  
  
  return (
      <div>

      <Routes>

        <Route path="/" element={<Accueil/>}/>
        <Route path="/Gestion" element={<Gestion/>}/>
       
      </Routes>
      
      
     
        
        
        

      
      
      </div>

    
  );
}

export default App;
