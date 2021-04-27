import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import SelectLevel from '../components/SelectLevel';
import ErrorsTable from '../components/ErrorsTable';
import './style.css';

// const url = 'https://cors-anywhere.herokuapp.com/https://projeto-erros.herokuapp.com/';
// const url = 'https://projeto-erros.herokuapp.com/';
const url = 'http://localhost:8080/';

function LogErrors() {
  const [searchBy, setSearchBy] = useState('all');
  const [level, setLevel] = useState('ERROR');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    console.log(errorList);
  }, [errorList]);

  const Search = () => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let path = '';

    switch (searchBy) {
      case 'level':
        path = `/search/level/${level}`;
        break;
      case 'origin':
        path = `/search/origin/${text}`;
        break;
      case 'description':
        path = `/search/description/${text}`;
        break;
      case 'date':
        path = `/search/date/${date}`;
        break;
      default:
        break;
    }

    //    fetch(`${url}errors${path}?page=0&size=3&sort=level,id`, requestOptions)
    fetch(`${url}errors${path}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { quantity: quant, list } = result;
        setQuantity(quant);
        setErrorList(list);
      })
      .catch((error) => console.log('error', error));
  };

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
        {searchBy === 'level' && <SelectLevel level={level} setLevel={setLevel} /> }
        {searchBy === 'date' && <input type="date" onChange={({ target: { value } }) => setDate(value)} /> }
        {(searchBy === 'description' || searchBy === 'origin') && <input type="text" onChange={({ target: { value } }) => setText(value)} /> }
        <Button onClick={Search}>
          Pesquisar
        </Button>
        <br />
        Quantidade:
        {' '}
        {quantity}
        <br />
        <ErrorsTable arrayErrors={errorList} />
      </Form>
    </main>
  );
}

export default LogErrors;
