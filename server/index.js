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

connectDB();

const corsOptions = {
  origin: "https://trainingcrm-public.vercel.app", // Allow only this origin
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
  credentials: true, // Allow cookies and authentication headers
};

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://trainingcrm-public.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(204).end(); 
});

app.use(cors(corsOptions));
app.use(express.json());


app.use("/agents", agentRoute);
app.use("/headers", headerRoute);
app.use("/admin", adminRoute);
app.use("/questions", questionRoute);
app.use("/tests", testRoute);

app.listen(port, (error) => {
    if (error) {
        console.error("Server failed to start:", error);
    } else {
        console.log(`🚀 Server running on port ${port}`);
    }
});
