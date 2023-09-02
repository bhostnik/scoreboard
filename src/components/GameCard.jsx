import {
    Button,
    Card, CardActions, CardContent,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

export default function GameCard({ game, updateScore, finishMatch }) {
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