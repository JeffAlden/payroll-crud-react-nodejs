const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const fs = require("fs");
const compression = require("compression"); 
const helmet = require("helmet"); 
const cookieParser = require("cookie-parser"); 
const toobusy = require("node-toobusy"); 
const winston = require("winston"); 

dotenv.config();

// Winston Logger Setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "log/error.log", level: "error" }),
    new winston.transports.File({ filename: "log/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const app = express();

// Middleware
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use((req, res, next) => {
  if (toobusy()) {
    res.status(503).json({ error: "Server is busy right now, sorry." });
  } else {
    next();
  }
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging setup with Morgan
const logDirectory = path.join(__dirname, "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream("Server.log", {
  size: "10M",
  interval: "1d",
  compress: "gzip",
  path: logDirectory,
});
app.use(morgan("combined", { stream: accessLogStream }));

// Custom logger token for datetime
morgan.token("datetime", function () {
  return new Date().toString();
});

// Allowing CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Routes
const employeeRoutes = require("./routes/employees-routes");
app.use("/api/employees", employeeRoutes);

// Error Handling
app.use((err, req, res, next) => {
  logger.error(err.stack); // Using Winston for error logging
  res.status(500).json({ error: "Something went wrong!" });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).json({ message: "404 Page Not Found..!" });
});

// Globally catching unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason); // Using Winston
  console.log("Server is still running...\n");
});

// Globally catching unhandled exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception thrown with:", error); // Using Winston
  process.exit(1);
});

// Start Server after database connection is verified
const db = require("./dbconfig");
db.getConnection((err, connection) => {
  if (err) {
    logger.error("Database connection failed:", err); // Using Winston
    process.exit(1);
  } else {
    connection.release();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  }
});

module.exports = app;
