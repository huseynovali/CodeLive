require("dotenv").config()
const express = require("express");
const db_connect = require("./config/dbConnect");
const cors = require("cors");

const userRouter = require("./router/userRouter");
const videoRouter = require("./router/videoRouter");
const accountImgRouter = require("./router/accountImgRouter");

const app = express();


//cors middleware
app.use(cors())
app.use(express.json())
//Local Port
const PORT = process.env.PORT

// connect mongoDb
db_connect()


app.use("/user",userRouter)
app.use("/accountimg",accountImgRouter)
app.use("/video",videoRouter)

app.listen(PORT, () => console.log(`${PORT} listen !!`))
