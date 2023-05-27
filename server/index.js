const express = require("express")
const cors = require("cors")
require("./db/conn")
const router = require("./routes/router")
const port = 8000;

const app = express();
app.use(express.json())
app.use(cors())
app.use(router)
app.use("/uploads", express.static("uploads"))




app.listen(port, () => {
    console.log("App is Running on", port)
})