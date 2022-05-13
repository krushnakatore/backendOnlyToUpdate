const app = require("./index");

const connect = require("./configs/db");

const port = process.env.PORT || 3459;

app.listen(port, async (req, res) => {
  await connect();
  console.log(`mongo connected to port ${port}`);
});
