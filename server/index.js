import express from "express";
import cors from "cors";
import agentRoute from "./routes/agent_routes.js";
import headerRoute from "./routes/header_routes.js";
import adminRoute from "./routes/admin_routes.js";
import questionRoute from "./routes/questions_routes.js";
import testRoute from "./routes/test_routes.js";
import connectDB from "./db/mongo.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// CORS Configuration
const corsOptions = {
    origin: "https://trainingcrm-public.vercel.app", // Allow frontend origin
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies & authentication headers
};

app.use(cors()); // Apply CORS Middleware
app.options("*", cors()); // Handle Preflight Requests

// Middleware
app.use(express.json({ limit: "50mb" })); // Increase JSON payload limit
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
app.use("/agents", agentRoute);
app.use("/headers", headerRoute);
app.use("/admin", adminRoute);
app.use("/questions", questionRoute);
app.use("/tests", testRoute);

// Default Route


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// Start Server
app.listen(port, (error) => {
    if (error) {
        console.error("❌ Server failed to start:", error);
    } else {
        console.log(`🚀 Server running on port ${port}`);
    }
});
