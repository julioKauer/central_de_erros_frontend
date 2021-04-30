import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function ErrorsTable(props) {
  const { arrayErrors } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nível de erro</th>
          <th>Descrição</th>
          <th>Origem</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        { arrayErrors.map((error) => (
          <tr key={error.id}>
            <td>
              <Link to={`/logerrors/${error.id}`}>
                {error.id}
              </Link>
            </td>
            <td>{error.level}</td>
            <td>{error.description}</td>
            <td>{error.origin}</td>
            <td>{error.date}</td>
          </tr>
        )) }
      </tbody>
    </Table>
  );
}

ErrorsTable.propTypes = {
  arrayErrors: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ErrorsTable;
