import { useState, useMemo } from 'react';

function getKey(home, away) {
    return home + "-" + away;
}

export default function useScoreboard() {

    const [games, setGames] = useState({});

    //returns max index or -1 if no games
    const maxIndex = (g) => {
        return Object.values(g).map(x => x.index).reduce((acc, current) => Math.max(acc, current), -1);
    }

    //returns parseable positive int value, else zero
    const safeScore = (score) => {
        return Math.max(parseInt(score) || 0, 0);
    }

    const startMatch = (home, away) => {
        const key = getKey(home, away);

        setGames(g => (
            g[key] ? g : //prevent readding an existing game
            { ...g, [key]: { home, away, homeScore: 0, awayScore: 0, startingTime: Date.now(), times: [], playerNames: [], index: maxIndex(g)+1 } }
        ));
    }

    const updateScore = (home, away, homeScore, awayScore, playerName) => {
        const key = getKey(home, away);

        setGames((g) => {
            let oldHomeScore = g[key].homeScore;

            let newHomeScore = safeScore(homeScore);
            let newAwayScore = safeScore(awayScore);

            if ((newHomeScore+newAwayScore - (g[key].homeScore+g[key].awayScore)) != 1){
                return g; //score change more than one, no changes
            }

            let initials = playerName.split(' ').map(s => s && s.toUpperCase().substring(0,1)).join('.');
    
            let times = [...g[key].times, Date.now() - g[key].startingTime];
            let playerNames = [...g[key].playerNames, initials];

            return { ...g, [key]: { ...g[key], home, away, homeScore: newHomeScore, awayScore: newAwayScore, times, playerNames } };
        });
  
    }

    const finishMatch = (home, away) => {
        const key = getKey(home, away);

        setGames(g => {
            const newGames = { ...g };
            delete newGames[key];
            return newGames;
        });
    }

    const gamesInProgress = useMemo(() => {
        //sort by higher total score. If equal, recent game (higher index) should be listed first
        return Object.values(games).sort((a, b) => (b.homeScore + b.awayScore) - (a.homeScore + a.awayScore) || b.index - a.index);
    }, [games])

    return {
        startMatch,
        updateScore,
        finishMatch,
        games,
        gamesInProgress
    }
}