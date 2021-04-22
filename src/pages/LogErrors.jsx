import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './style.css';

const [searchBy, setSearchBy] = useState('all');
// const [isLevel, setIsLevel] = useState(false);

function LogErrors() {
  return (
    <main className="wrapper">
      <Form className="form__filters">
        <Form.Group controlId="">
          <select
            id="dropdown-basic-button"
            className="btn btn-primary dropdown-toggle"
            onChange={({ target: { value } }) => setSearchBy(value)}
          >
            <option value="all">Todos</option>
            <option value="level">Tipo de erro</option>
            <option value="date">Data</option>
            <option value="origin">Origem</option>
            <option value="description">Descrição</option>
          </select>
        </Form.Group>
        <div>{searchBy}</div>
      </Form>
    </main>
  );
}

export default LogErrors;
