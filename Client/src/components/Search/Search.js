import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import { Formik, Field } from "formik";
import { SET_SEARCH, SET_LIMIT } from "../../constants/reducerConstants";

const Search = ({ value, onChange, limit }) => {
  const limits = [5, 10, 15, 20, 30, 50];
  return (
    <Container>
      <Formik>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Pesquisar"
            value={value}
            onChange={(e) => onChange(SET_SEARCH, { search: e.target.value })}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon3">
              Atendimentos por página:
            </InputGroup.Text>
          </InputGroup.Append>
          <Field
            style={{ width: "50px" }}
            as="select"
            id="limit"
            name="limit"
            value={limit}
            onChange={(e) => onChange(SET_LIMIT, { limit: e.target.value })}
            autoComplete="off"
          >
            {limits.map((limits) => (
              <option key={limits} value={limits}>
                {limits}
              </option>
            ))}
          </Field>
        </InputGroup>
      </Formik>
    </Container>
  );
};

export default Search;
