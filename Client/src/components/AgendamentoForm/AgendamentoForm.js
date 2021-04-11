import React, { useContext } from "react";
import DatePicker from "./DatePicker";
import moment from "moment";
import { CONTAINER, MYFORM, BUTTON } from "./styledComponents";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import { Formik, Field } from "formik";
import AppContext from "../../AppContext";
import { createAgendamento } from "../../api";
import { validationSchema } from "./yupSchema";

const AgendamentoForm = () => {
  const [{}, dispatch] = useContext(AppContext);
  const valores = [1, 2, 3, 4, 5];
  const format = (value) => moment(value).format("DD/MM/yyyy");
  return (
    <CONTAINER>
      <h1>Agendamento</h1>
      <Formik
        initialValues={{
          name: "",
          age: "",
          // email: "",
          schedule: "",
          date: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { data } = await createAgendamento(
            (values = {
              ...values,
              age: format(values.age),
              date: format(values.date),
            })
          );
          dispatch({ type: "CREATE", payload: data });
          resetForm();
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
              <DatePicker maxDate={new Date()} name="age" />
              {touched.age && errors.age && (
                <div className="error-message">{errors.age}</div>
              )}
            </Form.Group>
            {/* <Form.Group controlId="formEmail">
              <Form.Label>Email :</Form.Label>
              <Field id="email" name="email" type="email"></Field>
              {touched.email && errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </Form.Group> */}
            <Form.Group controlId="formDate">
              <label>Data de agendamento :</label>
              <DatePicker minDate={new Date()} name="date" />
              {touched.date && errors.date && (
                <div className="error-message">{errors.date}</div>
              )}
            </Form.Group>
            <Form.Group controlId="formSchedule">
              <label htmlFor="schedule">Horário:</label>
              <Field
                id="schedule"
                autoComplete="off"
                name="schedule"
                list="schedules"
              ></Field>
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
              Agendar
            </BUTTON>
          </MYFORM>
        )}
      </Formik>
    </CONTAINER>
  );
};

export default AgendamentoForm;
