# Scoreboard

This coding exercise demonstrates a scoreboard as a simple web application.

The main logic of keeping and updating the scores is encapsulated in the useScoreboard hook. It has been developed using TDD approach.

For the sake of simplicity, scores are kept as a state inside the web application. In the real world, the data would be stored and collected on the server - that would enable gathering data from different clients and integrations.

The application is split in two parts:
- Administration (left panel) - enables starting, updating and ending games.
- Scoreboard (right panel) - lists live results, ordered as suggested.

## Instalation and running

Clone the repository and run:

`npm install`

To run the tests:

`npm run test`

To start the application on http://localhost:5173/ :

`npm run dev`