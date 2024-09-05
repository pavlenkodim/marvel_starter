import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spinner/Spinner";

const setContentWithLoading = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

export default setContentWithLoading;
