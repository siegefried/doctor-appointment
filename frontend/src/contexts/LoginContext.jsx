import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../services/userService";

const LoginContext = createContext(undefined);

export const LoginContextProvider = ({ children }) => {
  const { data, isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
  });

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: !isError,
        user: data,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  return context;
};
