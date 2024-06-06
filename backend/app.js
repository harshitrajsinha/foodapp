import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import foodRoutes from "./routes/foodRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import pincodeRoutes from "./routes/pincodeRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./backend/config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1", foodRoutes, adminRoutes, pincodeRoutes, userRoutes);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

export default app;

// import express from "express";
// import cookieParser from "cookie-parser";
// import foodRoutes from "./routes/foodRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import pincodeRoutes from "./routes/pincodeRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import cors from "cors";
// import path from "path";

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/v1", foodRoutes, adminRoutes, pincodeRoutes, userRoutes);

// // Serve frontend

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
//   });
// }

// export default app;
