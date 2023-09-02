import {
  Button,
  Card, CardActions, CardContent,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

export default function AddCard({ startMatch }) {
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