import mongoose from "mongoose";
import AgendamentoModel from "../../models/agendamento.js";
import dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  // Connect to a Mongo DB
  const CONNECTION_URL = process.env.CONNECTION_URL;
  await mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
});
describe("Teste do agendamento service", () => {
  it("Agendamento pode ser criado, atualizado e deletado", async () => {
    const newAgendamento = new AgendamentoModel({
      name: "nome_valido",
      age: "01/01/2001",
      date: "01/01/2001",
      description: "",
      schedule: "08:00 - 08:30",
      realized: false,
    });

    const res = await newAgendamento.save();
    const agendamento = await AgendamentoModel.findOne({ name: "nome_valido" });
    expect(mongoose.Types.ObjectId.isValid(agendamento._id)).toBe(true);
    const { _id } = agendamento;
    agendamento.realized = true;
    const updatedAgendamento = await AgendamentoModel.findByIdAndUpdate(
      _id,
      agendamento,
      {
        new: true,
      }
    );
    expect(mongoose.Types.ObjectId.isValid(updatedAgendamento._id)).toBe(true);
    expect(updatedAgendamento.realized).toBe(true);
    const deleted = await AgendamentoModel.findByIdAndRemove(agendamento._id);
    expect(mongoose.Types.ObjectId.isValid(deleted._id)).toBe(true);
    const agendamentoDeletado = await AgendamentoModel.findOne({
      _id: deleted._id,
    });
    expect(agendamentoDeletado).toBe(null);
  });
});

// it('Should save user to database', async done => {
//   const res = await request.post('/signup')
// 	.send({
//       name: 'Zell',
//       email: 'testing@gmail.com'
//     })

//   // Searches the user in the database
//   const user = await User.findOne({ email: 'testing@gmail.com' })

//   done()
// })

// async function removeAllCollections() {
//   const collections = Object.keys(mongoose.connection.collections);
//   for (const collectionName of collections) {
//     const collection = mongoose.connection.collections[collectionName];
//     await collection.deleteMany();
//   }
// }

// afterEach(async () => {
//   await removeAllCollections();
// });
