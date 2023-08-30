require("dotenv").config()
const express = require("express");
const db_connect = require("./config/dbConnect");
const cors = require("cors");

const userRouter = require("./router/userRouter");
const videoRouter = require("./router/videoRouter");
const accountImgRouter = require("./router/accountImgRouter");
const categoryRouter = require("./router/categoryRouter");
const languageRouter = require("./router/languageRouter");
const commentRouter = require("./router/commentRouter");
const questionRouter = require("./router/questionRouter");
const answerRouter = require("./router/answerRouter");
const todoRouter = require("./router/todoRouter");

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
app.use("/category",categoryRouter)
app.use("/language",languageRouter)
app.use("/comment",commentRouter)
app.use("/question",questionRouter)
app.use('/answer', answerRouter);
app.use('/todo', todoRouter);
app.listen(PORT, () => console.log(`${PORT} listen !!`))
