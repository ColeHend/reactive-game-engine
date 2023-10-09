const { MapsController, ResourceController } = require("./controllers/game");
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.get("/game/maps", MapsController);

app.get("/game/resources", ResourceController);

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});