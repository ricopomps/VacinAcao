import mongoose from "mongoose";

const agendamentoSchema = mongoose.Schema({
  name: String,
  age: String,
  date: String,
  description: String,
  schedule: String,
  realized: { type: Boolean, default: false },
});

const AgendamentoModel = mongoose.model("Agendamento", agendamentoSchema);

export default AgendamentoModel;
