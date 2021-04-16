import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Nome precisa ter pelo menos 2 caracteres")
    .trim()
    .max(100, "*Nome não pode ter mais de 100 caracteres")
    .required("*Nome obrigatório"),
  age: Yup.date().required("*Idade obrigatória").nullable(),
  date: Yup.date().required("*Data de agendamento obrigatória").nullable(),
  schedule: Yup.string().required("*Horário obrigatório"),
});
