import { Fragment } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { useSignIn } from "react-supabase";
import { useAuth } from "../../context/SupaContext";
import useForm from "../../useHooks/useForm";

const initState = {
  email: "",
  password: "",
};
const SLogin = () => {
  const [form, handleChange] = useForm(initState);

  const [{ error, fetching, user }, signIn] = useSignIn();

  const onClickSignIn = async () => await signIn(form);

  const onSubmit = (e) => {
    e.preventDefault();
    onClickSignIn();
  };
  const errorForm = error ? (
    <small className="text-danger">{error.message}</small>
  ) : (
    ""
  );
  const { session } = useAuth();

  if ((user && !fetching) || session) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="register__container" flud="md">
      <div className="register__container_form">
        <h1 className="register__title">Login</h1>
        <Form className="register__form" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
            <Form.Text className="text-muted">
              We will never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
          </Form.Group>
          <Button
            className="register__button"
            variant="primary"
            type="submit"
            disabled={fetching}
          >
            {fetching ? (
              <Fragment>
                Loading...
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              </Fragment>
            ) : (
              "Submit"
            )}
          </Button>
          {errorForm}
        </Form>
      </div>
    </Container>
  );
};

export default SLogin;
