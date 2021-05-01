import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

const url = 'https://projeto-erros.herokuapp.com/';
function LogErrorDetails(props) {
  const [logError, setLogError] = useState();
  // const [isFetching, setIsFetching] = useState(true);

  const { match: { params: { id } } } = props;
  const token = localStorage.getItem('token');
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  useEffect(() => {
    fetch(`${url}errors/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 404) throw new Error('Não encontrado');
        return response.json();
      })
      .then((result) => {
        console.log('result do fetch', result);
        setLogError(result);
      })
      .catch((error) => alert(error.message));
  }, []);

  const renderLogError = () => (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>ID</td>
          <td>{logError.id}</td>
        </tr>
        <tr>
          <td>Nível de erro</td>
          <td>{logError.level}</td>
        </tr>
        <tr>
          <td>Descrição</td>
          <td>{logError.description}</td>
        </tr>
        <tr>
          <td>Origem</td>
          <td>{logError.origin}</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>{logError.date}</td>
        </tr>
        <tr>
          <td>LOG do Evento</td>
          <td>{logError.eventLog}</td>
        </tr>
      </tbody>
    </Table>
  );

  return (
    <main className="wrapper">
      {logError && renderLogError()}
      <Button
        onClick={() => {
          window.location.href = '/logerrors';
        }}
        className="buttonBack"
      >
        Voltar
      </Button>
    </main>
  );
}

LogErrorDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LogErrorDetails;
