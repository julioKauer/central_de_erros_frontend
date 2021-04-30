import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import SelectLevel from '../components/SelectLevel';
import ErrorsTable from '../components/ErrorsTable';
import './style.css';

// const url = 'https://cors-anywhere.herokuapp.com/https://projeto-erros.herokuapp.com/';
const url = 'https://projeto-erros.herokuapp.com/';
// const url = 'http://localhost:8080/';

function LogErrors() {
  const [searchBy, setSearchBy] = useState('all');
  const [level, setLevel] = useState('ERROR');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [errorList, setErrorList] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [size, setSize] = useState(3);
  const [ascDesc, setAscDesc] = useState('desc');
  const [currentPage, setCurrentPage] = useState(0);

  const search = (fetchPage) => {
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

    fetch(`${url}errors${path}?sort=${sortBy},${ascDesc}&page=${fetchPage}&size=${size}`, requestOptions)
      .then((response) => {
        if (response.status === 404) throw new Error('Não encontrado');
        return response.json();
      })
      .then((result) => {
        const { quantity: quant, list } = result;
        setQuantity(quant);
        if (list) setErrorList(list);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    search(currentPage);
  }, [currentPage]);

  const existNextPage = () => {
    const lastPage = Math.ceil(quantity / size) - 1;
    if (currentPage < lastPage) return true;
    return false;
  };

  const handleNext = () => {
    if (existNextPage()) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
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
        {searchBy === 'date' && <input type="date" value={date} onChange={({ target: { value } }) => setDate(value)} /> }
        {(searchBy === 'description' || searchBy === 'origin') && <input type="text" onChange={({ target: { value } }) => setText(value)} /> }
        <Form.Group controlId="">
          <Form.Label>
            Ordenação
          </Form.Label>
          <select
            id="dropdown-basic-button"
            className="btn btn-primary dropdown-toggle"
            onChange={({ target: { value } }) => setSortBy(value)}
            value={sortBy}
          >
            <option value="id">Id</option>
            <option value="level">Tipo de erro</option>
            <option value="date">Data</option>
            <option value="origin">Origem</option>
            <option value="description">Descrição</option>
          </select>
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>
            Quantidade por página
          </Form.Label>
          <input
            type="number"
            min="1"
            max="20"
            value={size}
            onChange={({ target: { value } }) => setSize(value)}
          />
        </Form.Group>
        <Form.Group controlId="">
          <select
            id="dropdown-basic-button"
            className="btn btn-primary dropdown-toggle"
            value={ascDesc}
            onChange={({ target: { value } }) => setAscDesc(value)}
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </Form.Group>
        <Button onClick={() => search(0)}>
          Pesquisar
        </Button>
        <br />
        Quantidade:
        {' '}
        {quantity}
        <br />
        <ErrorsTable arrayErrors={errorList} />
      </Form>
      {`Página ${currentPage + 1}`}
      <br />
      <Button onClick={handlePrevious} disabled={currentPage === 0}>
        Anterior
      </Button>
      <Button onClick={handleNext} disabled={!existNextPage()}>
        Próximo
      </Button>
    </main>
  );
}

export default LogErrors;
