import Layout from "../layouts/Layout";
import { useState, useEffect } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import {
  getAppointmentsByUserId,
  getAppointmentsByDoctorId,
} from "../services/appointmentService";
import { getDoctorByUserId } from "../services/doctorService";
import { Grid, GridCol } from "@mantine/core";
import Appointment from "../components/Appointment";
const Appointments = () => {
  const { user } = useLoginContext();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (user?.role === "user") {
        const response = await getAppointmentsByUserId(user.userId);
        console.log(response);
        setAppointments(response);
      }

      if (user?.role === "doctor") {
        const doctor = await getDoctorByUserId(user.userId);
        const response = await getAppointmentsByDoctorId(doctor[0]._id);
        setAppointments(response);
      }
    };
    loadAppointments();
  }, [user]);

  return (
    <Layout>
      <Grid>
        {appointments.map((appointment) => (
          <GridCol key={appointment._id} span={4}>
            <Appointment appointment={appointment} />
          </GridCol>
        ))}
      </Grid>
    </Layout>
  );
};
export default Appointments;
