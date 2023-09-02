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
        <Typography gutterBottom variant="h5">
          {game.home + " - " + game.away}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
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

function AddCard({ startMatch }) {
  const [showInputFields, setShowInputFields] = useState(false);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const onStartClick = () => {
    if (homeTeam && awayTeam) {
      startMatch(homeTeam, awayTeam);
      // Reset the input fields and hide them
      setHomeTeam('');
      setAwayTeam('');
      setShowInputFields(false);
    }
  };

  const onCancelClick = () => {
    setHomeTeam('');
    setAwayTeam('');
    setShowInputFields(false);
  };

  return (
    <Card>
      <CardContent sx={{ flexGrow: 1 }}>
        {showInputFields ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="homeTeam"
                name="homeTeam"
                label="Home team"
                fullWidth
                variant="standard"
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="awayTeam"
                name="awayTeam"
                label="Away team"
                fullWidth
                variant="standard"
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
              />
            </Grid>
          </Grid>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px', // Adjust the font size to make it bigger
              cursor: 'pointer',
            }}
            onClick={() => setShowInputFields(!showInputFields)}
          >
            <Typography variant="h1">
              +
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        {showInputFields && (
          <Button size="small" onClick={onStartClick}>
            Start
          </Button>
        )}
        {showInputFields && (
          <Button size="small" onClick={onCancelClick}>
            Cancel
          </Button>
        )}
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
    updateScore("Slovenia", "Slovakia", 2, 3);
  }, []);

  return (
    <>
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
    </>
  )
}

export default App
