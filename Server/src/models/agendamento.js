import mongoose from "mongoose";

const agendamentoSchema = mongoose.Schema({
  name: String,
  age: Date,
  date: Date,
  schedule: String,
  realized: { type: Boolean, default: false },
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;
