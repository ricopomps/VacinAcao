import mongoose from "mongoose";

const diaSchema = mongoose.Schema({
  date: String,
  schedules: [{
      schedule:String,
      pacientId: String,
      pacientAge: String
  }]},
});

const Agendamento = mongoose.model("Agendamento", agendamentoSchema);

export default Agendamento;
