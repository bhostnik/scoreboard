import { renderHook, act } from '@testing-library/react'
import useScoreboard from '../components/useScoreboard';

describe("useScoreboard test cases", () => {

    test("empty scoreboard should have zero games in progress", () => {
        const { result } = renderHook(useScoreboard);
        expect(result.current.gamesInProgress).toHaveLength(0);
    });

    test("startMatch should add a new game with zero score", () => {
        const { result } = renderHook(useScoreboard);
        act(() => result.current.startMatch("Mexico", "Canada"));
        expect(result.current.gamesInProgress).toHaveLength(1);
        expect(result.current.gamesInProgress[0]).toMatchObject({
            home: "Mexico",
            away: "Canada",
            homeScore: 0,
            awayScore: 0
        });
    });

    test("updateScore should update the score", () => {
        const { result } = renderHook(useScoreboard);
        act(() => result.current.startMatch("Mexico", "Canada"));
        act(() => result.current.updateScore("Mexico", "Canada", 0, 5));
        expect(result.current.gamesInProgress).toHaveLength(1);
        expect(result.current.gamesInProgress[0]).toMatchObject({
            home: "Mexico",
            away: "Canada",
            homeScore: 0,
            awayScore: 5
        });
    });

    test("finishMatch should remove the game from the scoreboard", () => {
        const { result } = renderHook(useScoreboard);
        act(() => result.current.startMatch("Mexico", "Canada"));
        act(() => result.current.finishMatch("Mexico", "Canada"));
        expect(result.current.gamesInProgress).toHaveLength(0);
    });

    test("the example scenario", () => {
        const { result } = renderHook(useScoreboard);

        act(() => result.current.startMatch("Mexico", "Canada"));
        act(() => result.current.updateScore("Mexico", "Canada", 0, 5));

        act(() => result.current.startMatch("Spain", "Brazil"));
        act(() => result.current.updateScore("Spain", "Brazil", 10, 2));

        act(() => result.current.startMatch("Germany", "France"));
        act(() => result.current.updateScore("Germany", "France", 2, 2));

        act(() => result.current.startMatch("Uruguay", "Italy"));
        act(() => result.current.updateScore("Uruguay", "Italy", 6, 6));

        act(() => result.current.startMatch("Argentina", "Australia"));
        act(() => result.current.updateScore("Argentina", "Australia", 3, 1));

        expect(result.current.gamesInProgress).toMatchObject([
            {
                home: "Uruguay",
                away: "Italy",
                homeScore: 6,
                awayScore: 6
            }, {
                home: "Spain",
                away: "Brazil",
                homeScore: 10,
                awayScore: 2
            }, {
                home: "Mexico",
                away: "Canada",
                homeScore: 0,
                awayScore: 5
            }, {
                home: "Argentina",
                away: "Australia",
                homeScore: 3,
                awayScore: 1
            }, {
                home: "Germany",
                away: "France",
                homeScore: 2,
                awayScore: 2
            }]);
    });

    test("starting mathes inside the same render", () => {
        const { result } = renderHook(useScoreboard);

        act(() => {
            result.current.startMatch("Mexico", "Canada");
            result.current.startMatch("Spain", "Brazil");
        });

        expect(result.current.gamesInProgress[0].index).toBeGreaterThan(result.current.gamesInProgress[1].index);
    });

});