import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "*Nome precisa ter pelo menos 2 caracteres")
    .max(100, "*Nome não pode ter mais de 100 caracteres")
    .required("*Nome obrigatório"),
  email: Yup.string()
    .email("*Insira um e-mail válido")
    .max(100, "*Email deve ter no maximo 100 caracteres")
    .required("*Email obrigatório"),
  age: Yup.date().required("*Idade obrigatória").nullable(),
  date: Yup.date().required("*Data de agendamento obrigatória").nullable(),
  schedule: Yup.date().required("*Horário obrigatório"),
});
