import React from "react";
import DateView from "react-datepicker";
import { Field } from "formik";
import { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";

function DatePicker(props) {
  registerLocale("pt", pt);
  const { name, ...rest } = props;
  return (
    <div className="form-agendamento">
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              dateFormat="dd/MM/yyyy"
              locale="pt"
              dateFormatCalendar={"MMM yyyy"}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
    </div>
  );
}

export default DatePicker;
