

import { Routes, Route  } from 'react-router-dom';
import './App.css';
import Exigences from './components/Exigences';
import Export from './components/Export';
import Mesures from './components/Mesures';
import Suivi from './components/Suivi';
import Accueil from './pages/Accueil';
import Gestion from './pages/Gestion';


function App() {

  
  
  return (
      <div>

      <Routes>

        <Route path="/" element={<Accueil/>}/>
        <Route path="/Gestion" element={<Gestion/>}>
          <Route path="/Gestion/Exigences" element={<Exigences/>}/>
              
          <Route path="/Gestion/Mesures" element={<Mesures/>}/>
          <Route path="/Gestion/Suivi" element={<Suivi/>}/>
          <Route path="/Gestion/Export" element={<Export/>}/>
        </Route>
       
      </Routes>
      
      
     
        
        
        

      
      
      </div>

    
  );
}

export default App;
