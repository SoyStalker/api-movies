import { useRouteError } from "react-router-dom";

export default function PaginaError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Perdon, ocurrio un problema.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}