import mongoose from "mongoose";

const agendamentoSchema = mongoose.Schema({
  paciente: String,
  idade: Number,
  data: Date,
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;
