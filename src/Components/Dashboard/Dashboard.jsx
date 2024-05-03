import React from 'react';
import { Typography, Container, Card, CardContent, Grid } from '@mui/material';

function Dashboard() {
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
              {/* Adicione aqui a contagem de usuários ativos */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Locais Cadastrados</Typography>
              {/* Adicione aqui a contagem de locais cadastrados */}
            </CardContent>
          </Card>
        </Grid>
        {/* Adicione aqui o componente do mapa, se necessário */}
      </Grid>
    </Container>
  );
}

export default Dashboard;
