import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function SelectLevel(props) {
  const { level, setLevel } = props;
  return (
    <Form.Group controlId="">
      <select
        id="dropdown-basic-button"
        className="btn btn-primary dropdown-toggle"
        onChange={({ target: { value } }) => setLevel(value)}
        value={level}
      >
        <option value="ERROR">Error</option>
        <option value="WARNING">Warning</option>
        <option value="INFO">Info</option>
      </select>
    </Form.Group>
  );
}

SelectLevel.propTypes = {
  setLevel: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
};

export default SelectLevel;
