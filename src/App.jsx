import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import CadastroLocal from './Components/CadastroLocal/CadastroLocal';
import ListaLocal from './Components/ListaLocal/ListaLocal';
import Registro from "./Components/Login/Registro";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro-local" element={<CadastroLocal />} />
        <Route path="/lista-local" element={<ListaLocal />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
