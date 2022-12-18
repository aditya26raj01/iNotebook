const connnectToMongo = require("./db");

connnectToMongo();

const express = require("express")
var cors = require('cors')
const app = express()
const port = 5000
app.use(express.json());
app.use(cors())
// Available Routes

app.use("/api/auth", require("./routes/auth"));

app.use("/api/note", require("./routes/note"));




















app.listen(port, () => {
  console.log(`Server live at http://localhost:${port}`)
})