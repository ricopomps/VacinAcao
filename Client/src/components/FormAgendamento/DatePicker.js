import React from "react";
import DateView from "react-datepicker";
import { Field } from "formik";
import "./styles.css";
function DatePicker(props) {
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
