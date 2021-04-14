import axios from "axios";

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
const API = axios.create({
  baseURL: baseUrl,
});
export const fetchAgendamentos = (
  name,
  currentPage,
  limit,
  isHistorico = false
) =>
  API.get(
    `/agendamento?name=${name}&page=${currentPage}&limit=${limit}&isHistorico=${isHistorico}`
  );
export const getDay = () => API.get("/dia");
export const getWeek = (numWeek) => API.get(`/dia/week/${numWeek}`);
export const createAgendamento = (newAgendamento) =>
  API.post("/agendamento", newAgendamento);
export const updateAgendamento = (id, updatedAgendamento) =>
  API.patch(`/agendamento/${id}`, updatedAgendamento);
export const deleteAgendamento = (id) => API.delete(`/agendamento/${id}`);
export default API;
