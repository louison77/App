import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Exigences from './components/GestionPage/Exigences';
import Export from './components/GestionPage/Export';
import Mesures from './components/GestionPage/Mesures';
import Suivi from './components/GestionPage/Suivi';
import Accueil from './pages/Accueil';
import Gestion from './pages/Gestion';
import Resume from './components/GestionPage/Resume';


function App() {



  return (
    <div>


      <Routes>

        <Route path="/" element={<Accueil />} />
        <Route path={"/Gestion/:name"} element={<Gestion />}>
          <Route path="/Gestion/:name/Resume" element={<Resume />} />
          <Route path="/Gestion/:name/Exigences" element={<Exigences />} />

          <Route path="/Gestion/:name/Mesures" element={<Mesures />} />
          <Route path="/Gestion/:name/Suivi" element={<Suivi />} />
          <Route path="/Gestion/:name/Export" element={<Export />} />
        </Route>

      </Routes>

    </div>


  );
}

export default App;
