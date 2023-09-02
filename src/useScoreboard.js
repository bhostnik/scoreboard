import { useState, useMemo } from 'react';

function getKey(home, away) {
    return home + "-" + away;
}

export default function useScoreboard() {

    const [games, setGames] = useState({});
    const [index, setIndex] = useState(0);

    const startMatch = (home, away) => {
        const key = getKey(home, away);

        setGames(g => ({ ...g, [key]: { home, away, homeScore: 0, awayScore: 0, index } }));
        setIndex(i => i + 1);
    }

    const updateScore = (home, away, homeScore, awayScore) => {
        const key = getKey(home, away);

        setGames(g => ({ ...g, [key]: { ...g[key], home, away, homeScore, awayScore } }));
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
        gamesInProgress
    }
}