const express = require("express");
const cors = require("cors");  // Import the CORS package
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Enable CORS for all routes
app.use(cors());  

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
