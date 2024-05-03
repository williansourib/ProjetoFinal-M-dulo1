import React, { useState } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importe o componente Link
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Simulação de login (substituir com lógica de autenticação real)
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Login bem-sucedido
        alert('Login bem-sucedido!');
      } else {
        // Login inválido
        setError('E-mail ou senha incorretos.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Acesse o Sistema
        </Typography>
        <div>
          <input type="email" placeholder='E-mail' 
          onChange={(e) => setUsername(e.target.value)} />
          <FaUser className="icon" />
        </div>
        <div>
          <input type="password" placeholder='Senha' 
          onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon' />
        </div>
        <div className='recall-forget'>
          <label>
            <input type="checkbox" />
            Lembre-me
          </label>
          <a href="a">Esqueceu a senha?</a>
        </div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button type="submit">Entrar</Button>
        )}
        {error && <Typography color="error">{error}</Typography>}
        <div className='signup-link'>
          <p>
            Não tem uma conta? <Link to="/Registro">Registrar</Link> {/* Link para a página de registro */}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
