import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Route, Routes } from "react-router-dom/dist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useLoginContext } from "./contexts/LoginContext";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";

function App() {
  const { isLoggedIn, user } = useLoginContext();
  return (
    <MantineProvider>
      <Notifications position="top-center" />
      <h1>Placeholder</h1>
      {isLoggedIn ? "Logged in" : "Not logged in"}
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/doctors/new" element={<AddDoctor />}></Route>
      </Routes>
    </MantineProvider>
  );
}

export default App;
