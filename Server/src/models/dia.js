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

const DiaModel = mongoose.model("Dia", diaSchema);

export default DiaModel;
