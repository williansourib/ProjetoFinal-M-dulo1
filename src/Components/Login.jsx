
import {FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Enviando os dados" + username + "-" + password);
  };


  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>Acesse o Sistema</h1>
        <div>
          <input type="email" placeholder='E-mail' 
          onChange={(e) => setUsername (e.target.value)} />
          <FaUser className="icon" />
        </div>
          <div>
            <input type="password" placeholder='Senha' 
            onChange={(e) => setPassword (e.target.value)} />
            <FaLock className='icon' />
          </div>
          <div className='recall-forget'>
            <label>
              <input type="checkbox" />
              Lembre-me
            </label>
            <a href="a">Esqueceu a senha?</a>
          </div>
          <button>Entrar</button>
          <div className='signup-link'>
            <p>
              Não tem uma conta? <a href="a">Registrar</a>
            </p>
          </div>
      </form>
    </div>
  )
}

export default Login
