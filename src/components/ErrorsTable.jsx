import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

function ErrorsTable(props) {
  const { arrayErrors } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Level</th>
          <th>Description</th>
          <th>Origin</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        { arrayErrors.map((error) => (
          <tr key={error.id}>
            <td>{error.id}</td>
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
