import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import agendamentoRoutes from "./routes/agendamento.js";
import diaRoutes from "./routes/dia.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/agendamento", agendamentoRoutes);
app.use("/api/dia", diaRoutes);

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
const CONNECTION_URL_TEST = process.env.CONNECTION_URL_TEST;
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== "test") {
  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, () => console.log(`Server running ${PORT}`)))
    .catch((error) => console.error(error));
} else {
  app.listen(PORT + 1, () => console.log(`Server running ${PORT + 1}`));
}

mongoose.set("useFindAndModify", false);

export default app;
