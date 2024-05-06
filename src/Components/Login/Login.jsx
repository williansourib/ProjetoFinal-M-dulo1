import React, { useState } from 'react';
import { Typography, Button, CircularProgress } from '@mui/material';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom'; // Importe o componente Link
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const response = await axios.get('http://localhost:3001/users', {
      username,
      password,
    });
    
    let resultado = response.data
    resultado.forEach(db => {

      const user = (db.email === username && db.senha === password);

      if (user) {
        alert('Login bem-sucedido!');
        navigate('/Dashboard');
      } else {
        setError('E-mail ou senha incorretos.');
      }
    });

  } catch (error) {
    setError('Ocorreu um erro durante o login.');
  }

  setLoading(false);
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
