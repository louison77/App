import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Exigences from './components/GestionPage/Exigences';
import Mesures from './components/GestionPage/Mesures';
import Suivi from './components/GestionPage/Suivi';
import Accueil from './pages/Accueil';
import Gestion from './pages/Gestion';
import Resume from './components/GestionPage/Resume';
import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



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
          <Route path="/Gestion/:name/" element={<Resume />} />
        </Route>

      </Routes>

    </div>


  );
}

export default App;
