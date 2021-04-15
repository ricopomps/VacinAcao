import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";

const Search = ({ value, onChange }) => {
  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Pesquisar"
          value={value}
          onChange={onChange}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
    </Container>
  );
};

export default Search;
