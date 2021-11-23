import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoaderComponent({
  isLoading,
  serverError,

  children,
  spinner = <CircleSpinner />,
}) {
  if (isLoading) {
    return spinner;
  }
  if (serverError) {
    return <h1>Error Loading</h1>;
  }

  return <>{children}</>;
}

const CircleSpinner = () => (
  <Spinner animation="grow" variant="primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);
