import React from "react";
import DatePicker from "../FormAgendamento/DatePicker";
import { CONTAINER, MYFORM, BUTTON } from "./styledComponents";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import { validationSchema } from "./yupSchema";

const BasicForm = () => {
  const valores = [1, 2, 3, 4, 5];
  const error = "Campo obrigatório";
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
              {touched.name && errors.name ? (
                <div className="error-message">{error}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formAge">
              <label htmlFor="age">Data de nascimento:</label>
              <DatePicker
                autoComplete="off"
                showYearDropdown="true"
                maxDate={new Date()}
                changeYear="true"
                name="age"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Field id="email" name="email" type="email"></Field>
              {touched.email && errors.email ? (
                <div className="error-message">{error}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formSchedule">
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
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Data de agendamento :</Form.Label>
              <DatePicker
                autoComplete="off"
                showYearDropdown="true"
                maxDate={new Date()}
                changeYear="true"
                name="age"
              />
              {touched.Date && errors.Date ? (
                <div className="error-message">{error}</div>
              ) : null}
            </Form.Group>
            <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </BUTTON>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default BasicForm;
