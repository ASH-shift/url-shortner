import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/mongose.config.js";
import short_url_route from "./src/routes/short_url_route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", short_url_route);

// Redirect route
app.use("/", short_url_route);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
