import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../services/userService";

const LoginContext = createContext(false);

export const LoginContextProvider = ({ children }) => {
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  console.log(context);
  return context;
};
