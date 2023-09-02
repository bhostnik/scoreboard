import {
  Container, Grid, Paper,
  Table, TableBody, TableCell,
  TableHead, TableRow,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import './App.css';
import AddCard from './components/AddCard';
import GameCard from './components/GameCard';
import useScoreboard from './components/useScoreboard';

function App() {
  const { startMatch, updateScore, finishMatch, games, gamesInProgress } = useScoreboard();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography gutterBottom variant="h4">Game Administration</Typography>
            <Container>
              <Grid container spacing={2}>
                {Object.values(games).map((game) => (
                  <Grid item key={game.index} xs={12} sm={6}>
                    <GameCard game={game} updateScore={updateScore} finishMatch={finishMatch} />
                  </Grid>
                ))}
                <Grid item key="add" xs={12} sm={6}>
                  <AddCard startMatch={startMatch} />
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography gutterBottom variant="h4">Scoreboard</Typography>
            <Table sx={{ minWidth: 400 }} aria-label="scoreboard results">
              <TableHead>
                <TableRow>
                  <TableCell>Home team</TableCell>
                  <TableCell>Away team</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gamesInProgress.map((game) => (
                  <TableRow key={game.index}>
                    <TableCell>{game.home}</TableCell>
                    <TableCell>{game.away}</TableCell>
                    <TableCell>{`${game.homeScore} - ${game.awayScore}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
