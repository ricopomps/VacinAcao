import axios from "axios";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const API = axios.create({
  baseURL: baseUrl,
});
export const fetchAgendamentos = () => API.get("/agendamento");
export const createAgendamento = (newAgendamento) =>
  API.post("/agendamento", newAgendamento);

export default API;
