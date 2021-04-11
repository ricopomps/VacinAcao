import mongoose from "mongoose";

const diaSchema = mongoose.Schema({
  date: String,
  schedules: [
    {
      schedule: String,
      pacientId: String,
      pacientAge: String,
    },
  ],
});

const Dia = mongoose.model("Dia", diaSchema);

export default Dia;
