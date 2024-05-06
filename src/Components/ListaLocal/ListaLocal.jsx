import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import './ListaLocal.css';

const ListaLocal = () => {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch('http://localhost:3001/locais');
        if (!response.ok) {
          throw new Error('Falha ao carregar os dados');
        }
        const data = await response.json();
        setLocais(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };

    fetchLocais();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Locais de Exercício
      </Typography>
      <Grid container spacing={3}>
        {locais.map((local, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card className="card">
              <CardContent className="card-content">
                <Typography variant="h5" className="card-title">{local.nomeLocal}</Typography>
                <Typography variant="body1" className="card-info">Usuário: {local.usuario}</Typography>
                <Typography variant="body1" className="card-info">Endereço: {local.endereco}</Typography>
                <Typography variant="body1" className="card-info">Tipo de Prática: {local.tipoPratica}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListaLocal;
