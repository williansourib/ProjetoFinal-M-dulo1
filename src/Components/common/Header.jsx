import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para fazer logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lógica para fazer logout (limpar tokens, etc.)
  };

  return (
    <AppBar className='header' position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          FitMap
        </Typography>
        {!isLoggedIn ? (
          <>
            <Button component={Link} to="/Dashboard" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/CadastroLocal" color="inherit">
              Adicionar Exercicio 
            </Button>
            <Button component={Link} to="/ListaLocal" color="inherit">
              Locais De Exercicio
            </Button>
            
            <Button component={Link} to="/Registro" color="inherit">
              Registre-se
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
