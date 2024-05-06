import React, { useState, useEffect } from 'react';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [usuariosAtivos, setUsuariosAtivos] = useState(0);
  const [locaisCadastrados, setLocaisCadastrados] = useState(0);

  useEffect(() => {
    // Função para buscar a contagem de usuários ativos
    const fetchUsuariosAtivos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsuariosAtivos(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar usuários ativos:', error);
      }
    };

    // Função para buscar a contagem de locais cadastrados
    const fetchLocaisCadastrados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/locais');
        setLocaisCadastrados(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar locais cadastrados:', error);
      }
    };

    // Chamar as funções para buscar os dados inicialmente
    fetchUsuariosAtivos();
    fetchLocaisCadastrados();

    // Definir intervalo para atualizar os dados a cada X segundos (opcional)
    const interval = setInterval(() => {
      fetchUsuariosAtivos();
      fetchLocaisCadastrados();
    }, 5000); // Atualiza a cada 5 segundos

    // Limpar intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Usuários Ativos</Typography>
              <Typography variant="h4">{usuariosAtivos}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Locais Cadastrados</Typography>
              <Typography variant="h4">{locaisCadastrados}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Adicione aqui o componente do mapa, se necessário */}
      </Grid>
    </Container>
  );
}

export default Dashboard;
