import { useRouteError } from "react-router-dom";

const Error = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto max-w-lg mt-40 ">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
