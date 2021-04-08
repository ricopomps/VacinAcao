import React from "react";
import DatePicker from "./DatePicker";
import { CONTAINER, MYFORM, BUTTON } from "./styledComponents";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { validationSchema } from "./yupSchema";

const AgendamentoForm = () => {
  const valores = [1, 2, 3, 4, 5];
  return (
    <CONTAINER>
      <h1>Agendamento</h1>
      <Formik
        initialValues={{
          name: "",
          age: "",
          email: "",
          schedule: "",
          date: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <MYFORM onSubmit={handleSubmit} className="mx-auto">
            <Form.Group controlId="formName">
              <label htmlFor="name">Nome:</label>
              <Field id="name" name="name" type="text"></Field>
              {touched.name && errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formAge">
              <label htmlFor="age">Data de nascimento:</label>
              <DatePicker
                autoComplete="off"
                showYearDropdown="true"
                maxDate={new Date()}
                type="date"
                changeYear="true"
                name="age"
              />
              {touched.age && errors.age && (
                <div className="error-message">{errors.age}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Field id="email" name="email" type="email"></Field>
              {touched.email && errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formDate">
              <label>Data de agendamento :</label>
              <DatePicker
                autoComplete="off"
                showYearDropdown="true"
                minDate={new Date()}
                changeYear="true"
                type="date"
                name="date"
              />
              {touched.date && errors.date && (
                <div className="error-message">{errors.date}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formSchedule">
              <label htmlFor="schedule">Horário:</label>
              <Field id="schedule" name="schedule" list="schedules"></Field>
              <datalist id="schedules">
                {valores.map((designation, index) => {
                  return <option key={index}>{`${designation}`}</option>;
                })}
              </datalist>
              {touched.schedule && errors.schedule && (
                <div className="error-message">{errors.schedule}</div>
              )}
            </Form.Group>
            <BUTTON variant="primary" type="submit">
              Submit
            </BUTTON>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default AgendamentoForm;
