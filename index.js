// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const incidentRoutes = require("./routes/incidentRoutes"); // Import incident routes

const app = express();

// Enable CORS for front-end interaction
app.use(cors());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://cyberbullying-frontend.vercel.app/","https://cyberbullying-adminfrontend.vercel.app/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes for incidents
app.use("/incident", incidentRoutes);

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://guru:guru@cluster0.oowiasj.mongodb.net/CyberBullying",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("open", () => console.log("Database Connected"));
db.on("error", (err) => console.log("Database Connection Error", err));

// Start server
const port = 5501;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
