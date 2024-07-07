import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                }}
            >
                Page doesn't exist
            </p>
            <button className="button button__main button__long">
                <div className="inner">
                    <Link to="/">Back to main page</Link>
                </div>
            </button>
        </div>
    );
};

export default Page404;
