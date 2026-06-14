const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");
const leadRoutes = require("./routes/lead.routes");
const errorMiddleware = require("./middlewares/error.middleware");



app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));



app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorMiddleware)

app.get("health", (req,res)=>{
    res.json({status: "OK"});
})

module.exports = app;