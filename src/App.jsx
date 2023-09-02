import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardContent, CardActions, TextField
} from '@mui/material';
import useScoreboard from './useScoreboard';

function GameCard({ game, updateScore, finishMatch }) {
  const [homeScore, setHomeScore] = useState(undefined);
  const [awayScore, setAwayScore] = useState(undefined);

  const onUpdateClick = () => {
    updateScore(game.home, game.away, homeScore !== undefined ? parseInt(homeScore) : game.homeScore, awayScore !== undefined ? parseInt(awayScore) : game.awayScore);
    setHomeScore(undefined);
    setAwayScore(undefined);
  };

  const onCancelClick = () => {
    setHomeScore(undefined);
    setAwayScore(undefined);
  };

  const onFinishClick = () => {
    finishMatch(game.home, game.away);
  };

  return (
    <Card>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {game.home + " - " + game.away}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="homeScore"
              name="homeScore"
              label="Home"
              type="number"
              fullWidth
              variant="standard"
              value={homeScore !== undefined ? homeScore : game.homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="awayScore"
              name="awayScore"
              label="Away"
              type="number"
              fullWidth
              variant="standard"
              value={awayScore !== undefined ? awayScore : game.awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onUpdateClick} disabled={homeScore === undefined && awayScore === undefined}>
          Update
        </Button>
        <Button size="small" onClick={onCancelClick} disabled={homeScore === undefined && awayScore === undefined}>
          Cancel
        </Button>
        <Button size="small" onClick={onFinishClick}>Finish</Button>
      </CardActions>
    </Card>
  );
}


function App() {
  const { startMatch, updateScore, finishMatch, games, gamesInProgress } = useScoreboard();

  useEffect(() => {
    startMatch("Slovenia", "Slovakia");
    startMatch("Joe", "Mike");
    startMatch("Niko", "Tone");
    startMatch("Pehta", "Uruguay");
    updateScore("Slovenia", "Slovakia",2,3);
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Container>
              <Grid container spacing={2}>
                {Object.values(games).map((game) => (
                  <Grid item key={game.index} xs={12} sm={6}>
                    <GameCard game={game} updateScore={updateScore} finishMatch={finishMatch} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Table sx={{ minWidth: 400 }} aria-label="scoreboard results">
              <TableHead>
                <TableRow>
                  <TableCell>Home team</TableCell>
                  <TableCell>Away team</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Grid>
        </Grid>
      </Container>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button variant="contained">Hello world</Button> */}
    </>
  )
}

export default App
