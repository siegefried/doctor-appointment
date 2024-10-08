import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Route, Routes, Navigate } from "react-router-dom/dist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useLoginContext } from "./contexts/LoginContext";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/Admin/AddDoctor";
import AlertNotifications from "./pages/AlertNotifications";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";

function App() {
  const { isLoggedIn } = useLoginContext();
  return (
    <MantineProvider>
      <Notifications position="top-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/doctors/new" element={<AddDoctor />}></Route>
            <Route
              path="/notifications"
              element={<AlertNotifications />}
            ></Route>
            <Route path="/book/:doctorId" element={<BookAppointment />}></Route>
            <Route path="/appointments" element={<Appointments />}></Route>
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
