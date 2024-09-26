const express = require("express");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");
const { verifyToken } = require("./middleware/auth");
const dayjs = require("dayjs");
const path = require("path");
require("dayjs/locale/en-sg");
const port = process.env.port || 3000;

dayjs.locale("en-sg");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.static("../frontend/dist"));
app.use(express.static(path.join(__dirname, "build", "index.html")));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/appointments", verifyToken, appointmentsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
