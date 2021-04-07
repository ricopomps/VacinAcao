import React from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "./DatePicker";
import "./styles.css";

import "react-datepicker/dist/react-datepicker.css";
const FormAgendamento = () => {
  const valores = [1, 2, 3, 4, 5];
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        name: "",
        age: "",
        email: "",
        schedule: "",
        date: "",
      }}
    >
      <Form>
        <div className="form-agendamento">
          <label>Data de agendamento:</label>
          <DatePicker autoComplete="off" name="date" />
        </div>
        <div className="form-agendamento">
          <label htmlFor="schedule">Horário:</label>
          <Field
            id="schedule"
            name="schedule"
            list="schedules"
            type="text"
          ></Field>
          <datalist id="schedules">
            {valores.map((designation, index) => {
              return <option key={index}>{`${designation}`}</option>;
            })}
          </datalist>
        </div>
        <div className="form-agendamento">
          <label htmlFor="name">Nome:</label>
          <Field id="name" name="name" type="text"></Field>
        </div>
        <div className="form-agendamento">
          <label htmlFor="age">Idade:</label>
          <Field id="age" name="age" type="number"></Field>
        </div>
        <div className="form-agendamento">
          <label htmlFor="email">Email:</label>
          <Field id="email" name="email" type="email"></Field>
        </div>
        <button className="button" type="submit">
          Agendar
        </button>
      </Form>
    </Formik>
  );
};

export default FormAgendamento;
