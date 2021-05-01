import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './style.css';

// const url = 'https://cors-anywhere.herokuapp.com/https://projeto-erros.herokuapp.com/';
const url = 'https://projeto-erros.herokuapp.com/oauth/token';
// const url = 'http://localhost:8080/oauth/token';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const handleSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic dXNlcjoxMjM=');
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const formdata = new URLSearchParams();
    formdata.append('grant_type', 'password');
    formdata.append('username', email);
    formdata.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 401) throw new Error('Usuário ou senha inválido');
        return response.json();
      })
      .then((result) => {
        localStorage.setItem('token', result.access_token);
        history.push('/logerrors');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <main>
      <Form className="form__login">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <Form.Text className="text-muted">
            Nunca compartilhe sua senha
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="button"
          className="form__login__btn"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </main>
  );
}

export default Login;
