import { Link } from "react-router-dom";
import { useLoginContext } from "../contexts/LoginContext";

const Header = () => {
  const { isLoggedIn } = useLoginContext();
  return (
    <div className="bg-blue-600 py-6">
      <div className="mx-16 flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MERN Doc Appt</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
