import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from 'react-router-dom';

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
    <main className="form__filters">
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
    </main>
  );

  return (
    <div>
      {logError && renderLogError()}
    </div>
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
