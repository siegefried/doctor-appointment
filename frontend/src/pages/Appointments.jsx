import Layout from "../layouts/Layout";
import { useState, useEffect } from "react";
import { useLoginContext } from "../contexts/LoginContext";
import {
  getAppointmentsByUserId,
  getAppointmentsByDoctorId,
  editAppointment,
  deleteAppointment
} from "../services/appointmentService";
import { getDoctorByUserId } from "../services/doctorService";
import { Grid, GridCol, Blockquote } from "@mantine/core";
import Appointment from "../components/Appointment";
import AppointmentDoctor from "../components/AppointmentDoctor";

const Appointments = () => {
  const { user } = useLoginContext();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (user?.role === "user") {
        const response = await getAppointmentsByUserId(user.userId);
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

  const handleEdit = (index, appointment) => {
    const newAppointments = [...appointments];
    newAppointments[index] = appointment;
    const formData = {
      status: appointment.status,
    };
    editAppointment(appointment._id, formData);
    setAppointments(newAppointments);
  };

  const handleDelete = (index, appointment) => {
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    deleteAppointment(appointment._id);
    setAppointments(newAppointments);
  };

  if (appointments.length === 0) {
    return (
      <Layout>
        <Blockquote color="blue" cite="– Admin" mt="xl">
          You have no appointments at the moment. Head over to the dashboard if
          you need an appointment.
        </Blockquote>
        <Blockquote color="green" cite="– Josh" mt="xl">
          That's actually a good thing and we hope you stay healthy!
        </Blockquote>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid>
        {appointments.map((appointment, index) => (
          <GridCol key={index} span={4}>
            {user?.role === "user" && (
              <Appointment
                appointment={appointment}
                index={index}
                handleDelete={handleDelete}
              />
            )}
            {user?.role === "doctor" && (
              <AppointmentDoctor
                appointment={appointment}
                index={index}
                handleEdit={handleEdit}
              />
            )}
          </GridCol>
        ))}
      </Grid>
    </Layout>
  );
};
export default Appointments;
